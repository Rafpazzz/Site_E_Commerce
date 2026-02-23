import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../types/produto";

export function useProductListMarca(initialType: string) {
  const [marcaProd, setMarca] = useState(initialType);

  const {data, isLoading, isError} = useQuery ({
    queryKey: ['produto-spring', 'marca',marcaProd],

    queryFn: async (): Promise<Produto[]> => {
      const urlAPI = `http://localhost:8080/produto/findByMarca?marca=${marcaProd}`;

      const resposta = await fetch(urlAPI);

      if(!resposta.ok) {
        throw new Error('Error ao buscar na API do Spring Boot');
      }

      return resposta.json();
    }
  });

  return {
    data,
    isError,
    isLoading,marcaProd,setMarca
  }
  
}