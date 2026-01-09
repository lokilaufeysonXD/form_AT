import { useState, useEffect } from 'react';
import { useFormsData } from '@/context/FormsDataContext';
import styles from '@/styles/UiComponents.module.css';

function DescriptionOc({ currentPage = 1 }) {
    const { getPageData, updatePageData, isLoaded } = useFormsData();
    const [descriptions, setDescriptions] = useState([
        { id: 1, text: '', input: '' }
    ]);

    const [descriptionsSerie, setDescriptionsSerie] = useState([
        { id: 1, text: '', input: '' }
    ]);

    const MAX_DESCRIPTIONS = 4; // Límite de textareas

    // Cargar datos de la página actual
    useEffect(() => {
        if (isLoaded) {
            const pageData = getPageData(currentPage);
            setDescriptions(pageData.descriptionOc.descriptions);
            setDescriptionsSerie(pageData.descriptionOc.descriptionsSerie);
        }
    }, [currentPage, isLoaded]); // Removido getPageData de las dependencias

    const handleButtonClick = (id) => {
        const newDescriptions = descriptions.map(desc =>
            desc.id === id ? { ...desc, text: desc.input, input: '' } : desc
        );
        setDescriptions(newDescriptions);
        // Guardar al hacer clic en Enviar
        updatePageData(currentPage, 'descriptionOc', {
            descriptions: newDescriptions,
            descriptionsSerie
        });
    };

    const handleButtonClickSerie = (id) => {
        const newDescriptionsSerie = descriptionsSerie.map(descSerie =>
            descSerie.id === id ? { ...descSerie, text: descSerie.input, input: '' } : descSerie
        );
        setDescriptionsSerie(newDescriptionsSerie);
        // Guardar al hacer clic en Enviar
        updatePageData(currentPage, 'descriptionOc', {
            descriptions,
            descriptionsSerie: newDescriptionsSerie
        });
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

    const addNewPair = () => {
        const newId = Math.max(
            descriptions[descriptions.length - 1].id,
            descriptionsSerie[descriptionsSerie.length - 1].id
        ) + 1;

        const newDescriptions = [...descriptions, { id: newId, text: '', input: '' }];
        const newDescriptionsSerie = [...descriptionsSerie, { id: newId, text: '', input: '' }];

        setDescriptions(newDescriptions);
        setDescriptionsSerie(newDescriptionsSerie);

        updatePageData(currentPage, 'descriptionOc', {
            descriptions: newDescriptions,
            descriptionsSerie: newDescriptionsSerie
        });
    };

    const removeLastPair = () => {
        if (descriptions.length > 1) {
            const newDescriptions = descriptions.slice(0, -1);
            const newDescriptionsSerie = descriptionsSerie.slice(0, -1);

            setDescriptions(newDescriptions);
            setDescriptionsSerie(newDescriptionsSerie);

            updatePageData(currentPage, 'descriptionOc', {
                descriptions: newDescriptions,
                descriptionsSerie: newDescriptionsSerie
            });
        }
    };

    const resetAll = () => {
        const resetDescriptions = [{ id: 1, text: '', input: '' }];
        const resetDescriptionsSerie = [{ id: 1, text: '', input: '' }];

        setDescriptions(resetDescriptions);
        setDescriptionsSerie(resetDescriptionsSerie);

        updatePageData(currentPage, 'descriptionOc', {
            descriptions: resetDescriptions,
            descriptionsSerie: resetDescriptionsSerie
        });
    };

    return (
        <div>
            {descriptions.map((desc) => {
                const serie = descriptionsSerie.find(s => s.id === desc.id);

                return (
                    <div key={desc.id}>
                        <div className="container-align">
                            <textarea
                                style={{ flex: 1 }}
                                className={styles.formOcInput}
                                id='form'
                                placeholder="Agregue la descripción"
                                value={desc.input}
                                onChange={(e) => handleInputChange(desc.id, e.target.value)}
                                rows={4}
                            />
                            <div style={{ display: 'flex', gap: '5px' }} className="adaptiveLayoutDescriptionOcButtons">
                                <button
                                    className={styles.buttonPrimary}
                                    id='primary'
                                    // className='button-accion'
                                    type="button"
                                    onClick={() => handleButtonClick(desc.id)}
                                >
                                    Enviar
                                </button>
                                <button
                                    className={styles.buttonDanger}
                                    id='danger'
                                    onClick={() =>
                                        setDescriptions(descriptions.map(d =>
                                            d.id === desc.id ? { ...d, text: '', input: '' } : d
                                        ))
                                    }
                                    // className='button-accion'
                                    type="button"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <div style={{ margin: '20px 20px' }} className="adaptiveLayoutMaterial">
                            <p className="description-oc">
                                {desc.id}- &nbsp;&nbsp; MOD: {desc.text || ' '}
                            </p>
                        </div>



                        {serie && (
                            <>
                                <div className="container-align">
                                    <textarea
                                        style={{ flex: 1, height: '40px' }}
                                        className={styles.formOcInput}
                                        id='form'
                                        placeholder="agregue el numero de orden de producción"
                                        value={serie.input}
                                        onChange={(e) => handleInputChangeSerie(serie.id, e.target.value)}
                                        rows={4}
                                    // className="description-textarea"
                                    />
                                    <div style={{ display: 'flex', gap: '5px' }} className="adaptiveLayoutDescriptionOcButtons">
                                        <button
                                            className={styles.buttonPrimary}
                                            id='primary'
                                            // className='button-accion'
                                            type="button"
                                            onClick={() => handleButtonClickSerie(serie.id)}
                                        >
                                            Enviar
                                        </button>
                                        <button
                                            className={styles.buttonDanger}
                                            id='danger'
                                            onClick={() =>
                                                setDescriptionsSerie(descriptionsSerie.map(s =>
                                                    s.id === serie.id ? { ...s, text: '', input: '' } : s
                                                ))
                                            }
                                            type="button"
                                        // className='button-accion'
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                                <div style={{ margin: '20px 20px' }}>
                                    <p className="description-oc">
                                        {serie.text ? `SERIE #: ${serie.text}` : ''}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
            <div style={{ margin: '20px 0px 20px 0px' }} className='adaptiveLayoutInputForm'>
                <button
                    className={styles.buttonSecondary}
                    id='secondary'
                    type="button"
                    onClick={removeLastPair}
                    // className="remove-button"
                    disabled={descriptions.length <= 1}
                >
                    -
                </button>
                <span style={{ margin: '0 10px', marginTop: '10px' }} className="adaptiveLayoutSpanDescriptionOc">
                    {descriptions.length} / {MAX_DESCRIPTIONS}
                </span>
                {descriptions.length < MAX_DESCRIPTIONS && (
                    <button
                        className={styles.buttonDark}
                        id='dark'
                        type="button"
                        onClick={addNewPair}
                    // className="add-button"
                    >
                        +
                    </button>
                )}
                <button
                    className={styles.buttonDanger + ' adaptiveLayoutButtonsDanger'}
                    style={{ marginLeft: '20px' }}
                    id='danger'
                    type="button"
                    onClick={resetAll}
                // className="button-accion"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default DescriptionOc;