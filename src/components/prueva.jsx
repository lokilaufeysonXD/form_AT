import { useState } from 'react';

function DescriptionOc() {
  const [descriptions, setDescriptions] = useState([
    { id: 1, text: '', input: '' }
  ]);

  const [descriptionsSerie, setDescriptionsSerie] = useState([
    { id: 1, text: '', input: '' }
  ]);

  const MAX_DESCRIPTIONS = 4;

  // ... (mantenemos todos los handlers existentes sin cambios)

  const addNewPair = () => {
    const newId = Math.max(
      descriptions[descriptions.length - 1].id,
      descriptionsSerie[descriptionsSerie.length - 1].id
    ) + 1;
    
    setDescriptions([...descriptions, { id: newId, text: '', input: '' }]);
    setDescriptionsSerie([...descriptionsSerie, { id: newId, text: '', input: '' }]);
  };

  return (
    <div>
      {/* Renderizamos por ID en lugar de por array separado */}
      {descriptions.map((desc) => {
        const serie = descriptionsSerie.find(s => s.id === desc.id);
        
        return (
          <div key={desc.id}>
            {/* Campo de descripción */}
            <div className="container-align-left">
              <textarea
                placeholder="Agregue la descripción"
                value={desc.input}
                onChange={(e) => handleInputChange(desc.id, e.target.value)}
                rows={4}
              />
              <button onClick={() => handleButtonClick(desc.id)}>
                Enviar
              </button>
              <p className="description-oc">
                {desc.id}- MOD: {desc.text || ' '}
              </p>
            </div>

            {/* Campo de serie correspondiente */}
            {serie && (
              <div className="container-align-left">
                <textarea
                  placeholder="agregue el numero de orden de producción"
                  value={serie.input}
                  onChange={(e) => handleInputChangeSerie(serie.id, e.target.value)}
                  rows={4}
                />
                <button onClick={() => handleButtonClickSerie(serie.id)}>
                  Enviar
                </button>
                <p className="description-oc">
                  {serie.text ? `SERIE #: ${serie.text}` : ''}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Botón para agregar nuevos pares */}
      {descriptions.length < MAX_DESCRIPTIONS && (
        <div className="container-align-left">
          <button onClick={addNewPair} className="add-button">
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default DescriptionOc;