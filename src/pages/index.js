// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

export default function Home() {
  const onPrint = () => {
    window.print();
  };

  const todayDate = new Date();
  const day = todayDate.getDate();
  const year = todayDate.getFullYear();

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const monthName = months[todayDate.getMonth()];
  console.log(monthName);

  return (
    <div>
      <form action=""> 
        <label htmlFor="">nombre:</label>
        <br />
        <p>fecha dia:{day} mes:{monthName} año:{year}</p>
        <select name="selct" id="" >
          <option value="value1" >selecciona el cliente</option>
          <option value="value2" >SHN</option>
          <option value="value3" >Hidro Servicios</option>
          <option value="value4" >Hidro Barear</option>
        </select>
        {/* <input type="text" name="nombre" className="" placeholder="ingresa el cliente que quieres agregar" value={inputVAlue} onChange={(e)  => setInputValue(e.target.value)} /> */}
        {/* <button title="submit" onClick={addObtion} >enviar</button> */}
        <button onClick={onPrint} className="print:hidden ">imprimir</button>
        <br />
        <input type="text" name="OC" className="" />
        <br />
        <textarea name="" id="" className=""></textarea>
      </form>
    </div>
  );
}
