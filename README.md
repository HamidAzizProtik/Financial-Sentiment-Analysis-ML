# Financial-Sentiment-Analysis-ML
A project providing insights into market state and investor sentiment using naive bayes and logistic regression models.

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Prequisites
1. Download dependencies using ```pip install -r requirements.txt```
2. Download dataset from https://www.kaggle.com/datasets/sbhatti/financial-sentiment-analysis?resource=download and place it in the main project folder in same directory as README, etc.
3. Compile the c++ file using ```g++ -shared -o text_preprocess.dll text_preprocess.cpp```
4. Compile/setup the other dependencies such as the frontend with node, electron, etc

## Running the application
1. navigate to script directory with ```cd src\python\main.py``` and run file using ```python main.py```
make sure to wait for server to fully start
2. navigate back to main folder again in another terminal window and run electron app with ```npm start```