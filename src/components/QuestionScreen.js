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