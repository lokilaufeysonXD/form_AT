import Image from "next/image";
import TodayDate from "@/components/TodayDate";
import { Geist, Geist_Mono } from "next/font/google";
import FormNameClient from "@/components/FormNameClient";
import FormOc from "@/components/FormOc";
import DescriptionOc from "@/components/DescriptionOc";
import Print from "@/components/Print";
import Pagination from "@/components/Pagination";

export default function Home() {


  return (
    <div className="container">
      <header >
        <Image src="/img/atecno.png" width={300} height={120} alt="logo_atecno" className="ImageLogo" />
        <h1 className="titlePrimaryUnderline textAlign" style={{ marginRight: "10%" }}><strong>ACCI TECNOLOGY S.A. DE CV</strong></h1>
      </header>
      <article className="article">
        <div style={{ textAlign: "center" }}>
          <p>Cto. Privada Residencial Nichupte. SM 512, MZ-12, LT-06.CP:77534. Cancún.</p>
          <p>Benito Juarez. Quintana Roo</p>
          <p>RFC: ATE031119PEA</p>
          <hr className="hrDividingLine" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }} className="adaptiveLayoutTodayDate">
          <TodayDate />
        </div>
        <h1 style={{ textAlign: "center" }} className="titlePrimaryUnderline">ACTA DE ENTREGA</h1>
        <div style={{ marginTop: "20px" }}>
          <FormNameClient />
        </div>
        <p style={{ paddingTop: "20px" }} className="adaptiveLayoutMaterial">Se hace entrega del siguiente material:</p>
        <div style={{ paddingTop: "20px" }}>
          <FormOc />
        </div>
        <div style={{ paddingTop: "20px" }}>
          <DescriptionOc />
        </div>
      </article>
      <footer>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
          <p>RECIBE CONFORME: </p>
          <button className="button-lain" style={{ flex: 1 }} id="recibe" ></button>
          <p className="no-print"></p>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
          <p>ENTREGA:</p>
          <button className="button-lain" style={{ flex: 1 }} id="entrega"></button>
          <p className="no-print"></p>
        </div>
        <br />
        <Print />
        <Pagination currentPage={1} />
      </footer>
    </div>
  );
}
