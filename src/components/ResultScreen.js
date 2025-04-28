import React from 'react';

function ResultScreen({ answers, onReset }) {
  const getHighestType = () => {
    const types = Object.entries(answers);
    types.sort((a, b) => b[1] - a[1]);
    return types[0];
  };
  
  const [dominantType, score] = getHighestType();
  
  // Calcular total de questões respondidas
  const totalAnswers = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  const descriptions = {
    D: {
      title: "DOMINADOR",
      description: "Você tem uma personalidade dominante, assertiva e orientada para resultados. Gosta de liderar, tomar decisões rápidas e buscar desafios. É direto, competitivo e focado em atingir objetivos."
    },
    I: {
      title: "INTENSO",
      description: "Você tem uma personalidade expressiva, entusiasta e social. Gosta de interagir com pessoas, é otimista, persuasivo e espontâneo. É criativo, comunicativo e busca ambientes dinâmicos."
    },
    C: {
      title: "CONTROLADOR",
      description: "Você tem uma personalidade analítica, detalhista e precisa. Valoriza a qualidade, é metódico e busca perfeição. Prefere ambientes estruturados, seguir regras e evitar riscos."
    },
    A: {
      title: "AMOROSO",
      description: "Você tem uma personalidade estável, paciente e confiável. É um bom ouvinte, leal e busca harmonia. Valoriza relacionamentos estáveis, segurança e prefere ambientes previsíveis."
    }
  };

  return (
    <div className="result-container">
      <h2>Seu resultado</h2>
      <div className="result-card">
        <h3>Seu perfil predominante é:</h3>
        <div className="dominant-type">
          {descriptions[dominantType].title}
        </div>
        <div className="type-description">
          {descriptions[dominantType].description}
        </div>
        
        <div className="scores">
          <h4>Distribuição do seu perfil:</h4>
          <div className="score-bars">
            {Object.entries(answers).map(([type, value]) => (
              <div key={type} className="score-item">
                <div className="score-label">{descriptions[type].title}</div>
                <div className="score-bar-container">
                  <div 
                    className="score-bar" 
                    style={{ 
                      width: `${(value / totalAnswers) * 100}%`, // Usando totalAnswers calculado acima
                      backgroundColor: type === dominantType ? '#4CAF50' : '#ddd'
                    }}
                  ></div>
                </div>
                <div className="score-value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="reset-button" onClick={onReset}>
        Fazer o teste novamente
      </button>
    </div>
  );
}

export default ResultScreen;