import styles from "./clients.module.css";
import React, { useState } from "react";

export function Clients() {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        endereco: "",
        email: "",
        telefone: ""
    });
    const [errors, setErrors] = useState({});
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        let newErrors = {};
        if (!form.nome.trim()) {
            newErrors.nome = "O nome é obrigatório.";
        }

        const cpfNumeros = form.cpf.replace(/\D/g, "");
        if (!cpfNumeros) {
            newErrors.cpf = "O CPF é obrigatório.";
        } else if (!/^\d{11}$/.test(cpfNumeros)) {
            newErrors.cpf = "O CPF deve ter exatamente 11 dígitos numéricos.";
        }

        if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Digite um e-mail válido (ex: nome@dominio.com).";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const novoCliente = {
            clientID: clientes.length + 1,
            nome: form.nome,
            cpfClient: form.cpf,
            enderecoClient: form.endereco,
            emailClient: form.email,
            telefoneClient: form.telefone
        };

        setClientes([...clientes, novoCliente]);
        setForm({ nome: "", cpf: "", endereco: "", email: "", telefone: "" });
        setErrors({});
    };

    const indexUltimo = paginaAtual * itensPorPagina;
    const indexPrimeiro = indexUltimo - itensPorPagina;
    const clientesPagina = clientes.slice(indexPrimeiro, indexUltimo);
    const totalPaginas = Math.ceil(clientes.length / itensPorPagina);

    return (
        <div className={styles.clients}>
            <header className={styles["header-clientes"]}>
                <h2>Clientes</h2>
            </header>

            <main className={styles.main}>
                <section className={styles["cadastro-section"]}>
                    <form onSubmit={handleSubmit} className={styles["form-cadastro"]}>
                        <div className={styles.campo}>
                            <input
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Nome"
                            />
                            {errors.nome && <small className={styles.erro}>{errors.nome}</small>}
                        </div>

                        <div className={styles.campo}>
                            <input
                                name="cpf"
                                value={form.cpf}
                                onChange={handleChange}
                                placeholder="CPF"
                            />
                            {errors.cpf && <small className={styles.erro}>{errors.cpf}</small>}
                        </div>

                        <div className={styles.campo}>
                            <input
                                name="telefone"
                                value={form.telefone}
                                onChange={handleChange}
                                placeholder="Telefone"
                            />
                        </div>

                        <div className={styles.campo}>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                            />
                            {errors.email && <small className={styles.erro}>{errors.email}</small>}
                        </div>

                        <div className={styles.campo}>
                            <input
                                name="endereco"
                                value={form.endereco}
                                onChange={handleChange}
                                placeholder="Endereço"
                            />
                        </div>

                        <button type="submit" className={styles["btn-cadastrar"]}>
                            Cadastrar
                        </button>
                    </form>
                </section>

                <section>
                    <table className={styles["tabela-clientes"]}>
                        <thead>
                            <tr>
                                <th>clientID</th>
                                <th>Nome Cliente</th>
                                <th>CPF</th>
                                <th>Endereço</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>

                            {clientesPagina.map((cliente) => (
                                <tr key={cliente.clientID}>
                                    <td>{cliente.clientID}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpfClient}</td>
                                    <td>{cliente.enderecoClient}</td>
                                    <td>{cliente.emailClient}</td>
                                    <td>{cliente.telefoneClient}</td>
                                </tr>
                            ))}

                            {clientesPagina.length < 8 &&
                                Array.from({ length: 8 - clientesPagina.length }).map((_, i) => (
                                    <tr key={`empty-${i}`}>
                                        <td colSpan="6" style={{ height: "40px", backgroundColor: "#f9f9f9" }}></td>
                                    </tr>
                                ))}


                        </tbody>
                    </table>
                </section>

                {totalPaginas > 1 && (
                    <div className={styles.paginacao}>
                        {Array.from({ length: totalPaginas }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPaginaAtual(i + 1)}
                                className={paginaAtual === i + 1 ? styles.ativo : ""}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
