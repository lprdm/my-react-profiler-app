// src/Questions.js
import React, { useState, useEffect } from 'react';
import { getInitialQuestion, postQuestion } from './api';

// Random
const min = 1;
const max = 100000;
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
const userID = randomNumber.toString();


function Questions() {
  const [questionData, setQuestionData] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [questionID, setQuestionID] = useState(null);

  useEffect(() => {
    initialQuestion();
  }, []);


  const initialQuestion = async () => {
    try {
      const data = await getInitialQuestion(userID);
      setQuestionData(data.initial_question);
      setQuestionID(data.initial_question.question_id)
      setShowContinueButton(true);
    } catch (error) {
      console.error('Error al obtener la pregunta:', error);
    }
  };

  const handleContinuar = async () => {
    console.log('questionID: ' + questionID);
    const data = await postQuestion(userID, questionID);

    // Verifica si quedan más preguntas
    if (data.next_question != null) {
      setQuestionData(data.next_question);
      setQuestionID(data.next_question.question_id)
    } else {
      // Aquí puedes manejar la lógica cuando se completan todas las preguntas
      setConfirmationMessage('¡La información se ha enviado con éxito!');
      setShowContinueButton(false);
    }
  };

  return (
    <div className="contend">
      {questionData ? (
        <div>

          <div className="question-box">
            <div className="question-title">
              <p>{questionData.question_number}. {questionData.value}</p>
            </div>

            {questionData.choice_answers.map((item, index) => (
              <div className='answer-options' key={index}>
                <label className='answer-label'>
                  <div className='answer-radio'>
                    <input type='radio' id='{index}' /> 
                  </div>
                  <div className='answer-text'>
                    <span className='answer-value'> {item.value}</span><br />
                    <span className='answer-description'> {item.description}</span>
                  </div>
    
                </label>
              </div>
            ))}
          </div>
          {showContinueButton && (
            <button className='profiler-button' onClick={handleContinuar}>Continuar</button>
          )}
          {confirmationMessage && (
            <div>
              <div className="success-message"><p>{confirmationMessage}</p></div>
              <br />
              <button onClick={() => window.location.reload()}>Recargar</button>
            </div>
          )}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );

}

export default Questions;
