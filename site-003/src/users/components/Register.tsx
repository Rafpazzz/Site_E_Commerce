import React, { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom"; // 👈 1. Importando o hook de navegação
import styles from "./Users.module.css";

function isValidCPF(value: string) {
  const cpf = value.replace(/\D/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }
  let checkDigit = (sum * 10) % 11;
  if (checkDigit === 10) checkDigit = 0;
  if (checkDigit !== Number(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }
  checkDigit = (sum * 10) % 11;
  if (checkDigit === 10) checkDigit = 0;

  return checkDigit === Number(cpf[10]);
}

export default function Register() {
  const { 
    name, setNome, 
    cpf, setCpf,
    email, setEmail, 
    password, setPassword, 
    isLoading, erro, sucesso, registrarUsuario 
  } = useRegister();

  const [cpfErroUx, setCpfErroUx] = useState("");

  const navigate = useNavigate(); // 👈 2. Inicializando o navegador

  // 👈 3. Monitorando a variável "sucesso"
  useEffect(() => {
    if (sucesso) {
      // Espera 2 segundos (2000 ms) para o usuário ler a mensagem e redireciona
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer); // Limpa o timer para evitar bugs
    }
  }, [sucesso, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (!isValidCPF(cpfLimpo)) {
      e.preventDefault();
      setCpfErroUx("CPF inválido. Verifique os dígitos informados.");
      return;
    }

    setCpfErroUx("");
    registrarUsuario(e);
  };

  return (
    <div className={`${styles.container} animate-reveal`}>
      
      <h2 className={styles.title}>📝 Criar Nova Conta</h2>

      {/* Mensagem de Sucesso */}
      {sucesso && (
        <div className={styles.successBox}>
          ✅ Conta criada com sucesso! Redirecionando...
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Username</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
            placeholder="Como quer ser chamado?"
          />
        </div>

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
          <label className={styles.label}>CPF</label>
          <input 
            type="text"
            value={cpf}
            onChange={(e) => {
              const cpfDigitado = e.target.value.replace(/\D/g, '').slice(0, 11);
              setCpf(cpfDigitado);
              if (cpfErroUx && isValidCPF(cpfDigitado)) {
                setCpfErroUx("");
              }
            }}
            required
            maxLength={11}
            placeholder="Somente números"
            className={`${styles.input} ${cpfErroUx ? styles.inputError : ""}`}
          />
          {cpfErroUx && <p className={styles.errorText}>{cpfErroUx}</p>}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} 
            className={styles.input}
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {erro && <p className={styles.errorText}>{erro}</p>}

        <button 
          type="submit" 
          disabled={isLoading || sucesso} // Desabilita o botão se já deu sucesso
          className={styles.button}
        >
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </button>

      </form>
    </div>
  );
}