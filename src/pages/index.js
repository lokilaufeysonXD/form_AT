import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
import TodayDate from "@/components/TodayDate";
import Print from "@/components/Print";
import FormNameClient from "@/components/FormNameClient";

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
      <body>
        <div>
          <div className="date-container">
            <p>
              <TodayDate  />
            </p>
          </div>
          <div>
            <h2 className="title">ACTA DE ENTREGA</h2>
          </div>
          <div className="container-align-left">
            <FormNameClient/>
          </div>
          <div className="container-align-left">
            <p>Se hace entrega del siguiente material:</p>
          </div>
          <div className="container-align-left">
            <form action="">
              {/* <label htmlFor="">OC:</label> */}
              <input type="text" name="name" id="name" placeholder="coloca la OC:" />
              <input type="submit" value="enviar"/>
            </form>
          </div>
          <div className="container-align-left">
            <p>OC:</p>
          </div>
        </div>  
      </body>
      <br />
        <Print  />
    </div>
  );
}
