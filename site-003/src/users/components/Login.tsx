import React from "react";
import { useLogin } from "../hooks/useLogin.js";
import styles from "./Users.module.css";

export default function Login() {
  const { email, setEmail, password, setPassword, isLoading, erro, fazerLogin } = useLogin();

  return (
    <div className={`${styles.container} animate-reveal`}>
      
      <h2 className={styles.title}>🔐 Área Restrita</h2>

      <form onSubmit={fazerLogin} className={styles.form}>
        
        <div className={styles.fieldGroup}>
          <label className={styles.label}>E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
            placeholder="seu@email.com"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
            placeholder="••••••••"
          />
        </div>

        {/* Mostra o erro se a senha estiver errada */}
        {erro && <p className={styles.errorText}>{erro}</p>}

        <button 
          type="submit" 
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

      </form>
    </div>
  );
}