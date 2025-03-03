// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";


export default function Home() {
  const onPrint = () => {
    window.print();
  };

  return (
    <div>
      <form action=""> 
        <label htmlFor="">nombre:</label>
        <br />
        <input type="text" name="nombre" id="nombre" className="border"/>
        <button title="supmit">enviar</button>
        <button onClick={onPrint}>imprimir</button>
      </form>
    </div>
  );
}
