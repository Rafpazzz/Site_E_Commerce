import React from "react";
import { useLogin } from "../hooks/useLogin.js";

export default function Login() {
  const { email, setEmail, password, setPassword, isLoading, erro, fazerLogin } = useLogin();

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#0D1117', color: 'white', borderRadius: '8px' }}>
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🔐 Área Restrita</h2>

      <form onSubmit={fazerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
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
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #30363D', backgroundColor: '#161B22', color: 'white' }}
          />
        </div>

        {/* Mostra o erro em vermelho se a senha estiver errada */}
        {erro && <p style={{ color: '#F85149', margin: '0', fontSize: '14px' }}>{erro}</p>}

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: '12px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

      </form>
    </div>
  );
}