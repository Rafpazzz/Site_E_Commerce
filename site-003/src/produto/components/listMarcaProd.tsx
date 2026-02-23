import React from 'react';
import { useProductListMarca } from '../hooks/useProductListMarca';
import { Produto } from "../types/produto";
import styles from "./ListTypeProducts.module.css";

export default function ListMarcaProduct() {
  const { data, isLoading, isError, marcaProd, setMarca } = useProductListMarca("Intel");

  if(isLoading) return <h2>Buscando dados na API...</h2>;
  if(isError) return <h2>Erro inesperado ao buscar marcas.</h2>;

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>
        🏷️ TechStore | Buscar por Marca
      </h1>
      
      {/* Botões de Filtro de Marca */}
      <div className={styles.filterGroup}>
        <button className={styles.btnFilter} onClick={() => setMarca("ASUS")}>
          🐉 ASUS
        </button>

        <button className={styles.btnFilter} onClick={() => setMarca("INTEL")}>
          🟦 INTEL
        </button>

        <button className={styles.btnFilter} onClick={() => setMarca("AMD")}>
          🟥 AMD
        </button>
      </div>

      <h2 className={styles.subtitle}>
        Exibindo produtos da marca: <span className={styles.highlight}>{marcaProd}</span>
      </h2>

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

        {/* Mensagem caso a marca não tenha produtos */}
        {data && data.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhum produto encontrado para a marca {marcaProd}.</p>
          </div>
        )}

      </div>
    </div>
  );
}