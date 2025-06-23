import { useState } from 'react';

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
    <div>
      <form 
        onSubmit={handleSubmit}
        noValidate
      >
        <input 
          type="text" 
          name="oc" 
          placeholder="Coloca la OC:" 
          value={ocValue}
          onChange={(e) => setOcValue(e.target.value)}
          autoComplete="off"
        />
        <button 
          type="submit"
          onClick={handleSubmit} 
        >
          Enviar
        </button>
      </form>
      <div className="oc-display">
        <p>OC: {displayedOC}</p>
      </div>
    </div>
  );
}

export default FormOc;