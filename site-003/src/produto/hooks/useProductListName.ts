import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../../types/produto";

export function useProductListName(initialType: string) {
    const[nameProd, setName] = useState(initialType);

    const {data, isLoading, isError} = useQuery({
        queryKey: ['produto-spring', 'name' ,nameProd],
        queryFn: async(): Promise<Produto[]> => {
            const urlAPI = `http://localhost:8080/produto/findByName?name=${nameProd}`;

            const resposta = await fetch(urlAPI);

            if(!resposta.ok) {
                throw new Error("Erro ao buscar na api");
            }

            return resposta.json();
        }
    });

    return { data, isLoading, isError, nameProd, setName };
}