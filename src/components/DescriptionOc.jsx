import { useState } from 'react';

function DescriptionOc() {
  const [descriptions, setDescriptions] = useState([
    { id: 1, text: '', input: '' }
  ]);

  const MAX_DESCRIPTIONS = 3; // Límite de textareas

  const handleButtonClick = (id) => {
    setDescriptions(descriptions.map(desc => 
      desc.id === id ? { ...desc, text: desc.input, input: '' } : desc
    ));
  };

  const handleInputChange = (id, value) => {
    setDescriptions(descriptions.map(desc => 
      desc.id === id ? { ...desc, input: value } : desc
    ));
  };

  const addNewDescriptionField = () => {
    const newId = descriptions.length + 1;
    setDescriptions([...descriptions, { id: newId, text: '', input: '' }]);
  };

  return (
    <div>
      {descriptions.map((desc) => (
        <div key={desc.id}>
          <div className="container-align-left">
            <textarea
              name={`description-${desc.id}`}
              placeholder="Agregue la descripción"
              value={desc.input}
              onChange={(e) => handleInputChange(desc.id, e.target.value)}
              rows={4}
              className="description-textarea"
            />
            <button 
              type="button"
              onClick={() => handleButtonClick(desc.id)}
            >
              Enviar
            </button>
          </div>
          <div className="container-align-left">
            <p className="description-oc">
              {desc.id}- &nbsp;&nbsp; MOD: {desc.text || ' '}
            </p>
          </div>
        </div>
      ))}

      {descriptions.length < MAX_DESCRIPTIONS && (
        <div className="container-align-left">
          <button 
            type="button"
            onClick={addNewDescriptionField}
            className="add-button"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default DescriptionOc;