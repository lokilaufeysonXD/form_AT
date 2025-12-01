import { useState } from 'react';
import styles from '@/styles/prueva.module.css';

function FormOc() {
    const [ocValue, setOcValue] = useState('');
    const [displayedOC, setDisplayedOC] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisplayedOC(ocValue);
        console.log("OC enviada:", ocValue); // Verificación en consola
        return false;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <input
                    className={styles.formOcInput}
                    type="text"
                    name="oc"
                    placeholder="Coloca la OC:"
                    value={ocValue}
                    onChange={(e) => setOcValue(e.target.value)}
                    autoComplete="off"
                />
                <button
                    className={styles.buttonPrimary}
                    style={{ marginRight: '5px', marginLeft: '5px' }}
                    type="submit"
                    onClick={handleSubmit}
                >
                    Enviar
                </button>
                <button
                    className={styles.buttonDanger}
                    onClick={() => {
                        setOcValue('');
                        setDisplayedOC('');
                    }}
                    type="submit"
                >
                    Eliminar
                </button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p className={styles.titleSecondary} style={{ marginTop: '10px', marginBottom: '5px' }}>OC: {displayedOC}</p>
            </div>
        </div>
    );
}

export default FormOc;