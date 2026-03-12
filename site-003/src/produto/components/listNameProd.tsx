import React, { useEffect } from 'react';
import { useProductListName } from '../hooks/useProductListName';
import { Produto } from "../../types/produto";
import styles from "./ListTypeProducts.module.css";

// Lembre-se: Componente React sempre começa com letra Maiúscula
export default function ListNameProd() {
  // Começamos com uma string vazia ("") para ele não filtrar nada logo de cara
  const { data, isLoading, isError, error, nameProd, setName } = useProductListName("");

  useEffect(() => {
    if (isError) {
      console.error("Erro ao buscar dados na API:", error);
    }
  }, [isError, error]);

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
          className={styles.searchInput}
        />
      </div>

      <h2 className={styles.subtitle}>
        Resultados para: <span className={styles.highlight}>{nameProd || "Todos os Produtos"}</span>
      </h2>

      {/* Grid de Produtos */}
      <div className={styles.grid}>
        
        {isError ? (
          <div className={styles.emptyState}>
            <p>Erro inesperado ou API está desligada.</p>
          </div>
        ) : (
          <>
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
          </>
        )}

      </div>
    </div>
  );
}