import { useState } from 'react';

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
    <form>
      <select 
        name="select" 
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <option value="nombre del cliente">nombre del cliente</option>
        <option value="SHN">SHN</option>
        <option value="Hidro Servicios">Hidro Servicios</option>
        <option value="Hidro Barear">Hidro Barear</option>
      </select>      
      <p className='text-bold'>{selectedOption}</p>
    </form>
  );
}

export default FormNameClient;