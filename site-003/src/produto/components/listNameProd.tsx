import React from 'react';
import { useProductListName } from '../hooks/useProductListName';
import { Produto } from "../types/produto";
import styles from "./ListTypeProducts.module.css";

// Lembre-se: Componente React sempre começa com letra Maiúscula
export default function ListNameProd() {
  // Começamos com uma string vazia ("") para ele não filtrar nada logo de cara
  const { data, isLoading, isError, nameProd, setName } = useProductListName("");

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>
        🔍 TechStore | Buscar por Nome
      </h1>
      
      {/* 🚀 AQUI ESTÁ A NOVIDADE: Uma barra de pesquisa no lugar dos botões */}
      <div className={styles.filterGroup}>
        <input 
          type="text" 
          value={nameProd}
          // Toda vez que o usuário digita uma letra, atualizamos o state e o React Query faz a busca!
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do produto (ex: Ryzen, Placa, etc)..."
          style={{
            padding: '12px 15px',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#161B22',
            color: '#C9D1D9',
            border: '1px solid #30363D',
            borderRadius: '6px',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      <h2 className={styles.subtitle}>
        Resultados para: <span className={styles.highlight}>{nameProd || "Todos os Produtos"}</span>
      </h2>

      {isLoading && <h2 style={{ color: '#8B949E' }}>Buscando dados na API...</h2>}
      {isError && <h2 style={{ color: '#F85149' }}>Erro inesperado ao buscar produtos.</h2>}

      {/* Grid de Produtos */}
      <div className={styles.grid}>
        
        {data && data.map((produto: Produto) => (
          <div key={produto.id} className={styles.card}>
            
            <div>
              <h3 className={styles.cardTitle}>{produto.name || 'Nome do Produto'}</h3>
              <p className={produto.isDisponivel ? styles.estoque : styles.esgotado}>
                {produto.isDisponivel ? '✅ Em Estoque' : '❌ Esgotado'}
              </p>
            </div>

            <div className={styles.priceContainer}>
              <p className={styles.priceLabel}>Preço à vista no PIX</p>
              <p className={styles.priceValue}>{formatarPreco(produto.price)}</p>
              <button className={styles.btnBuy}>🛒 Comprar</button>
            </div>

          </div>
        ))}

        {/* Feedback de Lista Vazia */}
        {data && data.length === 0 && !isLoading && (
          <div className={styles.emptyState}>
            <p>Nenhum produto encontrado com o nome "{nameProd}".</p>
          </div>
        )}

      </div>
    </div>
  );
}