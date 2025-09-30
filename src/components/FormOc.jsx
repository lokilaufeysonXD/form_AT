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
          id='form'
          type="text" 
          name="oc" 
          placeholder="Coloca la OC:" 
          value={ocValue}
          onChange={(e) => setOcValue(e.target.value)}
          autoComplete="off"
        />
        <button
          id='primary'
          style={ { marginRight: '5px', marginLeft: '5px' } }
          type="submit"
          onClick={handleSubmit} 
        >
          Enviar
        </button>
        <button 
          id='danger'
          onClick={() => {
            setOcValue('');
            setDisplayedOC('');
          }}
          type="submit" 
        >
          Eliminar
        </button>
      </form>
      <div className="oc-display">
        <p>OC: {displayedOC}</p>
      </div>
    </div>
  );
}

export default FormOc;