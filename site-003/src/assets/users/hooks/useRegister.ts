
import React, { useState } from "react";

export function useRegister() {
    const [name, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const registrarUsuario = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErro("");
        setSucesso(true);

        try {
            const resposta = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password})
            });

            if (!resposta.ok) {
                throw new Error("Erro ao criar a conta. Verifique os dados ou tente outro e-mail.")
            }

            setSucesso(true)

            setNome("");
            setEmail("");
            setPassword("");
        }catch (err : any) {
            setErro(err.message);
        }finally {
            setIsLoading(false);
        }
    }

    return {
        name, setNome,
        email, setEmail,
        password, setPassword,
        isLoading,
        erro,
        sucesso,
        registrarUsuario,
    };

}