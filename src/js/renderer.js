const predictBtn = document.getElementById('predictBtn');
const metricsBtn = document.getElementById('metricsBtn');
const sentenceInput = document.getElementById('sentence');
const predictionResult = document.getElementById('predictionResult');
const metricsResult = document.getElementById('metricsResult');

const API_URL = "http://127.0.0.1:5000"; // Flask API

// prediction
predictBtn.addEventListener('click', async () => {
    const sentence = sentenceInput.value;
    if (!sentence) return;

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ sentence })
        });

        const data = await response.json();

        // append in card
        const div = document.createElement("pre");
        div.innerText = `
Sentence: ${data.sentence}
Processed: ${data.processed}
Naive Bayes: ${data.nb_prediction}
Logistic Regression: ${data.lr_prediction}
        `;
        predictionResult.appendChild(div);

        // clear input
        sentenceInput.value = "";
        sentenceInput.focus();

    } catch (err) {
        console.error(err);
        const div = document.createElement("pre");
        div.innerText = "Error: Could not reach server.";
        predictionResult.appendChild(div);
    }
});

// metrics
metricsBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/metrics`);
        const data = await response.json();

        // formatted block
        metricsResult.innerText = JSON.stringify(data, null, 2);

    } catch (err) {
        console.error(err);
        metricsResult.innerText = "Error: Could not reach server.";
    }
});
