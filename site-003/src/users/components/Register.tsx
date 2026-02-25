import React from "react";
import { useRegister } from "../hooks/useRegister";
// Se você quiser, pode importar o Link do react-router-dom para fazer um botão de "Voltar para o Login"

export default function Register() {
  const { 
    name, setNome, 
    email, setEmail, 
    password, setPassword, 
    isLoading, erro, sucesso, registrarUsuario 
  } = useRegister();

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', backgroundColor: '#0D1117', color: 'white', borderRadius: '8px' }}>
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>📝 Criar Nova Conta</h2>

      {/* Mensagem de Sucesso */}
      {sucesso && (
        <div style={{ backgroundColor: '#238636', padding: '10px', borderRadius: '4px', marginBottom: '15px', textAlign: 'center' }}>
          ✅ Conta criada com sucesso! Você já pode fazer login.
        </div>
      )}

      <form onSubmit={registrarUsuario} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nome Completo</label>
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
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6} // Exigindo no mínimo 6 caracteres
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #30363D', backgroundColor: '#161B22', color: 'white' }}
          />
        </div>

        {/* Mostra o erro em vermelho se algo der errado */}
        {erro && <p style={{ color: '#F85149', margin: '0', fontSize: '14px' }}>{erro}</p>}

        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: '12px', backgroundColor: '#1F6FEB', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
        >
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </button>

      </form>
    </div>
  );
}