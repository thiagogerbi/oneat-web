import React, { useEffect, useState } from "react";
import { Analytics, Visibility } from "@mui/icons-material";
import supabase from "../../supabase";
import { useAuth } from "../../context/authContext";

const Insights = () => {
  const { restaurante } = useAuth(); // Obtendo o restaurante do contexto
  const [totalSales, setTotalSales] = useState(25024); // Exemplo fixo de vendas
  const [totalViews, setTotalViews] = useState(0);

  // Função para buscar o total de visualizações do restaurante logado
  const fetchTotalViews = async () => {
    try {
      if (!restaurante || !restaurante.id) return; // Verificar se o restaurante está disponível
  
      const { data, error } = await supabase
        .from("Restaurante")
        .select("visualizacoes")
        .eq("id", restaurante.id)
        .single();
  
      if (error) {
        console.error("Erro ao buscar visualizações:", error.message);
        return;
      }
      if (data && data.visualizacoes !== undefined) {
        setTotalViews(data.visualizacoes);
      }
    } catch (error) {
      console.error("Erro ao buscar visualizações:", error.message);
    }
  };
  

  // Chamar a função ao carregar o componente ou quando o restaurante mudar
  useEffect(() => {
    fetchTotalViews();
  }, [restaurante]);

  return (
    <div className="insights">
      {/* Total de Vendas */}
      <div className="sales">
        <Analytics className="icon" />
        <div className="middle">
          <div className="left">
            <h3>Total de Vendas</h3>
            <h1>R${totalSales.toLocaleString("pt-BR")}</h1>
          </div>
          <div className="progress">
            <svg>
              <circle cx="38" cy="38" r="36"></circle>
            </svg>
            <div className="number">
              <p>81%</p>
            </div>
          </div>
        </div>
        <small className="text-muted">Últimas 24 horas</small>
      </div>

      {/* Total de Visualizações */}
      <div className="views">
        <Visibility className="icon" />
        <div className="middle">
          <div className="left">
            <h3>Total de Visualizações</h3>
            <h1>{totalViews}</h1>
          </div>
        </div>
        <small className="text-muted">Visualizações totais</small>
      </div>
    </div>
  );
};

export default Insights;
