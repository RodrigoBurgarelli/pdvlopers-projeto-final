import React, { useState } from "react";
import styles from "./clients.module.css";

export function Clients() {
    const [clientes, setClientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [clienteEditando, setClienteEditando] = useState(null);

    // estados do formulário
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [fixo, setFixo] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");

    const [filtro, setFiltro] = useState("");

    // Paginação
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const resetForm = () => {
        setNome("");
        setCpf("");
        setEmail("");
        setCelular("");
        setFixo("");
        setLogradouro("");
        setNumero("");
        setBairro("");
        setCidade("");
        setEstado("");
        setCep("");
        setClienteEditando(null);
    };

    const calcularPontos = (compras) => {
        return Math.floor((compras || 0) / 100) * 10;
    };

    const handleCadastrar = () => {
        if (clienteEditando) {
            setClientes(
                clientes.map((c) =>
                    c.id === clienteEditando.id
                        ? {
                            ...clienteEditando,
                            nome,
                            cpf,
                            email,
                            celular,
                            fixo,
                            logradouro,
                            numero,
                            bairro,
                            cidade,
                            estado,
                            cep,
                        }
                        : c
                )
            );
        } else {
            const novoCliente = {
                id: Date.now(),
                nome,
                cpf,
                email,
                celular,
                fixo,
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                compras: 0,
            };
            setClientes([...clientes, novoCliente]);
        }
        resetForm();
        setMostrarModal(false);
    };

    const handleEditar = (cliente) => {
        setClienteEditando(cliente);
        setNome(cliente.nome);
        setCpf(cliente.cpf);
        setEmail(cliente.email);
        setCelular(cliente.celular);
        setFixo(cliente.fixo);
        setLogradouro(cliente.logradouro);
        setNumero(cliente.numero);
        setBairro(cliente.bairro);
        setCidade(cliente.cidade);
        setEstado(cliente.estado);
        setCep(cliente.cep);
        setMostrarModal(true);
    };

    const handleExcluir = (id) => {
        setClientes(clientes.filter((c) => c.id !== id));
    };

    const handleAbrirModal = (cliente) => {
        handleEditar(cliente);
    };

    const clientesFiltrados = clientes.filter((c) =>
        c.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    // Paginação
    const indexUltimo = paginaAtual * itensPorPagina;
    const indexPrimeiro = indexUltimo - itensPorPagina;
    const clientesPagina = clientesFiltrados.slice(indexPrimeiro, indexUltimo);
    const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);

    return (
        <div className={styles.clients}>
            <header className={styles.headerClientes}>
                <h2>Clientes</h2>
            </header>

            <div className={styles.actionsBar}>
                <input
                    type="text"
                    placeholder="Pesquisar cliente..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <button
                    className={styles.btnNovoCliente}
                    onClick={() => {
                        resetForm();
                        setMostrarModal(true);
                    }}
                >
                    Novo Cliente
                </button>
            </div>

            <div className={styles.listaClientes}>
                {clientesPagina.map((cliente) => (
                    <div
                        key={cliente.id}
                        className={styles.clienteCard}
                        onClick={() => handleAbrirModal(cliente)}
                    >
                        <div className={styles.cardInfo}>
                            <span>{cliente.nome}</span>
                            <span>{cliente.cpf}</span>
                            <span>Pontuação: {calcularPontos(cliente.compras).toString().padStart(4, "0")}</span>
                        </div>

                        <div className={styles.cardActions}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditar(cliente);
                                }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleExcluir(cliente.id);
                                }}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação */}
            {totalPaginas > 1 && (
                <div className={styles.paginacao}>
                    <button onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}>{"<"}</button>
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPaginaAtual(i + 1)}
                            className={paginaAtual === i + 1 ? styles.ativo : ""}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}>{">"}</button>
                </div>
            )}

            {mostrarModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>
                            {clienteEditando ? "Editar Cliente" : "Cadastrar Novo Cliente"}
                        </h3>

                        <div className={styles.formCadastro}>
                            <div className={`${styles.campo} ${styles.nome}`}>
                                <label>Nome Completo</label>
                                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.cpf}`}>
                                <label>CPF</label>
                                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.email}`}>
                                <label>E-mail</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.celular}`}>
                                <label>Celular</label>
                                <input type="text" value={celular} onChange={(e) => setCelular(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.fixo}`}>
                                <label>Telefone Fixo</label>
                                <input type="text" value={fixo} onChange={(e) => setFixo(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.logradouro}`}>
                                <label>Logradouro</label>
                                <input type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.numero}`}>
                                <label>Número</label>
                                <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.bairro}`}>
                                <label>Bairro</label>
                                <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.cidade}`}>
                                <label>Cidade</label>
                                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.estado}`}>
                                <label>Estado</label>
                                <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} />
                            </div>
                            <div className={`${styles.campo} ${styles.cep}`}>
                                <label>CEP</label>
                                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} />
                            </div>
                        </div>

                        <div className={styles.modalActions}>
                            <button onClick={() => setMostrarModal(false)}>Cancelar</button>
                            <button onClick={handleCadastrar}>
                                {clienteEditando ? "Salvar Alterações" : "Cadastrar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}