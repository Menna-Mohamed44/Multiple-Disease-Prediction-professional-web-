import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and train the diabetes model
def train_diabetes_model():
    # Load the dataset
    diabetes_dataset = pd.read_csv('diabetes.csv')
    
    # Separate features and target
    X = diabetes_dataset.drop(columns='Outcome', axis=1)
    Y = diabetes_dataset['Outcome']
    
    # Split the data
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, stratify=Y, random_state=2)
    
    # Train the model
    classifier = svm.SVC(kernel='linear')
    classifier.fit(X_train, Y_train)
    
    # Calculate accuracy
    X_train_prediction = classifier.predict(X_train)
    training_data_accuracy = accuracy_score(X_train_prediction, Y_train)
    
    X_test_prediction = classifier.predict(X_test)
    test_data_accuracy = accuracy_score(X_test_prediction, Y_test)
    
    print(f'Training accuracy: {training_data_accuracy}')
    print(f'Test accuracy: {test_data_accuracy}')
    
    # Save the model
    with open('diabetes_model.pkl', 'wb') as f:
        pickle.dump(classifier, f)
    
    return classifier

# Load or train the model
try:
    with open('diabetes_model.pkl', 'rb') as f:
        diabetes_model = pickle.load(f)
except FileNotFoundError:
    diabetes_model = train_diabetes_model()

@app.route('/api/predict/diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.json
        
        # Extract features from the request
        features = [
            float(data['pregnancies']),
            float(data['glucose']),
            float(data['bloodPressure']),
            float(data['skinThickness']),
            float(data['insulin']),
            float(data['bmi']),
            float(data['diabetesPedigreeFunction']),
            float(data['age'])
        ]
        
        # Make prediction
        prediction = diabetes_model.predict([features])
        prediction_proba = diabetes_model.decision_function([features])
        
        # Calculate confidence
        confidence = min(95, max(75, abs(prediction_proba[0]) * 20 + 75))
        
        result = {
            'prediction': 'High Risk' if prediction[0] == 1 else 'Low Risk',
            'confidence': round(confidence, 1),
            'risk_score': round(abs(prediction_proba[0]) * 10 + 50, 1)
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
