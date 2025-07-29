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
      {descriptions.map((desc) => {
        const serie = descriptionsSerie.find(s => s.id === desc.id);

        return (
          <div key={desc.id}>
            <div className="container-align-left">
              <textarea
                placeholder="Agregue la descripción"
                value={desc.input}
                onChange={(e) => handleInputChange(desc.id, e.target.value)}
                rows={4}
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
            {serie && (
              <>
                <div className="container-align-left">
                  <textarea
                    placeholder="agregue el numero de orden de producción"
                    value={serie.input}
                    onChange={(e) => handleInputChangeSerie(serie.id, e.target.value)}
                    rows={4}
                    className="description-textarea"
                  />
                  <button
                    type="button"
                    onClick={() => handleButtonClickSerie(serie.id)}
                  >
                    Enviar
                  </button>
                </div>
                <div className="container-align-left">
                  <p className="description-oc">
                    {serie.text ? `SERIE #: ${serie.text}` : ''}
                  </p>
                </div>
              </>
            )}
          </div>
        );
      })}
      {descriptions.length < MAX_DESCRIPTIONS && (
        <div className="container-align-left">
          <button
            type="button"
            onClick={addNewPair}
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