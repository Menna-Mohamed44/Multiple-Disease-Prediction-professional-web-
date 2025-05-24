import { Link, useLocation } from "react-router-dom"
import styles from "./Navigation.module.css"

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/diabetes", label: "Diabetes" },
    { path: "/heart-disease", label: "Heart Disease" },
    { path: "/parkinsons", label: "Parkinsons" },
  ]

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>ML Health</span>
          <span className={styles.logoAccent}>Predictions</span>
        </Link>

        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
