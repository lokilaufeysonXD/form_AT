import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
import TodayDate from "@/components/TodayDate";
import Print from "@/components/Print";

export default function Home() {
  

  return (
    <div>
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <Image 
              src="/img/atecno.png" 
              alt="ATECNO Logo"
              width={300}
              height={120}
              priority
            />
          </div>
          <div className="header-text">
            <h1><strong>ACCI TECNOLOGY S.A. DE CV</strong></h1>
            <div className="header-info">
              <p>Cto. Privada Residencial Nichupte. SM 512, MZ-12, LT-06.CP:77534. Cancún.</p>
              <p>Benito Juarez. Quintana Roo</p>
              <p>RFC: ATE031119PEA</p>
            </div>
          </div>
        </div>
      </header>
      <div className="header-divider">
        <button className="dividing-line"></button>
      </div>

      <form action="">
        <label htmlFor="">nombre:</label>
        <br />
        <TodayDate  />
        <select name="selct" id="" >
          <option value="value1" >selecciona el cliente</option>
          <option value="value2" >SHN</option>
          <option value="value3" >Hidro Servicios</option>
          <option value="value4" >Hidro Barear</option>
        </select>
        {/* <input type="text" name="nombre" className="" placeholder="ingresa el cliente que quieres agregar" value={inputVAlue} onChange={(e)  => setInputValue(e.target.value)} /> */}
        {/* <button title="submit" onClick={addObtion} >enviar</button> */}
        <br />
        <input type="text" name="OC" className="" />
        <br />
        <textarea name="" id="" className=""></textarea>
      </form>
      <br />
        <Print  />
    </div>
  );
}
