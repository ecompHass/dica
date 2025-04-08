// src/App.js
import React, { useState } from 'react';
import './App.css';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import questionsData from './data/questions';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({
    D: 0,
    I: 0,
    C: 0,
    A: 0
  });

  const handleAnswer = (type) => {
    // Incrementa o contador para o tipo selecionado
    setAnswers(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));

    // Avança para a próxima pergunta ou mostra resultado
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({
      D: 0,
      I: 0,
      C: 0,
      A: 0
    });
    setCurrentQuestion(0);
    setShowResult(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Questionário de Perfil Comportamental</h1>
      </header>
      <main>
        {!showResult ? (
          <QuestionScreen 
            question={questionsData[currentQuestion]} 
            onAnswer={handleAnswer}
            progress={(currentQuestion / questionsData.length) * 100}
            questionNumber={currentQuestion + 1}
            totalQuestions={questionsData.length}
          />
        ) : (
          <ResultScreen 
            answers={answers} 
            onReset={resetQuiz}
          />
        )}
      </main>
    </div>
  );
}

export default App;

// src/components/QuestionScreen.js
import React from 'react';

function QuestionScreen({ question, onAnswer, progress, questionNumber, totalQuestions }) {
  return (
    <div className="question-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="question-counter">
        Pergunta {questionNumber} de {totalQuestions}
      </div>
      <div className="question">
        <h2>Escolha a palavra que melhor descreve você:</h2>
        <div className="options">
          {question.map((option, index) => (
            <button 
              key={index} 
              className="option-button" 
              onClick={() => onAnswer(option.type)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionScreen;

// src/components/ResultScreen.js
import React from 'react';

function ResultScreen({ answers, onReset }) {
  const getHighestType = () => {
    const types = Object.entries(answers);
    types.sort((a, b) => b[1] - a[1]);
    return types[0];
  };
  
  const [dominantType, score] = getHighestType();
  
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
                      width: `${(value / 24) * 100}%`,
                      backgroundColor: type === dominantType ? '#4CAF50' : '#ddd'
                    }}
                  ></div>
                </div>
                <div className="score-value">{value}/{totalQuestions}</div>
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

// src/data/questions.js
const questionsData = [
  [
    { text: "Enérgico", type: "D" },
    { text: "Expressivo", type: "I" },
    { text: "Cuidadoso", type: "C" },
    { text: "Controlado", type: "A" }
  ],
  [
    { text: "Pioneiro", type: "D" },
    { text: "Empolgante", type: "I" },
    { text: "Exato", type: "C" },
    { text: "Satisfeito", type: "A" }
  ],
  [
    { text: "Audacioso", type: "D" },
    { text: "Animado", type: "I" },
    { text: "Precioso", type: "C" },
    { text: "Disposto", type: "A" }
  ],
  [
    { text: "Argumentativo", type: "D" },
    { text: "Imprevisível", type: "I" },
    { text: "Cético", type: "C" },
    { text: "Indeciso", type: "A" }
  ],
  [
    { text: "Ousado", type: "D" },
    { text: "Extrovertido", type: "I" },
    { text: "Respeitoso", type: "C" },
    { text: "Paciente", type: "A" }
  ],
  [
    { text: "Auto-Confiante", type: "D" },
    { text: "Persuasivo", type: "I" },
    { text: "Lógico", type: "C" },
    { text: "Mandão", type: "A" }
  ],
  [
    { text: "Decidido", type: "D" },
    { text: "Festivo", type: "I" },
    { text: "Cauteloso", type: "C" },
    { text: "Moderado", type: "A" }
  ],
  [
    { text: "Afirmativo", type: "D" },
    { text: "Querido", type: "I" },
    { text: "Perfeccionista", type: "C" },
    { text: "Generoso", type: "A" }
  ],
  [
    { text: "Inflexível", type: "D" },
    { text: "Vívida", type: "I" },
    { text: "Modesto", type: "C" },
    { text: "Pacato", type: "A" }
  ],
  [
    { text: "Persistente", type: "D" },
    { text: "Adaptável", type: "I" },
    { text: "Sistemático", type: "C" },
    { text: "Amável", type: "A" }
  ],
  [
    { text: "Determinado", type: "D" },
    { text: "Falante", type: "I" },
    { text: "Submisso", type: "C" },
    { text: "Prestativo", type: "A" }
  ],
  [
    { text: "Obstinado", type: "D" },
    { text: "Brincalhão", type: "I" },
    { text: "Observador", type: "C" },
    { text: "Amistoso", type: "A" }
  ],
  [
    { text: "Aventureiro", type: "D" },
    { text: "Encantador", type: "I" },
    { text: "Disciplinado", type: "C" },
    { text: "Intencional", type: "A" }
  ],
  [
    { text: "Agressivo", type: "D" },
    { text: "Atraente", type: "I" },
    { text: "Influente", type: "C" },
    { text: "Constante", type: "A" }
  ],
  [
    { text: "Determinado", type: "D" },
    { text: "Idealista", type: "I" },
    { text: "Analítico", type: "C" },
    { text: "Compreensivo", type: "A" }
  ],
  [
    { text: "Controlador", type: "D" },
    { text: "Impulsivo", type: "I" },
    { text: "Crítico", type: "C" },
    { text: "Vagaroso", type: "A" }
  ],
  [
    { text: "Forte Personalidade", type: "D" },
    { text: "Vigoroso", type: "I" },
    { text: "Competitivo", type: "C" },
    { text: "Descontraído", type: "A" }
  ],
  [
    { text: "Independente", type: "D" },
    { text: "Influente", type: "I" },
    { text: "Metódico", type: "C" },
    { text: "Gentil", type: "A" }
  ],
  [
    { text: "Franco", type: "D" },
    { text: "Popular", type: "I" },
    { text: "Idealista", type: "C" },
    { text: "Agradável", type: "A" }
  ],
  [
    { text: "Impaciente", type: "D" },
    { text: "Emocional", type: "I" },
    { text: "Sério", type: "C" },
    { text: "Procrastinador", type: "A" }
  ],
  [
    { text: "Competitivo", type: "D" },
    { text: "Espontâneo", type: "I" },
    { text: "Ensinável", type: "C" },
    { text: "Leal", type: "A" }
  ],
  [
    { text: "Corajoso", type: "D" },
    { text: "Convincente", type: "I" },
    { text: "Auto Sacrificante", type: "C" },
    { text: "Atencioso", type: "A" }
  ],
  [
    { text: "Empreendedor", type: "D" },
    { text: "Volúvel", type: "I" },
    { text: "Calmo", type: "C" },
    { text: "Dependente", type: "A" }
  ],
  [
    { text: "Direcionador", type: "D" },
    { text: "Estimulante", type: "I" },
    { text: "Convencional", type: "C" },
    { text: "Tolerante", type: "A" }
  ]
];

export default questionsData;

// src/App.css
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

.App {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.App-header {
  background-color: #282c34;
  color: white;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  margin-bottom: 20px;
}

.question-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.5s ease-in-out;
}

.question-counter {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 30px;
}

.option-button {
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.option-button:hover {
  background-color: #e8f5e9;
  border-color: #4CAF50;
}

.result-container {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.result-card {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 30px;
}

.dominant-type {
  font-size: 32px;
  font-weight: bold;
  color: #4CAF50;
  margin: 20px 0;
}

.type-description {
  text-align: left;
  line-height: 1.6;
  margin-bottom: 30px;
}

.scores {
  margin-top: 30px;
}

.score-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.score-label {
  width: 120px;
  text-align: right;
  padding-right: 15px;
  font-weight: bold;
}

.score-bar-container {
  flex-grow: 1;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.score-bar {
  height: 100%;
  transition: width 0.8s ease-in-out;
}

.score-value {
  width: 60px;
  text-align: left;
  padding-left: 15px;
}

.reset-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: #388E3C;
}

// Dockerfile
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

// nginx/nginx.conf
server {
    listen 80;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}

// public/index.html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Questionário de Perfil Comportamental DISC"
    />
    <title>Questionário DISC</title>
  </head>
  <body>
    <noscript>Você precisa habilitar JavaScript para executar este aplicativo.</noscript>
    <div id="root"></div>
  </body>
</html>

// package.json
{
  "name": "disc-questionnaire",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
