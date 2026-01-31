import os
import pandas as pd
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
from sklearn.linear_model import LogisticRegression
from flask import Flask, request, jsonify
from flask_cors import CORS
import ctypes

# load C++ DLL
cpp = ctypes.CDLL("./text_preprocess.dll")

# define function
cpp.preprocess_text.argtypes = [ctypes.c_char_p, ctypes.c_char_p]
cpp.preprocess_text.restype = None


# Change working directory to script location
os.chdir(os.path.dirname(os.path.abspath(__file__)))

data = pd.read_csv('data.csv')

# processing text data
def preprocess_text(sentence):
    input_bytes = sentence.encode("utf-8")
    output_buffer = ctypes.create_string_buffer(1000)

    cpp.preprocess_text(input_bytes, output_buffer)

    cleaned = output_buffer.value.decode("utf-8")
    cleaned = ' '.join(cleaned.split())  # remove extra spaces
    return cleaned

# apply function to column
data['ProcessedSentence'] = data['Sentence'].apply(preprocess_text)

# convert to vectors and splits
vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1,3))
X = vectorizer.fit_transform(data['ProcessedSentence'])
y = data['Sentiment'] 

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# initializing model (naive bayes)
nb_model = MultinomialNB(alpha=0.5)
nb_model.fit(X_train, y_train)
y_pred_nb = nb_model.predict(X_test)

# initializing model (logistic regression)
lr_model = LogisticRegression(max_iter=1000, class_weight='balanced')
lr_model.fit(X_train, y_train)
y_pred_lr = lr_model.predict(X_test)

# extract importance for logistic regression per class
features = vectorizer.get_feature_names_out()
importance_per_class = []
for i, class_label in enumerate(lr_model.classes_):
    top_features = sorted(zip(features, lr_model.coef_[i]), key=lambda x: x[1], reverse=True)
    importance_per_class.append((class_label, top_features[:20]))

# metrics
metrics_nb = {
    "accuracy": accuracy_score(y_test, y_pred_nb),
    "classification_report": classification_report(y_test, y_pred_nb, output_dict=True)
}
metrics_lr = {
    "accuracy": accuracy_score(y_test, y_pred_lr),
    "classification_report": classification_report(y_test, y_pred_lr, output_dict=True)
}

# sample predictions
predictions = []
for sentence, true, pred_nb, pred_lr in zip(data['ProcessedSentence'].iloc[y_test.index], y_test, y_pred_nb, y_pred_lr):
    predictions.append({
        "sentence": sentence,
        "true_sentiment": true,
        "nb_prediction": pred_nb,
        "lr_prediction": pred_lr
    })

# function to predict sentiment for new sentence
def predict_sentiment(sentence):
    processed = preprocess_text(sentence)
    vector = vectorizer.transform([processed])
    nb_pred = nb_model.predict(vector)[0]
    lr_pred = lr_model.predict(vector)[0]
    return {
        "sentence": sentence,
        "processed": processed,
        "nb_prediction": nb_pred,
        "lr_prediction": lr_pred
    }

# --- Flask setup ---
app = Flask(__name__)
CORS(app)  # allow Electron to access

@app.route("/predict", methods=["POST"])
def predict_route():
    sentence = request.json["sentence"]
    result = predict_sentiment(sentence)
    return jsonify(result)

@app.route("/metrics", methods=["GET"])
def metrics_route():
    return jsonify({
        "nb": metrics_nb,
        "lr": metrics_lr,
        "sample_predictions": predictions[:10],  # first 10 predictions
        "top_words": {class_label: top for class_label, top in importance_per_class}
    })

if __name__ == "__main__":
    app.run(debug=False)
