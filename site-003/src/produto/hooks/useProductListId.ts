import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../../types/produto";
import api from "../../service/api"

export function useProductListId(initialType: number) {
    const [idProd, setId] = useState(initialType);

    const { data, isError, isLoading } = useQuery({
        queryKey: ['product-spring', idProd],
        queryFn: async (): Promise<Produto[]> => {

            // const urlAPI = `http://localhost:8080/produto/findById?id=${idProd}`;
            const token = localStorage.getItem("meu_token_vip");

            const resposta = await api.get('produto/findById', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                params: { id: idProd }
            })

            if (resposta.status === 401 || resposta.status === 403) {
                localStorage.removeItem("meu_token_vip");
                throw new Error("Sessão expirada ou não autorizada. Faça login novamente.");
            }

            return resposta.data();
        }
    });

    return {
        data, isError, isLoading, idProd, setId
    };
}