import { useState, useEffect } from 'react';
import { useFormsData } from '@/context/FormsDataContext';
import styles from "@/styles/UiComponents.module.css";

function FormNameClient({ currentPage = 1 }) {
  const { getPageData, updatePageData, isLoaded } = useFormsData();
  const [selectedOption, setSelectedOption] = useState('nombre del cliente');

  // Cargar datos de la página actual solo una vez cuando cambia la página
  useEffect(() => {
    if (isLoaded) {
      const pageData = getPageData(currentPage);
      setSelectedOption(pageData.formNameClient.selectedOption);
    }
  }, [currentPage, isLoaded]); // Removido getPageData de las dependencias

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    updatePageData(currentPage, 'formNameClient', {
      selectedOption: newValue
    });
  };

  return (
    <form className='adaptiveLayoutForm'>
      <select
        className={styles.selectClient}
        id='select'
        name="select"
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="nombre del cliente">nombre del cliente</option>
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
      <p style={{ fontWeight: 'bold' }} className='adaptiveLayoutNameClient'>{selectedOption}</p>
    </form>
  );
}

export default FormNameClient;