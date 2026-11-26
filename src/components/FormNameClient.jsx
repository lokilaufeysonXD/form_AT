import { useState, useEffect } from 'react';
import { useFormsData } from '@/context/FormsDataContext';
import styles from "@/styles/UiComponents.module.css";

function FormNameClient({ currentPage = 1 }) {
  const { getPageData, updatePageData, isLoaded } = useFormsData();
  const [selectedOption, setSelectedOption] = useState('nombre del cliente');
  const [clients, setClients] = useState([]);

  // Cargar datos de la página actual solo una vez cuando cambia la página
  useEffect(() => {
    if (isLoaded) {
      const pageData = getPageData(currentPage);
      setSelectedOption(pageData.formNameClient.selectedOption);
    }
  }, [currentPage, isLoaded, getPageData]);

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    updatePageData(currentPage, 'formNameClient', {
      selectedOption: newValue
    });
  };

  // Obtener la lista de clientes al montar el componente
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cliente`);
        if (response.ok) {
          const result = await response.json();
          // Asegura que siempre sea un array
          setClients(Array.isArray(result) ? result : (result.data || []));
        }
      } catch (err) {
        // Manejo de error silencioso según las directrices de producción
      }
    };

    fetchClients();

    window.addEventListener('clienteCreated', fetchClients);
    return () => {
      window.removeEventListener('clienteCreated', fetchClients);
    };
  }, []);

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
        {clients.map((client) => (
          <option key={client.id} value={client.name}>
            {client.nombre_cliente}
          </option>
        ))}
      </select>
      <p style={{ fontWeight: 'bold' }} className='adaptiveLayoutNameClient'>{selectedOption}</p>
    </form>
  );
}

export default FormNameClient;