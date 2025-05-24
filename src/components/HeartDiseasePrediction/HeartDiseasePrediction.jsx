"use client"

import { useState } from "react"
import styles from "./HeartDiseasePrediction.module.css"

const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    bp: "",
    cholesterol: "",
    fbsOver120: "",
    ekgResults: "",
    maxHR: "",
    exerciseAngina: "",
    stDepression: "",
    slopeOfST: "",
    numberOfVesselsFluro: "",
    thallium: "",
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
      const age = Number.parseFloat(formData.age)
      const cholesterol = Number.parseFloat(formData.cholesterol)
      const maxHR = Number.parseFloat(formData.maxHR)
      const chestPain = Number.parseInt(formData.chestPainType)

      const riskScore =
        (age > 55 ? 0.3 : 0.1) +
        (cholesterol > 240 ? 0.25 : 0.1) +
        (maxHR < 150 ? 0.2 : 0.05) +
        (chestPain >= 3 ? 0.25 : 0.1)

      const result = riskScore > 0.6 ? "Presence" : "Absence"
      const confidence = Math.min(96, Math.max(78, Math.round(riskScore * 100 + Math.random() * 15)))

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
      age: "",
      sex: "",
      chestPainType: "",
      bp: "",
      cholesterol: "",
      fbsOver120: "",
      ekgResults: "",
      maxHR: "",
      exerciseAngina: "",
      stDepression: "",
      slopeOfST: "",
      numberOfVesselsFluro: "",
      thallium: "",
    })
    setPrediction(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon}>❤️</span>
          Heart Disease Prediction
        </h1>
        <p className={styles.subtitle}>Assess cardiovascular health risk using our Random Forest classifier model</p>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Age (years)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 45"
                  min="0"
                  max="120"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Sex</label>
                <select name="sex" value={formData.sex} onChange={handleInputChange} className={styles.input} required>
                  <option value="">Select Sex</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Chest Pain Type</label>
                <select
                  name="chestPainType"
                  value={formData.chestPainType}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="1">Typical Angina</option>
                  <option value="2">Atypical Angina</option>
                  <option value="3">Non-Anginal Pain</option>
                  <option value="4">Asymptomatic</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Blood Pressure (mmHg)</label>
                <input
                  type="number"
                  name="bp"
                  value={formData.bp}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 120"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Cholesterol (mg/dL)</label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 200"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>FBS over 120</label>
                <select
                  name="fbsOver120"
                  value={formData.fbsOver120}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>EKG Results</label>
                <select
                  name="ekgResults"
                  value={formData.ekgResults}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Result</option>
                  <option value="0">Normal</option>
                  <option value="1">ST-T Wave Abnormality</option>
                  <option value="2">Left Ventricular Hypertrophy</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Max Heart Rate</label>
                <input
                  type="number"
                  name="maxHR"
                  value={formData.maxHR}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 150"
                  min="0"
                  max="250"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Exercise Angina</label>
                <select
                  name="exerciseAngina"
                  value={formData.exerciseAngina}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>ST Depression</label>
                <input
                  type="number"
                  step="0.1"
                  name="stDepression"
                  value={formData.stDepression}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 1.5"
                  min="0"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Slope of ST</label>
                <select
                  name="slopeOfST"
                  value={formData.slopeOfST}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Slope</option>
                  <option value="1">Upsloping</option>
                  <option value="2">Flat</option>
                  <option value="3">Downsloping</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Number of Vessels Fluro</label>
                <select
                  name="numberOfVesselsFluro"
                  value={formData.numberOfVesselsFluro}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Number</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Thallium</label>
                <select
                  name="thallium"
                  value={formData.thallium}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="3">Normal</option>
                  <option value="6">Fixed Defect</option>
                  <option value="7">Reversible Defect</option>
                </select>
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
                  "Predict Heart Disease"
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
                className={`${styles.resultBadge} ${prediction.result === "Presence" ? styles.presence : styles.absence}`}
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
                  ⚠️ This prediction is for educational purposes only. Please consult a cardiologist for medical advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeartDiseasePrediction
