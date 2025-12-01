import { useState } from 'react';
import styles from '@/styles/prueva.module.css';

function FormNameClient() {
  const [selectedOption, setSelectedOption] = useState('nombre del cliente');
  const [ocValue, setOcValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOcChange = (e) => {
    setOcValue(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  return (
    <form className={styles.formClient}>
      <select
        className={styles.selectClient}
        name="select"
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="nombre del cliente"> <p> nombre del cliente </p> </option>
        <option value="SHN">SHN</option>
        <option value="GRIIMSA">GRIIMSA</option>
        <option value="Hidro Servicios">Hidro Servicios</option>
        <option value="Hidro Barear">Hidro Barear</option>
        <option value="CALEFACION Y VENTILACION">Calefacion y Ventilacion</option>
        <option value="DOMO DISPLAY">Domo Display</option>
        <option value="SISTEMAS ESPECIALIZADOS DE BOMBEO">SISTEMAS ESPECIALIZADOS DE BOMBEO</option>
        <option value="Corporación SHN">Corporación SHN</option>
        <option value="Stel Ingenieria">Stel Ingenieria</option>
      </select>
      <p className={styles.titleSecondary}>{selectedOption}</p>
    </form>
  );
}

export default FormNameClient;