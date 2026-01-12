import React from 'react';
import Image from "next/image";
import { usePages } from '@/context/PagesContext';
import { useFormsData } from '@/context/FormsDataContext';
import TodayDate from "@/components/TodayDate";
import FormNameClient from "@/components/FormNameClient";
import FormOc from "@/components/FormOc";
import DescriptionOc from "@/components/DescriptionOc";

const PrintAllPages = () => {
    const { totalPages } = usePages();
    const { getPageData } = useFormsData();

    // Función para determinar si una página está "vacía"
    const isPageEmpty = (pageNum) => {
        const data = getPageData(pageNum);

        const isClientDefault = !data.formNameClient.selectedOption || data.formNameClient.selectedOption === 'nombre del cliente';
        const isOcEmpty = !data.formOc.displayedOC && !data.formOc.ocValue;

        // Verificar descripciones: si todas tienen texto vacío
        const descriptions = data.descriptionOc.descriptions || [];
        const isDescriptionsEmpty = descriptions.every(d => !d.text);

        const descriptionsSerie = data.descriptionOc.descriptionsSerie || [];
        const isSeriesEmpty = descriptionsSerie.every(s => !s.text);

        return isClientDefault && isOcEmpty && isDescriptionsEmpty && isSeriesEmpty;
    };

    // Generar array de páginas y filtrar las vacías
    // Siempre incluimos la página 1 aunque esté vacía, o filtramos todas? 
    // El usuario pidió "solo muestres las que estan llenas". 
    // Pero si la 1 es la única y está vacía, mejor mostrarla que mostrar nada.
    // Estrategia: Filtrar, pero si el resultado es vacío, mostrar al menos la 1.
    let pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(pageNum => !isPageEmpty(pageNum));

    if (pages.length === 0) {
        pages = [1];
    }

    return (
        <div className="print-all-container">
            {pages.map((pageNumber) => (
                <div key={pageNumber} className="container printA4 print-page-break">
                    <header>
                        <Image src="/img/atecno.png" width={300} height={120} alt="logo_atecno" className="ImageLogo" priority />
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
                        <h1 style={{ textAlign: "center", marginTop: "5%" }} className="titlePrimaryUnderline">ACTA DE ENTREGA</h1>
                        <div style={{ marginTop: "20px" }} className="adaptiveLayoutMaterial">
                            <FormNameClient currentPage={pageNumber} />
                        </div>
                        <p style={{ paddingTop: "20px" }} className="adaptiveLayoutMaterial">Se hace entrega del siguiente material:</p>
                        <div style={{ paddingTop: "20px" }} className="adaptiveLayoutMaterial">
                            <FormOc currentPage={pageNumber} />
                        </div>
                        <div style={{ paddingTop: "20px" }} className="adaptiveLayoutMaterial">
                            <DescriptionOc currentPage={pageNumber} />
                        </div>
                    </article>
                    <footer>
                        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }} className="adaptiveLayoutFooter">
                            <p className="adaptiveLayoutSignature">RECIBE CONFORME: </p>
                            <button className="button-lain" style={{ flex: 1 }} id="recibe" ></button>
                            <p className="no-print"></p>
                        </div>
                        <br />
                        <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }} className="adaptiveLayoutFooter">
                            <p className="adaptiveLayoutSignature">ENTREGA:</p>
                            <button className="button-lain" style={{ flex: 1 }} id="entrega"></button>
                            <p className="no-print"></p>
                        </div>
                    </footer>
                </div>
            ))}
        </div>
    );
};

export default PrintAllPages;
