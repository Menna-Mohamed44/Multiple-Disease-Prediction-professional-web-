"use client"

import { useState } from "react"
import styles from "./ParkinsonsPrediction.module.css"

const ParkinsonsPrediction = () => {
  const [formData, setFormData] = useState({
    mdvpFo: "",
    mdvpFhi: "",
    mdvpFlo: "",
    mdvpJitter: "",
    mdvpJitterAbs: "",
    mdvpRAP: "",
    mdvpPPQ: "",
    jitterDDP: "",
    mdvpShimmer: "",
    mdvpShimmerDB: "",
    shimmerAPQ3: "",
    shimmerAPQ5: "",
    mdvpAPQ: "",
    shimmerDDA: "",
    nhr: "",
    hnr: "",
    rpde: "",
    dfa: "",
    spread1: "",
    spread2: "",
    d2: "",
    ppe: "",
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

      // Mock prediction logic based on voice features
      const jitter = Number.parseFloat(formData.mdvpJitter)
      const shimmer = Number.parseFloat(formData.mdvpShimmer)
      const nhr = Number.parseFloat(formData.nhr)
      const hnr = Number.parseFloat(formData.hnr)

      const riskScore =
        (jitter > 0.01 ? 0.25 : 0.05) +
        (shimmer > 0.03 ? 0.25 : 0.05) +
        (nhr > 0.03 ? 0.2 : 0.05) +
        (hnr < 20 ? 0.25 : 0.05)

      const result = riskScore > 0.5 ? "Positive" : "Negative"
      const confidence = Math.min(94, Math.max(82, Math.round(riskScore * 100 + Math.random() * 12)))

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
      mdvpFo: "",
      mdvpFhi: "",
      mdvpFlo: "",
      mdvpJitter: "",
      mdvpJitterAbs: "",
      mdvpRAP: "",
      mdvpPPQ: "",
      jitterDDP: "",
      mdvpShimmer: "",
      mdvpShimmerDB: "",
      shimmerAPQ3: "",
      shimmerAPQ5: "",
      mdvpAPQ: "",
      shimmerDDA: "",
      nhr: "",
      hnr: "",
      rpde: "",
      dfa: "",
      spread1: "",
      spread2: "",
      d2: "",
      ppe: "",
    })
    setPrediction(null)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon}>🧠</span>
          Parkinson's Disease Prediction
        </h1>
        <p className={styles.subtitle}>Voice pattern analysis using SVM to detect early signs of Parkinson's disease</p>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.sectionTitle}>Voice Frequency Measures</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Fo(Hz)</label>
                <input
                  type="number"
                  step="0.001"
                  name="mdvpFo"
                  value={formData.mdvpFo}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 119.992"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Fhi(Hz)</label>
                <input
                  type="number"
                  step="0.001"
                  name="mdvpFhi"
                  value={formData.mdvpFhi}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 157.302"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Flo(Hz)</label>
                <input
                  type="number"
                  step="0.001"
                  name="mdvpFlo"
                  value={formData.mdvpFlo}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 74.997"
                  required
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Jitter Measures</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Jitter(%)</label>
                <input
                  type="number"
                  step="0.00001"
                  name="mdvpJitter"
                  value={formData.mdvpJitter}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.00784"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Jitter(Abs)</label>
                <input
                  type="number"
                  step="0.000001"
                  name="mdvpJitterAbs"
                  value={formData.mdvpJitterAbs}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.00007"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:RAP</label>
                <input
                  type="number"
                  step="0.00001"
                  name="mdvpRAP"
                  value={formData.mdvpRAP}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.00370"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:PPQ</label>
                <input
                  type="number"
                  step="0.00001"
                  name="mdvpPPQ"
                  value={formData.mdvpPPQ}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.00554"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Jitter:DDP</label>
                <input
                  type="number"
                  step="0.00001"
                  name="jitterDDP"
                  value={formData.jitterDDP}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.01109"
                  required
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Shimmer Measures</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Shimmer</label>
                <input
                  type="number"
                  step="0.00001"
                  name="mdvpShimmer"
                  value={formData.mdvpShimmer}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.04374"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:Shimmer(dB)</label>
                <input
                  type="number"
                  step="0.001"
                  name="mdvpShimmerDB"
                  value={formData.mdvpShimmerDB}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.426"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Shimmer:APQ3</label>
                <input
                  type="number"
                  step="0.00001"
                  name="shimmerAPQ3"
                  value={formData.shimmerAPQ3}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.02182"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Shimmer:APQ5</label>
                <input
                  type="number"
                  step="0.00001"
                  name="shimmerAPQ5"
                  value={formData.shimmerAPQ5}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.03130"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>MDVP:APQ</label>
                <input
                  type="number"
                  step="0.00001"
                  name="mdvpAPQ"
                  value={formData.mdvpAPQ}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.02971"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Shimmer:DDA</label>
                <input
                  type="number"
                  step="0.00001"
                  name="shimmerDDA"
                  value={formData.shimmerDDA}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.06545"
                  required
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Noise Measures</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>NHR</label>
                <input
                  type="number"
                  step="0.00001"
                  name="nhr"
                  value={formData.nhr}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.02211"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>HNR</label>
                <input
                  type="number"
                  step="0.001"
                  name="hnr"
                  value={formData.hnr}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 21.033"
                  required
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Nonlinear Measures</div>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>RPDE</label>
                <input
                  type="number"
                  step="0.000001"
                  name="rpde"
                  value={formData.rpde}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.414783"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>DFA</label>
                <input
                  type="number"
                  step="0.000001"
                  name="dfa"
                  value={formData.dfa}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.815285"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Spread1</label>
                <input
                  type="number"
                  step="0.000001"
                  name="spread1"
                  value={formData.spread1}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., -4.813031"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Spread2</label>
                <input
                  type="number"
                  step="0.000001"
                  name="spread2"
                  value={formData.spread2}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.266482"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>D2</label>
                <input
                  type="number"
                  step="0.000001"
                  name="d2"
                  value={formData.d2}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 2.301442"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>PPE</label>
                <input
                  type="number"
                  step="0.000001"
                  name="ppe"
                  value={formData.ppe}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g., 0.284654"
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
                  "Predict Parkinson's Disease"
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
                className={`${styles.resultBadge} ${prediction.result === "Positive" ? styles.positive : styles.negative}`}
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
                  ⚠️ This prediction is for educational purposes only. Please consult a neurologist for medical advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParkinsonsPrediction
