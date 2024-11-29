"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../GerenciamentoPedidos.css"; // Arquivo de estilos

const PedidoDetails = () => {
  const { orderId } = useParams(); // Obtém o orderId da URL
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(0); // Estado para a barra de progresso

  const statuses = [
    "Pendente",
    "Aceito",
    "Em Preparo",
    "A caminho",
    "Entregue",
  ];

  useEffect(() => {
    if (orderId) {
      fetch(`/api/pedidos/${orderId}`) // Faz a requisição para a API
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro ao buscar os detalhes do pedido.");
          }
          return res.json();
        })
        .then((data) => {
          setPedido(data);
          setCurrentStatus(data.statusIndex); // Defina o status do pedido com base no índice retornado
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao carregar pedido:", error.message);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [orderId]);

  const handleNextStep = () => {
    if (currentStatus < statuses.length - 1) {
      setCurrentStatus(currentStatus + 1);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  // Aqui você pode acessar o ID do cliente e o ID do endereço
  const enderecoCliente = pedido?.cliente?.endereco; // Diretamente no objeto endereco

  return (
    <div>
      <h2>Detalhes do Pedido #{orderId}</h2>

      <div className="order-progress">
        <div className="progress-bar">
          {statuses.map((status, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStatus ? "active" : ""}`}
            >
              <span>{status}</span>
            </div>
          ))}
        </div>
        <button onClick={handleNextStep} className="next-step-button">
          Avance para a próxima etapa
        </button>
      </div>

      <div>
        <h3>Informações do Pedido</h3>
        <p><strong>ID do Pedido:</strong> {pedido.id}</p>
        <p><strong>Produto:</strong> {pedido.produto?.nome}</p>
        <p><strong>Descrição:</strong> {pedido.produto?.descricao}</p>
        <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
        <p><strong>Método de Pagamento:</strong> {pedido.forma_pagto}</p>
        <p><strong>Status:</strong> {statuses[currentStatus]}</p>
      </div>

      {/* Exibindo os dados do cliente */}
      {pedido.cliente && (
        <div>
          <h3>Informações do Cliente</h3>
          <p><strong>Nome do Cliente:</strong> {pedido.cliente.nome}</p>
          <p><strong>Email:</strong> {pedido.cliente.email}</p>
          <p><strong>Telefone:</strong> {pedido.cliente.telefone}</p>
        </div>
      )}

      {/* Verificando se o cliente tem um endereço associado */}
      {enderecoCliente && (
        <div>
          <h3>Endereço de Entrega</h3>
          <p>{enderecoCliente.rua}, {enderecoCliente.numero}</p>
          <p>{enderecoCliente.complemento ? `${enderecoCliente.complemento}` : ""}</p>
          <p>{enderecoCliente.cidade} - {enderecoCliente.estado}</p>
          <p><strong>CEP:</strong> {enderecoCliente.cep}</p>
        </div>
      )}

      <div>
        <h3>Total</h3>
        <p><strong>Total do Pedido:</strong> R$ {pedido.total}</p>
      </div>
    </div>
  );
};

export default PedidoDetails;
