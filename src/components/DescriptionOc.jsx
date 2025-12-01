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

    const removeLastPair = () => {
        if (descriptions.length > 1) {
            setDescriptions(descriptions.slice(0, -1));
            setDescriptionsSerie(descriptionsSerie.slice(0, -1));
        }
    };

    const resetAll = () => {
        setDescriptions([{ id: 1, text: '', input: '' }]);
        setDescriptionsSerie([{ id: 1, text: '', input: '' }]);
    };

    return (
        <div>
            {descriptions.map((desc) => {
                const serie = descriptionsSerie.find(s => s.id === desc.id);

                return (
                    <div key={desc.id}>
                        <div className="container-align-left">
                            <textarea
                                id='form'
                                placeholder="Agregue la descripción"
                                value={desc.input}
                                onChange={(e) => handleInputChange(desc.id, e.target.value)}
                                rows={4}
                            />
                            <button
                                id='primary'
                                className='button-accion'
                                type="button"
                                onClick={() => handleButtonClick(desc.id)}
                            >
                                Enviar
                            </button>
                            <button
                                id='danger'
                                onClick={() =>
                                    setDescriptions(descriptions.map(d =>
                                        d.id === desc.id ? { ...d, text: '', input: '' } : d
                                    ))
                                }
                                className='button-accion'
                                type="button"
                            >
                                Eliminar
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
                                        id='form'
                                        placeholder="agregue el numero de orden de producción"
                                        value={serie.input}
                                        onChange={(e) => handleInputChangeSerie(serie.id, e.target.value)}
                                        rows={4}
                                        className="description-textarea"
                                    />
                                    <button
                                        id='primary'
                                        className='button-accion'
                                        type="button"
                                        onClick={() => handleButtonClickSerie(serie.id)}
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        id='danger'
                                        onClick={() =>
                                            setDescriptionsSerie(descriptionsSerie.map(s =>
                                                s.id === serie.id ? { ...s, text: '', input: '' } : s
                                            ))
                                        }
                                        type="button"
                                        className='button-accion'
                                    >
                                        Eliminar
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
            <div className="container-align-left">
                <button
                    id='secondary'
                    type="button"
                    onClick={removeLastPair}
                    className="remove-button"
                    disabled={descriptions.length <= 1}
                >
                    -
                </button>
                <span style={{ margin: '0 10px', marginTop: '10px' }}>
                    {descriptions.length} / {MAX_DESCRIPTIONS}
                </span>
                {descriptions.length < MAX_DESCRIPTIONS && (
                    <button
                        id='dark'
                        type="button"
                        onClick={addNewPair}
                        className="add-button"
                    >
                        +
                    </button>
                )}
                <button
                    style={{ marginLeft: '20px' }}
                    id='danger'
                    type="button"
                    onClick={resetAll}
                    className="button-accion"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default DescriptionOc;