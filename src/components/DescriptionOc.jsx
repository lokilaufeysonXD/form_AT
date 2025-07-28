import { useState } from 'react';

function DescriptionOc() {
  const [descriptions, setDescriptions] = useState([
    { id: 1, text: '', input: '' }
  ]);

  const [descriptionsSerie, setDescriptionsSerie] = useState([
    { id: 1, text: '', input: '' }
  ]);

  const MAX_DESCRIPTIONS = 4; // Límite de textareas

  const handleButtonClick = (id) => {
    setDescriptions(descriptions.map(desc =>
      desc.id === id ? { ...desc, text: desc.input, input: '' } : desc
    ));
  };

  const handleButtonClickSerie = (id) => {
    setDescriptionsSerie(descriptionsSerie.map(descSerie =>
      descSerie.id === id ? { ...descSerie, text: descSerie.input, input: '' } : descSerie
    ));
  };

  const handleInputChange = (id, value) => {
    setDescriptions(descriptions.map(desc =>
      desc.id === id ? { ...desc, input: value } : desc
    ));
  };

  const handleInputChangeSerie = (id, value) => {
    setDescriptionsSerie(descriptionsSerie.map(descSerie =>
      descSerie.id === id ? { ...descSerie, input: value } : descSerie
    ));
  };

  const addNewDescriptionField = () => {
    const newId = descriptions.length + 1;
    setDescriptions([...descriptions, { id: newId, text: '', input: '' }]);
  };

  const addNewDescriptionFieldSerie = () => {
    const newId = descriptionsSerie.length + 1;
    setDescriptionsSerie([...descriptionsSerie, { id: newId, text: '', input: '' }]);
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
              className=""
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
      {/* en contruccion */}


      {/* <div > */}
        {descriptionsSerie.map((descSerie) => (
          <div key={descSerie.id}>
            <div className="container-align-left">
              <textarea
                name={`description-${descSerie.id}`}
                placeholder="agregue el numero de orden de producción"
                value={descSerie.input}
                onChange={(e) => handleInputChangeSerie(descSerie.id, e.target.value)}
                rows={4}
                className="description-textarea"
              />
              <button
                type="button"
                onClick={() => handleButtonClickSerie(descSerie.id)}
              >
                Enviar
              </button>
            </div>
              <div className="container-align-left">
                <p className="description-oc">
                  {descSerie.text ? `SERIE #: ${descSerie.text}` : ''}
                  {/* {descSerie.id} {descSerie.text || ' hello world'} */}
                </p>
              </div>
          </div>
        ))}
        {/* </div>   */}


        {/* Fin de contruccion */}

        {descriptions.length < MAX_DESCRIPTIONS && (
          <div className="container-align-left">
            <button
              type="button"
              onClick={() => {
                      addNewDescriptionField();
                      addNewDescriptionFieldSerie();
                      }}
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