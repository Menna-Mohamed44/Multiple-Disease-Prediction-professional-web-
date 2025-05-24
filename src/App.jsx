import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation/Navigation"
import Hero from "./components/Hero/Hero"
import DiabetesPrediction from "./components/DiabetesPrediction/DiabetesPrediction"
import HeartDiseasePrediction from "./components/HeartDiseasePrediction/HeartDiseasePrediction"
import ParkinsonsPrediction from "./components/ParkinsonsPrediction/ParkinsonsPrediction"
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/diabetes" element={<DiabetesPrediction />} />
          <Route path="/heart-disease" element={<HeartDiseasePrediction />} />
          <Route path="/parkinsons" element={<ParkinsonsPrediction />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
