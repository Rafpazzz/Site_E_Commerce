import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../types/produto";

export function useProductListId(initialType:number) {
    const [idPord, setId] = useState(initialType);

    const {data, isError, isLoading} = useQuery ({
        queryKey:['product-spring', idPord],
        queryFn: async(): Promise<Produto[]> => {
            const urlAPI = `http://localhost:8080/produto/findById?id=${idPord}`;

            const resposta = await fetch(urlAPI);

            if(!resposta.ok) {
                throw new Error("erro ao conectar na API");
            }

            return resposta.json();
        }
    });

    return {
        data,isError,isLoading,idPord,setId
    };
}