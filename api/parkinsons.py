import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and train the Parkinson's model
def train_parkinsons_model():
    # Load the dataset
    parkinsons_data = pd.read_csv('parkinsons.csv')
    
    # Prepare features and target
    X = parkinsons_data.drop(columns=['name', 'status'], axis=1)
    Y = parkinsons_data['status']
    
    # Split the data
    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2)
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train the model
    model = svm.SVC(kernel='linear', probability=True)
    model.fit(X_train_scaled, Y_train)
    
    # Calculate accuracy
    X_train_prediction = model.predict(X_train_scaled)
    training_data_accuracy = accuracy_score(Y_train, X_train_prediction)
    
    X_test_prediction = model.predict(X_test_scaled)
    test_data_accuracy = accuracy_score(Y_test, X_test_prediction)
    
    print(f'Training accuracy: {training_data_accuracy}')
    print(f'Test accuracy: {test_data_accuracy}')
    
    # Save the model and scaler
    with open('parkinsons_model.pkl', 'wb') as f:
        pickle.dump({'model': model, 'scaler': scaler}, f)
    
    return model, scaler

# Load or train the model
try:
    with open('parkinsons_model.pkl', 'rb') as f:
        model_data = pickle.load(f)
        parkinsons_model = model_data['model']
        scaler = model_data['scaler']
except FileNotFoundError:
    parkinsons_model, scaler = train_parkinsons_model()

@app.route('/api/predict/parkinsons', methods=['POST'])
def predict_parkinsons():
    try:
        data = request.json
        
        # Extract features from the request
        features = [
            float(data['mdvpFo']),
            float(data['mdvpFhi']),
            float(data['mdvpFlo']),
            float(data['mdvpJitter']),
            float(data['mdvpJitterAbs']),
            float(data['mdvpRAP']),
            float(data['mdvpPPQ']),
            float(data['jitterDDP']),
            float(data['mdvpShimmer']),
            float(data['mdvpShimmerDB']),
            float(data['shimmerAPQ3']),
            float(data['shimmerAPQ5']),
            float(data['mdvpAPQ']),
            float(data['shimmerDDA']),
            float(data['nhr']),
            float(data['hnr']),
            float(data['rpde']),
            float(data['dfa']),
            float(data['spread1']),
            float(data['spread2']),
            float(data['d2']),
            float(data['ppe'])
        ]
        
        # Scale the features
        features_scaled = scaler.transform([features])
        
        # Make prediction
        prediction = parkinsons_model.predict(features_scaled)
        prediction_proba = parkinsons_model.predict_proba(features_scaled)
        
        # Calculate confidence
        confidence = round(max(prediction_proba[0]) * 100, 1)
        
        result = {
            'prediction': 'Positive' if prediction[0] == 1 else 'Negative',
            'confidence': confidence,
            'risk_score': round(prediction_proba[0][1] * 100, 1)
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5002)
