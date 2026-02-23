import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../../types/produto";

export function useProductListMarca(initialType: string) {
  const [marcaProd, setMarca] = useState(initialType);

  const {data, isLoading, isError} = useQuery ({
    //o terceiro atributo é para guardar em uma gaveta os tipos sem misturar os produtos.
    // queryKey: ['busca-marca', marcaProd] // posso manter desssa forma, mas se tiver um terceiro atributo ajuda ao react a nao misturar produtos de tipo diferente
    queryKey: ['produto-spring', 'marca',marcaProd],

    queryFn: async (): Promise<Produto[]> => {
      const urlAPI = `http://localhost:8080/produto/findByMarca?marca=${marcaProd}`;

      const token = localStorage.getItem("meu_token_vip");

      const resposta = await fetch(urlAPI, {
        method: "GET",
        headers: {
          'Content-Type':'application/json',
          'Authorization' : token ? `Bearer ${token}` : ''
        },

      });

      if(resposta.status === 401 || resposta.status === 403) {
        localStorage.removeItem("meu_token_vip");
        throw new Error("Sessão expirada ou não autorizada. Faça login novamente.");
      }

      if (!resposta.ok) {
        throw new Error('Erro ao buscar na API do Spring Boot');
      }

      return resposta.json();
    }
  });

  return {
    data,
    isError,
    isLoading,
    marcaProd,
    setMarca
  }
  
}