import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../../types/produto";
import api from "../../service/api";

export function useProductListMarca(initialType: string) {
  const [marcaProd, setMarca] = useState(initialType);

  const { data, isLoading, isError } = useQuery({
    //o terceiro atributo é para guardar em uma gaveta os tipos sem misturar os produtos.
    // queryKey: ['busca-marca', marcaProd] // posso manter desssa forma, mas se tiver um terceiro atributo ajuda ao react a nao misturar produtos de tipo diferente
    queryKey: ['produto-spring', 'marca', marcaProd],

    queryFn: async (): Promise<Produto[]> => {

      const token = localStorage.getItem("meu_token_vip");

      const resposta = await api.get('produto/findByMarca', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        params: { marca: marcaProd }

      });

      if (resposta.status === 401 || resposta.status === 403) {
        localStorage.removeItem("meu_token_vip");
        throw new Error("Sessão expirada ou não autorizada. Faça login novamente.");
      }

      return resposta.data();
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