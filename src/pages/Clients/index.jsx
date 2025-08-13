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
    const itensPorPagina = 5;

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
        <header className="header-clientes">
            <h2>Clientes</h2>
        </header>

        <main>
            <section className="cadastro-section">
                <form onSubmit={handleSubmit} className="form-cadastro">
                    <div className="campo">
                        <input
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            placeholder="Nome"
                        />
                        {errors.nome && <small className="erro">{errors.nome}</small>}
                    </div>

                    <div className="campo">
                        <input
                            name="cpf"
                            value={form.cpf}
                            onChange={handleChange}
                            placeholder="CPF"
                        />
                        {errors.cpf && <small className="erro">{erros.cpf}</small>}
                    </div>

                    <div className="campo">
                        <input
                            name="endereco"
                            value={form.endereco}
                            onChange={handleChange}
                            placeholder="Endereço"
                        />
                    </div>

                    <div className="campo">
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                        />
                        {errors.email && <small className="erro">{erros.email}</small>}
                    </div>

                    <div className="campo">
                        <input
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            placeholder="Telefone"
                        />
                    </div>

                    <button type="submit" className="btn-cadastrar">
                        Cadastrar
                    </button>
                </form>
            </section>

            <section>
                <table className="tabela-clientes">
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
                        {clientesPagina.length > 0 ? (
                            clientesPagina.map((c) => (
                                <tr key={c.clientID}>
                                    <td>{c.clientID}</td>
                                    <td>{c.nome}</td>
                                    <td>{c.cpfClient}</td>
                                    <td>{c.enderecoClient}</td>
                                    <td>{c.emailClient}</td>
                                    <td>{c.telefoneClient}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>
                                    Nenhum cliente cadastrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {totalPaginas > 1 && (
                <div className="paginacao">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPaginaAtual(i + 1)}
                            className={paginaAtual === i + 1 ? "ativo" : ""}
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
