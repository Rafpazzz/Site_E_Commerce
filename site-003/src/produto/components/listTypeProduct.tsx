import React, { useEffect } from 'react';
import { useProductListType } from '../hooks/useProductListType';
import { Produto } from "../../types/produto";
import styles from './ListTypeProducts.module.css';

// Componentes React SEMPRE começam com letra maiúscula
export default function ListTypeProduct() {
  const { data, isLoading, isError, error, typeProd, setType } = useProductListType("PROCESSADOR");

  useEffect(() => {
    if (isError) {
      console.error("Erro ao buscar dados na API:", error);
    }
  }, [isError, error]);

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    // USAMOS O className={styles.nomeDaClasse}
    <div className={styles.container}>
      
      <h1 className={styles.title}>
        ⚡ TechStore | E-Commerce
      </h1>
      
      <div className={styles.filterGroup}>
        <button className={styles.btnFilter} onClick={() => setType("PROCESSADOR")}>
          ⚙️ Processadores
        </button>

        <button className={styles.btnFilter} onClick={() => setType("PLACA_MAE")}>
          🖛 Placas-Mãe
        </button>
      </div>

      <h2 className={styles.subtitle}>
        Exibindo resultados para: <span className={styles.highlight}>{typeProd}</span>
      </h2>

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
                  
                  {/* Lógica condicional para a classe do estoque */}
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

            {/* Mensagem caso a categoria não tenha produtos e não esteja carregando */}
            {data && data.length === 0 && !isLoading && (
              <div className={styles.emptyState}>
                <p>Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}