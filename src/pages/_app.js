import "@/styles/globals.css";
//import "@/styles/responsive_proposal.css";
import { PagesProvider } from "@/context/PagesContext";

export default function App({ Component, pageProps }) {
  return (
    <PagesProvider>
      <Component {...pageProps} />
    </PagesProvider>
  );
}
