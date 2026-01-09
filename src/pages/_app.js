import "@/styles/globals.css";
import "@/styles/responsive/adaptiveTablet.css";
import "@/styles/responsive/adaptativeMovil.css";
import "@/styles/ViwPrint.css";
//import "@/styles/responsive_proposal.css";
import { PagesProvider } from "@/context/PagesContext";
import { FormsDataProvider } from "@/context/FormsDataContext";

export default function App({ Component, pageProps }) {
  return (
    <PagesProvider>
      <FormsDataProvider>
        <Component {...pageProps} />
      </FormsDataProvider>
    </PagesProvider>
  );
}
