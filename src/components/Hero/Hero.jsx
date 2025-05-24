import { Link } from "react-router-dom"
import styles from "./Hero.module.css"

const Hero = () => {
  const features = [
    {
      title: "Diabetes Prediction",
      description: "Advanced ML model using SVM to predict diabetes risk based on medical indicators.",
      path: "/diabetes",
      icon: "🩺",
    },
    {
      title: "Heart Disease Detection",
      description: "Random Forest classifier to assess cardiovascular health risks.",
      path: "/heart-disease",
      icon: "❤️",
    },
    {
      title: "Parkinsons Analysis",
      description: "Voice pattern analysis using SVM to detect early signs of Parkinsons disease.",
      path: "/parkinsons",
      icon: "🧠",
    },
  ]

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Advanced <span className={styles.accent}>Machine Learning</span>
            <br />
            Health Predictions
          </h1>
          <p className={styles.subtitle}>
            Leverage cutting-edge AI models to predict and analyze health conditions with high accuracy. Get instant
            insights powered by advanced machine learning algorithms.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/diabetes" className={styles.primaryButton}>
              Start Prediction
            </Link>
            <a href="#features" className={styles.secondaryButton}>
              Learn More
            </a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <div className={styles.visualIcon}>🤖</div>
            <h3>AI-Powered</h3>
            <p>State-of-the-art algorithms</p>
          </div>
        </div>
      </div>

      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.featuresTitle}>Our Prediction Models</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <Link to={feature.path} className={styles.featureButton}>
                  Try Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>95%</div>
              <div className={styles.statLabel}>Accuracy Rate</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>3</div>
              <div className={styles.statLabel}>ML Models</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1000{"+"}</div>
              <div className={styles.statLabel}>Predictions Made</div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerDivider}></div>
            <div className={styles.footerText}>
              <p className={styles.copyright}>© 2024 ML Health Predictions. All rights reserved.</p>
              <p className={styles.developer}>
                Developed with ❤️ by <span className={styles.developerName}>Menna</span>
              </p>
            </div>
            <div className={styles.footerLinks}>
              <span className={styles.footerLink}>Privacy Policy</span>
              <span className={styles.footerDividerSmall}>•</span>
              <span className={styles.footerLink}>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Hero
