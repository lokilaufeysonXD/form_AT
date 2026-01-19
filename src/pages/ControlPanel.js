

import styles from "@/styles/ControlPanel.module.css";
import { useState, useEffect } from "react";
import ControlPanelSidebar from "@/components/ControlPanel/ControlPanelPanel/ControlPanelSidebar";
import ControlPanelPagePanel from "@/components/ControlPanel/ControlPanelPagePanel";
import ControlPanelPageProduccion from "@/components/ControlPanel/ControlPanelPageProduccion";
import ControlPanelPageEtiquetas from "@/components/ControlPanel/ControlPanelPageEtiquetas";

export default function ControlPanel() {

    const [activeView, setActiveView] = useState("panel");
    const [isLoading, setIsLoading] = useState(true);

    // Efecto para leer al montar el componente (corrige hidratación en SSR)
    useEffect(() => {
        const load = async () => {
            const savedView = localStorage.getItem("controlPanelActiveView");
            if (savedView) {
                setActiveView(savedView);
            }

            // Delay artificial
            await new Promise(resolve => setTimeout(resolve, 3000)); //acordarse de reducir el tiempo de carga esta en 3 seg 
            // Simulamos un pequeño retraso o simplemente marcamos como cargado
            setIsLoading(false);
        };

        load();
    }, []);

    useEffect(() => {
        localStorage.setItem("controlPanelActiveView", activeView);
    }, [activeView]);

    return (
        <div className={styles.layout}>
            <ControlPanelSidebar onNavigate={setActiveView} activeView={activeView} isLoading={isLoading} />
            <main className={styles.main}>
                {isLoading ? (
                    <div className={styles.skeletonContainer}>
                        <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
                        <div className={styles.skeletonRow}>
                            <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
                            <div className={`${styles.skeleton} ${styles.skeletonCard}`}></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {activeView === "panel" && <ControlPanelPagePanel />}
                        {activeView === "produccion" && <ControlPanelPageProduccion />}
                        {activeView === "etiquetas" && <ControlPanelPageEtiquetas />}
                    </>
                )}
            </main>
        </div>
    );
}