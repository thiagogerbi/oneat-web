"use client"; // Define este componente como Client Component

import React, { useState } from "react";
import "./GerenciamentoPedidos.css";

function GerenciamentoPedidos() {
  const [stage, setStage] = useState(0); // Controla o estágio do pedido
  const [pedidoAtual, setPedidoAtual] = useState(null); // Guarda o pedido atual
  const [mostrarProximoPedido, setMostrarProximoPedido] = useState(false); // Alterna o estado para mostrar o próximo pedido

  const pedidos = [
    { id: 1, cliente: "João Silva", item: "Pizza Margherita" },
    { id: 2, cliente: "Maria Oliveira", item: "Lasanha Bolonhesa" },
  ];

  // Função para selecionar o pedido
  const handleSelecionarPedido = (id) => {
    const pedido = pedidos.find((p) => p.id === id); // Busca o pedido pelo ID
    setPedidoAtual(pedido); // Atualiza o estado com o pedido selecionado
    setStage(1); // Define o próximo estágio
    setMostrarProximoPedido(false);
  };

  return (
    <div>
      <h2>Gerenciamento de Pedidos</h2>
      
      {/* Lista de pedidos */}
      <div>
        {pedidos.map((pedido) => (
          <button
            key={pedido.id}
            onClick={() => handleSelecionarPedido(pedido.id)}
          >
            {pedido.cliente} - {pedido.item}
          </button>
        ))}
      </div>

      {/* Detalhes do pedido selecionado */}
      {pedidoAtual && (
        <div>
          <h3>Pedido Atual:</h3>
          <p><strong>Cliente:</strong> {pedidoAtual.cliente}</p>
          <p><strong>Item:</strong> {pedidoAtual.item}</p>

          {/* Botão para mudar de estágio */}
          <button onClick={() => setStage(stage + 1)}>
            Avançar para o próximo estágio
          </button>
        </div>
      )}

      {/* Mensagem de progresso */}
      <div>
        {stage > 0 && (
          <p>
            <strong>Estágio atual:</strong> {stage}
          </p>
        )}
      </div>
    </div>
  );
}

export default GerenciamentoPedidos;
