import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>

      {/* Logo / Brand */}
      <NavLink to="/" className={styles.brand}>
        ⚡ TechStore
      </NavLink>

      {/* Links de Navegação */}
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            🏠 Início
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/produto/marca"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            🏷️ Marcas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/produto/findByName"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            🔍 Buscar
          </NavLink>
        </li>
      </ul>

      {/* Login / Register */}
      <div className={styles.authGroup}>
        <NavLink to="/login" className={styles.authLink}>
          🔐 Login
        </NavLink>
        <NavLink to="/register" className={`${styles.authLink} ${styles.authLinkPrimary}`}>
          📝 Cadastrar
        </NavLink>
      </div>

    </nav>
  );
}
