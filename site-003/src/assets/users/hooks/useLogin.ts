
import { useState } from "react";

export function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [erro, setErro] = useState("")

    const fazerLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault(); //evita que a pagina recarrege ao enviar o formulario
        setIsLoading(true);
        setErro("");
        
        try {
        const resposta = await fetch(`http://localhost:8080/auth/login`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({email, password}),
        });

        if (!resposta.ok) {
            throw new Error("E-mail ou senha incorreta");
        }

        const dados = await resposta.json();

        if (dados.token) {
            localStorage.setItem("meu_token_vip", dados.token);

            //redireciona o usuario a pagina inicial apos o sucesso.
            window.location.href = "/";
        }
        } catch(err: any) {
            setErro(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email, setEmail, password, setPassword, isLoading, setIsLoading, erro, setErro, fazerLogin
    }
}

