import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load and train the heart disease model
def train_heart_disease_model():
    # Load the dataset
    data = pd.read_csv('Heart_Disease_Prediction.csv')
    
    # Prepare features and target
    X = data.drop("Heart Disease", axis=1)
    y = data["Heart Disease"]
    
    # Encode categorical variables
    le = LabelEncoder()
    sc = StandardScaler()
    
    # Scale numerical features
    numerical_features = X.select_dtypes(include=['float64', 'int64']).columns
    for col in numerical_features:
        X[col] = sc.fit_transform(X[[col]])
    
    # Encode target variable
    y = le.fit_transform(y)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train the model
    rf = RandomForestClassifier(n_estimators=50, random_state=2)
    rf.fit(X_train, y_train)
    
    # Calculate accuracy
    y_pred = rf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Heart Disease Model Accuracy: {accuracy}')
    
    # Save the model and scalers
    with open('heart_disease_model.pkl', 'wb') as f:
        pickle.dump({'model': rf, 'scaler': sc, 'label_encoder': le}, f)
    
    return rf, sc, le

# Load or train the model
try:
    with open('heart_disease_model.pkl', 'rb') as f:
        model_data = pickle.load(f)
        heart_model = model_data['model']
        scaler = model_data['scaler']
        label_encoder = model_data['label_encoder']
except FileNotFoundError:
    heart_model, scaler, label_encoder = train_heart_disease_model()

@app.route('/api/predict/heart-disease', methods=['POST'])
def predict_heart_disease():
    try:
        data = request.json
        
        # Extract features from the request
        features = [
            float(data['age']),
            float(data['sex']),
            float(data['chestPainType']),
            float(data['bp']),
            float(data['cholesterol']),
            float(data['fbsOver120']),
            float(data['ekgResults']),
            float(data['maxHR']),
            float(data['exerciseAngina']),
            float(data['stDepression']),
            float(data['slopeOfST']),
            float(data['numberOfVesselsFluro']),
            float(data['thallium'])
        ]
        
        # Make prediction
        prediction = heart_model.predict([features])
        prediction_proba = heart_model.predict_proba([features])
        
        # Calculate confidence
        confidence = round(max(prediction_proba[0]) * 100, 1)
        
        result = {
            'prediction': 'Presence' if prediction[0] == 1 else 'Absence',
            'confidence': confidence,
            'risk_score': round(prediction_proba[0][1] * 100, 1)
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)
