import { useState, useEffect } from 'react';
import { useFormsData } from '@/context/FormsDataContext';
import styles from '@/styles/UiComponents.module.css';

function FormOc({ currentPage = 1 }) {
    const { getPageData, updatePageData, isLoaded } = useFormsData();
    const [ocValue, setOcValue] = useState('');
    const [displayedOC, setDisplayedOC] = useState('');

    // Cargar datos de la página actual
    useEffect(() => {
        if (isLoaded) {
            const pageData = getPageData(currentPage);
            setOcValue(pageData.formOc.ocValue);
            setDisplayedOC(pageData.formOc.displayedOC);
        }
    }, [currentPage, isLoaded]); // Removido getPageData de las dependencias

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplayedOC(ocValue);
        updatePageData(currentPage, 'formOc', {
            ocValue,
            displayedOC: ocValue
        });
        console.log("OC enviada:", ocValue);
        return false;
    };

    const handleOcChange = (e) => {
        const newValue = e.target.value;
        setOcValue(newValue);
    };

    const handleDelete = () => {
        setOcValue('');
        setDisplayedOC('');
        updatePageData(currentPage, 'formOc', {
            ocValue: '',
            displayedOC: ''
        });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <input
                    className={styles.formOcInput}
                    id='form'
                    type="text"
                    name="oc"
                    placeholder="Coloca la OC:"
                    value={ocValue}
                    onChange={handleOcChange}
                    autoComplete="off"
                />
                <button
                    className={styles.buttonPrimary}
                    id='primary'
                    style={{ marginRight: '5px', marginLeft: '5px' }}
                    type="submit"
                    onClick={handleSubmit}
                >
                    Enviar
                </button>
                <button
                    className={styles.buttonDanger}
                    id='danger'
                    onClick={handleDelete}
                    type="button"
                >
                    Eliminar
                </button>
            </form>
            <div className="oc-display">
                <p style={{ fontWeight: '700', textDecoration: 'underline', marginTop: '5px' }}>OC: {displayedOC}</p>
            </div>
        </div>
    );
}

export default FormOc;