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