# 📈 Financial-Sentiment-Analysis-ML
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

A **full-stack desktop application** which analyzes financial data using machine learning and serves it in a sleek and interactive UI. This project combines Python ML with an API, text preprocessing with C++ and an Electron frontend to deliver a tool capable of understanding financial sentiment. Models are evaluated using accuracy and classification reports.

![home](screenshots\Recording 2026-02-02 112851.mp4)

## 📦 What this application features
### This project builds a complete workflow from the ground up:
📁 **Data processing** using a C++ file for speed   
🧠 **Two classical ML models**: Naive Bayes & Logistic Regression  
📌 **Flask API** for serving predictions 🔌  
🖥️ **Electron desktop interface** for interactive usage  

### It features
🎯 Multi-model predictions: Compares Naive Bayes and Logistic Regression outputs.\
📊 Visualizations showing ML performance: Charts to explain model confidence, sentiment distribution over time, feature influence, etc.\
🛠 Full backend + frontend integration: Python ML + C++ preprocessing + Electron UI.\
🧩 Extensible architecture: Possible to add new models or visualizations.

## Installation & Setup 🚀

## 🛠 Prerequisites
### Make sure you have:
- 🐍 Python 3.10+
- 🟢 Node.js 18+
- ⚙️ g++ compiler 

> ⚠️ **Important:** Run all commands from the project root directory (where `README.md` is located)

### 🧠 1. Python Dependencies
```bash
pip install -r requirements.txt
```

### 📊 2. Dataset Setup
1. Download the dataset from [Kaggle - Financial Sentiment Analysis](https://www.kaggle.com/datasets/sbhatti/financial-sentiment-analysis?resource=download)
2. Extract the CSV file
3. Place it in the `data/` directory as `data.csv`

### ⚡ 3. Compile C++ Extension
```bash
cd src/cpp
g++ -shared -o text_preprocess.dll text_preprocess.cpp
cd ../..
```
```Note that the .dll build instructions are for Windows. Linux/macOS users must compile a .so file.```

### 🟢 4. Node.js Dependencies
```bash
npm install
```

---

## Running the Application 🎉

### 🧰 1: Start the Backend Server

**Run Python backend server**
```bash
python src/python/main.py
```

> ⏳ **Wait for the server to fully start** - Look for a message indicating the server is running

### ✨ 2: Start the Electron Frontend

Open a **new terminal window** and run:
```bash
npm start
```

---
