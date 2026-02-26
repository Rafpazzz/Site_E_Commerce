import React, { useState } from "react";

export function useRegister() {
    const [name, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const[role, setRole] = useState(1);

    const registrarUsuario = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErro("");
        setSucesso(false);

        try {
            const cpfLimpo = cpf.replace(/\D/g, "").trim();

            if (cpfLimpo.length !== 11) {
                throw new Error("CPF inválido. Informe 11 dígitos.");
            }

            const payload = {
                username: name.trim(),
                name: name.trim(),
                cpf: cpfLimpo,
                email: email.trim(),
                password,
                role
            };

            const resposta = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!resposta.ok) {
                let mensagemErro = "Erro ao criar a conta. Verifique os dados.";

                try {
                    const erroApi = await resposta.json();
                    mensagemErro = erroApi?.message || erroApi?.error || mensagemErro;
                } catch {
                    const erroTexto = await resposta.text();
                    if (erroTexto) mensagemErro = erroTexto;
                }

                if (resposta.status === 403) {
                    throw new Error(`Acesso negado (403). ${mensagemErro}`);
                }

                throw new Error(mensagemErro);
            }

            setSucesso(true)

            setNome("");
            setCpf("");
            setEmail("");
            setPassword("");
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        name, setNome,
        cpf, setCpf,
        email, setEmail,
        password, setPassword,
        isLoading,
        erro,
        sucesso,
        registrarUsuario,
        role, setRole
    };

}