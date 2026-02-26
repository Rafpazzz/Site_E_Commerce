import React, { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom"; // 👈 1. Importando o hook de navegação

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
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#0D1117', color: 'white', borderRadius: '8px' }}>
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📝 Criar Nova Conta</h2>

      {/* Mensagem de Sucesso */}
      {sucesso && (
        <div style={{ backgroundColor: '#238636', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }}>
          ✅ Conta criada com sucesso! Redirecionando...
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}> Username</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #30363D', backgroundColor: '#161B22', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>E-mail</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #30363D', backgroundColor: '#161B22', color: 'white' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>CPF</label>
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
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: cpfErroUx ? '1px solid #F85149' : '1px solid #30363D', backgroundColor: '#161B22', color: 'white' }}
          />
          {cpfErroUx && <p style={{ color: '#F85149', margin: '8px 0 0', fontSize: '13px' }}>{cpfErroUx}</p>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #30363D', backgroundColor: '#161B22', color: 'white' }}
          />
        </div>

        {erro && <p style={{ color: '#F85149', margin: '0', fontSize: '14px' }}>{erro}</p>}

        <button 
          type="submit" 
          disabled={isLoading || sucesso} // Desabilita o botão se já deu sucesso
          style={{ padding: '12px', backgroundColor: '#1F6FEB', color: 'white', border: 'none', borderRadius: '4px', cursor: (isLoading || sucesso) ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </button>

      </form>
    </div>
  );
}