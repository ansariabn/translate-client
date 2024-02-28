import React, { useState } from 'react';
import "../trnaslate/Translate.css"

function Translate() {
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');

  const[errorMessage, setErrorMessage] = useState('');

  const handleTranslate = () => {
    fetch('http://localhost:8080/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => setTranslation(data.translation))
    .catch(error => setErrorMessage( "server fetching error !!!", error.message))

    setTimeout(() => {
        setErrorMessage("")
       
    }, 1000)
  };

  return (
    
    <div className="Container">
        {errorMessage && <p className="Error"> {errorMessage} </p> } 
      <h1>English to French Translation</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter English text to translate..."
        rows="8"
        cols="80"
      />
      <br />
      <button onClick={handleTranslate}>Translate</button>
      <br />
      <h2>Translation:</h2>
      <p>{translation}</p>
    </div>
  );
}

export default Translate;
