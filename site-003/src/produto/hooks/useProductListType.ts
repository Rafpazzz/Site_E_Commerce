import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../types/produto";


export function useProductListType(initialType: string) {
  const [typeProd, setType] = useState(initialType);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['produto-spring', typeProd],

    //Promise(promessa)
    //tipamos o retorno da função com um promise que devolve um array de produtos
    // Qundo usar um promise:
    //  - quando o tempo da operação não é calculavel, ou seja, um tempo imprevisivel.
    //  - quando for fazr  uma busca, salvar um arquivo, acessar camera ou microfone.
    // O que ela faz:
    //  - basicamente deixa o site esperando um ação da api sem deixar o site congelar.
    // Como usar:
    //  - usar com as palavras async e await.
    //  - async: essa funcao nao retorna dados imediatamente , ela devolve apos um promise (beeper).
    //  - await: pause essa função e espere o beeper do feach vibrar e ir para aproxima linha, mas deixe o site rodando normalmente.
    queryFn: async (): Promise<Produto[]> => {
      const urlAPI = `http://localhost:8080/produto/findByType?type=${typeProd}`;

      const resposta = await fetch(urlAPI);
      
      if(!resposta.ok) {
        throw new Error('Error ao buscar na API do Spring Boot');
      }

      return resposta.json();
    }
  });

  //retorno dos componetes que meu front ira usar
  return {
    data,
    isLoading,
    isError,
    typeProd,
    setType
  };
};

