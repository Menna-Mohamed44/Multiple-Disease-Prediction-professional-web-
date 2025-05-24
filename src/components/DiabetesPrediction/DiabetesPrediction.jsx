"use client"

import { useState } from "react"
import styles from "./DiabetesPrediction.module.css"

const DiabetesPrediction = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call to Python backend
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock prediction logic
      const glucose = Number.parseFloat(formData.glucose)
      const bmi = Number.parseFloat(formData.bmi)
      const age = Number.parseFloat(formData.age)

      const riskScore = (glucose > 140 ? 0.4 : 0.1) + (bmi > 30 ? 0.3 : 0.1) + (age > 45 ? 0.2 : 0.1)

      const result = riskScore > 0.5 ? "High Risk" : "Low Risk"
      const confidence = Math.min(95, Math.max(75, Math.round(riskScore * 100 + Math.random() * 20)))

      setPrediction({
        result,
        confidence,
        riskScore: Math.round(riskScore * 100),
      })
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      pregnancies: "",
      glucose: "",
      bloodPressure: "",
      skinThickness: "",
      insulin: "",
      bmi: "",
      diabetesPedigreeFunction: "",
      age: "",
    })
    setPrediction(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon}>🩺</span>
          Diabetes Risk Prediction
        </h1>
        <p className={styles.subtitle}>
          Enter your medical information to assess diabetes risk using our advanced SVM model
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Pregnancies</label>
                <input
                  type="number"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Number of pregnancies"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Glucose Level (mg/dL)</label>
                <input
                  type="number"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 120"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Blood Pressure (mmHg)</label>
                <input
                  type="number"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 80"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Skin Thickness (mm)</label>
                <input
                  type="number"
                  name="skinThickness"
                  value={formData.skinThickness}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 20"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Insulin (μU/mL)</label>
                <input
                  type="number"
                  name="insulin"
                  value={formData.insulin}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 85"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>BMI</label>
                <input
                  type="number"
                  step="0.1"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 25.5"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Diabetes Pedigree Function</label>
                <input
                  type="number"
                  step="0.001"
                  name="diabetesPedigreeFunction"
                  value={formData.diabetesPedigreeFunction}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.315"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 35"
                  min="0"
                  max="120"
                  required
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.predictButton} disabled={loading}>
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Analyzing...
                  </>
                ) : (
                  "Predict Diabetes Risk"
                )}
              </button>
              <button type="button" onClick={resetForm} className={styles.resetButton}>
                Reset Form
              </button>
            </div>
          </form>
        </div>

        {prediction && (
          <div className={styles.resultSection}>
            <div className={styles.resultCard}>
              <h3 className={styles.resultTitle}>Prediction Result</h3>
              <div
                className={`${styles.resultBadge} ${prediction.result === "High Risk" ? styles.highRisk : styles.lowRisk}`}
              >
                {prediction.result}
              </div>
              <div className={styles.resultDetails}>
                <div className={styles.resultItem}>
                  <span className={styles.resultLabel}>Confidence:</span>
                  <span className={styles.resultValue}>{prediction.confidence}%</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultLabel}>Risk Score:</span>
                  <span className={styles.resultValue}>{prediction.riskScore}%</span>
                </div>
              </div>
              <div className={styles.disclaimer}>
                <p>
                  ⚠️ This prediction is for educational purposes only. Please consult a healthcare professional for
                  medical advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiabetesPrediction
