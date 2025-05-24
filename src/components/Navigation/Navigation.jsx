"use client"

import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import styles from "./Navigation.module.css"

const Navigation = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/diabetes", label: "Diabetes" },
    { path: "/heart-disease", label: "Heart Disease" },
    { path: "/parkinsons", label: "Parkinsons" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
          <span className={styles.logoText}>ML Health</span>
          <span className={styles.logoAccent}>Predictions</span>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.active : ""}`}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}></div>}
      </div>
    </nav>
  )
}

export default Navigation
