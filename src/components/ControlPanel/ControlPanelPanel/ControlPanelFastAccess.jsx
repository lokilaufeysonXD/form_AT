import styles from "@/styles/ControlPanel.module.css";

function ControlPanelFastAccess() {
    return (
        <section className={styles.fastAccess}>
            <div className={styles.fastAccessTitle}>
                <h2>Acceso Rapido</h2>
            </div>
            <div className={styles.containerFastAccessCards}>
                <a href="" className={styles.fastAccessCard + " " + styles.fastAccessCardOrdenesProduccion}>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconControlPanelCardOrdenesProduccion}`}>package_2</span>
                    </div>
                    <div>
                        <h2>Ordenes Produccion</h2>
                        <p>Crear y gestionar ordenes de produccion</p>
                    </div>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconFlagControlPanelCardOrdenesProduccion}`}>chevron_right</span>
                    </div>
                </a>
                <a href="" className={styles.fastAccessCard + " " + styles.fastAccessCardEtiquetas}>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconControlPanelCardEtiquetas}`}>sell</span>
                    </div>
                    <div>
                        <h2>Etiquetas</h2>
                        <p>Crear y gestionar etiquetas</p>
                    </div>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconFlagControlPanelCardEtiquetas}`}>chevron_right</span>
                    </div>
                </a>
                <a href="" className={styles.fastAccessCard + " " + styles.fastAccessCardPlanos}>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconControlPanelCardPlanos}`}>docs</span>
                    </div>
                    <div>
                        <h2>Planos Técnicos</h2>
                        <p>Repositorio de planos</p>
                    </div>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconFlagControlPanelCardPlanos}`}>chevron_right</span>
                    </div>
                </a>
                <a href="" className={styles.fastAccessCard + " " + styles.fastAccessCardManuales}>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconControlPanelCardManuales}`}>menu_book</span>
                    </div>
                    <div>
                        <h2>Manuales Técnicos</h2>
                        <p>Documentacion de equipos</p>
                    </div>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconFlagControlPanelCardManuales}`}>chevron_right</span>
                    </div>
                </a>
                <a href="" className={styles.fastAccessCard + " " + styles.fastAccessCardDocumentos}>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconControlPanelCardDocumentos}`}>folder_open</span>
                    </div>
                    <div>
                        <h2>Documentos</h2>
                        <p>Archivos y reportes</p>
                    </div>
                    <div>
                        <span className={`material-symbols-outlined ${styles.iconFlagControlPanelCardDocumentos}`}>chevron_right</span>
                    </div>
                </a>
            </div>
        </section>
    );
}

export default ControlPanelFastAccess;
