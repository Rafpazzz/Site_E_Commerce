import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Produto } from "../../types/produto";
import api from "../../service/api";

export function useProductListName(initialType: string) {
    const [nameProd, setName] = useState(initialType);

    const { data, isLoading, isError } = useQuery({

        queryKey: ['produto-spring', 'name', nameProd],

        queryFn: async (): Promise<Produto[]> => {

            const token = localStorage.getItem("meu_token_vip");

            const resposta = await api.get('produto/findByName', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                params: { name: nameProd }
            });

            if (resposta.status === 401 || resposta.status === 403) {
                localStorage.removeItem("meu_token_vip");
                throw new Error("Sessão expirada ou não autorizada. Faça login novamente.");
            }

            return resposta.data;
        }
    });

    return { data, isLoading, isError, nameProd, setName };
}