import styles from "@/styles/ControlPanel.module.css";

function ControlPanelStats() {
    return (
        <section className={styles.stats}>
            <div className={styles.statControlPanelCard}>
                <div>
                    <h2>Ordenes Pendientes</h2>
                    <h1>0</h1>
                    <p>en proceso</p>
                </div>
                <div>
                    <span className={`material-symbols-outlined ${styles.mainOrdenesPendientesIcon} ${styles.iconControlPanelCard}`}>pace</span>
                </div>
            </div>
            <div className={styles.statControlPanelCard}>
                <div>
                    <h2>Etiquetas Generadas</h2>
                    <h1>0</h1>
                    <p>Este mes</p>
                </div>
                <div>
                    <span className={`material-symbols-outlined ${styles.mainEtiquetasGeneradasIcon} ${styles.iconControlPanelCard}`}>sell</span>
                </div>
            </div>
            <div className={styles.statControlPanelCard}>
                <div>
                    <h2>Documentos</h2>
                    <h1>0</h1>
                    <p>Total archivados</p>
                </div>
                <div>
                    <span className={`material-symbols-outlined ${styles.mainDocumentosIcon} ${styles.iconControlPanelCard}`}>folder_open</span>
                </div>
            </div>
            <div className={styles.statControlPanelCard}>
                <div>
                    <h2>Completadas</h2>
                    <h1>0</h1>
                    <p>Ordenes Finalizadas</p>
                </div>
                <div>
                    <span className={`material-symbols-outlined ${styles.mainOrdenesCompletadasIcon} ${styles.iconControlPanelCard}`}>trending_up</span>
                </div>
            </div>
        </section>
    );
}

export default ControlPanelStats;
