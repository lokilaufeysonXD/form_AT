import { useState } from 'react';
import styles from '@/styles/prueva.module.css';

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
        <div className={styles.descriptionOcWrapper}>
            <div>
                {descriptions.map((desc) => {
                    const serie = descriptionsSerie.find(s => s.id === desc.id);

                    return (
                        <div key={desc.id}>
                            <div className="" style={{ display: 'flex', alignItems: 'self-start', justifyContent: 'center' }}>
                                <textarea
                                    className={styles.formOcInput}
                                    id={styles.textArea}
                                    // id='form'
                                    placeholder="Agregue la descripción"
                                    value={desc.input}
                                    onChange={(e) => handleInputChange(desc.id, e.target.value)}
                                    rows={4}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                                    <button
                                        className={styles.buttonPrimary + ' ' + styles.buttonLittle}
                                        style={{ marginBottom: '5px' }}
                                        type="button"
                                        onClick={() => handleButtonClick(desc.id)}
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        onClick={() =>
                                            setDescriptions(descriptions.map(d =>
                                                d.id === desc.id ? { ...d, text: '', input: '' } : d
                                            ))
                                        }
                                        className={styles.buttonDanger + ' ' + styles.buttonLittle}
                                        type="button"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p className={styles.titleSecondary} style={{ marginTop: '10px', marginBottom: '5px' }}>
                                    {desc.id}- &nbsp;&nbsp; MOD: {desc.text || ' '}
                                </p>
                            </div>
                            {serie && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'self-start', justifyContent: 'center' }}>
                                        <textarea
                                            className={styles.formOcInput}
                                            id={styles.textArea}
                                            // id='form'
                                            placeholder="agregue el numero de orden de producción"
                                            value={serie.input}
                                            onChange={(e) => handleInputChangeSerie(serie.id, e.target.value)}
                                            rows={4}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                                            <button
                                                // id='primary'
                                                style={{ marginBottom: '5px' }}
                                                className={styles.buttonPrimary + ' ' + styles.buttonLittle}
                                                type="button"
                                                onClick={() => handleButtonClickSerie(serie.id)}
                                            >
                                                Enviar
                                            </button>
                                            <button
                                                // id='danger'
                                                onClick={() =>
                                                    setDescriptionsSerie(descriptionsSerie.map(s =>
                                                        s.id === serie.id ? { ...s, text: '', input: '' } : s
                                                    ))
                                                }
                                                type="button"
                                                className={styles.buttonDanger + ' ' + styles.buttonLittle}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p className={styles.titleSecondary} style={{ marginTop: '10px', marginBottom: '5px' }}>
                                            {serie.text ? `SERIE #: ${serie.text}` : ''}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={styles.descriptionOcControls} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button
                    // id='secondary'
                    // className="remove-button"
                    className={styles.buttonSecondary}
                    type="button"
                    onClick={removeLastPair}
                    disabled={descriptions.length <= 1}
                >
                    -
                </button>
                <span style={{ margin: '0 10px' }}>
                    {descriptions.length} / {MAX_DESCRIPTIONS}
                </span>
                {descriptions.length < MAX_DESCRIPTIONS && (
                    <button
                        // id='dark'
                        className={styles.buttonDark}
                        type="button"
                        onClick={addNewPair}
                    // className="add-button"
                    >
                        +
                    </button>
                )}
                <button

                    style={{ marginLeft: '5px' }}
                    // id='danger'
                    type="button"
                    onClick={resetAll}
                    className={styles.buttonDanger}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default DescriptionOc;