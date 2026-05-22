import styles from "@/styles/ControlPanel.module.css";

function ControlPanelSidebar({ onNavigate, activeView, isLoading }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.ContainerLogo}>
                {isLoading ? (
                    <>
                        <div className={`${styles.skeleton} ${styles.skeletonLogoIcon}`}></div>
                        <div className={`${styles.skeleton} ${styles.skeletonLogoText}`} style={{ margin: "auto" }}></div>
                    </>
                ) : (
                    <>
                        <span className={`material-symbols-outlined ${styles.SpanLogo}`}> package_2 </span>
                        <h1 className={styles.H1LogoControlPanel}>Control Panel</h1>
                    </>
                )}
            </div>
            <div className={styles.ContainerButtonsNavigation}>
                {isLoading ? (
                    <>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className={`${styles.skeleton} ${styles.skeletonSidebarItem}`}></div>
                        ))}
                    </>
                ) : (
                    <>
                        {/* Panel general */}
                        <div
                            className={`${styles.buttonControlPanelNavigation} ${activeView === "panel" ? styles.active : ""}`}
                            onClick={() => onNavigate("panel")}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <p style={{ fontSize: "20px" }}>Panel</p>
                        </div>

                        {/* Actas de entrega */}
                        <div
                            className={`${styles.buttonControlPanelNavigation} ${activeView === "actas de entrega" ? styles.active : ""}`}
                            onClick={() => onNavigate("actas de entrega")}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="material-symbols-outlined">developer_guide</span>
                            <p style={{ fontSize: "20px" }}>Actas de entrega</p>
                        </div>

                        {/* Produccion */}
                        <div
                            //className={`${styles.buttonControlPanelNavigation} ${activeView === "produccion" ? styles.active : ""}`}
                            //onClick={() => onNavigate("produccion")}
                            // style={{ cursor: "pointer" }}
                            className={`${styles.buttonControlPanelNavigation}`}
                            style={{ cursor: "not-allowed" }}
                        >
                            <span className="material-symbols-outlined">package_2</span>
                            <p style={{ fontSize: "20px" }}>Produccion</p>
                        </div>

                        {/* Etiquetas */}
                        <div
                            // className={`${styles.buttonControlPanelNavigation} ${activeView === "etiquetas" ? styles.active : ""}`}
                            // onClick={() => onNavigate("etiquetas")}
                            // style={{ cursor: "pointer" }}
                            className={`${styles.buttonControlPanelNavigation}`}
                            style={{ cursor: "not-allowed" }}
                        >
                            <span className="material-symbols-outlined">sell</span>
                            <p style={{ fontSize: "20px" }}>Etiquetas</p>
                        </div>

                        {/* Planos */}
                        <div
                            // className={`${styles.buttonControlPanelNavigation} ${activeView === "planos" ? styles.active : ""}`}
                            //onClick={() => onNavigate("planos")}
                            // style={{ cursor: "pointer" }}
                            className={`${styles.buttonControlPanelNavigation}`}
                            style={{ cursor: "not-allowed" }}
                        >
                            <span className="material-symbols-outlined">docs</span>
                            <p style={{ fontSize: "20px" }}>Planos</p>
                        </div>

                        {/* Manuales */}
                        <div
                            // className={`${styles.buttonControlPanelNavigation} ${activeView === "manuales" ? styles.active : ""}`}
                            //onClick={() => onNavigate("manuales")}
                            // style={{ cursor: "pointer" }}
                            className={`${styles.buttonControlPanelNavigation}`}
                            style={{ cursor: "not-allowed" }}
                        >
                            <span className="material-symbols-outlined">menu_book</span>
                            <p style={{ fontSize: "20px" }}>Manuales</p>
                        </div>

                        {/* Documentos */}
                        <div
                            //className={`${styles.buttonControlPanelNavigation} ${activeView === "documentos" ? styles.active : ""}`}
                            //onClick={() => onNavigate("documentos")}
                            // style={{ cursor: "pointer" }}
                            className={`${styles.buttonControlPanelNavigation}`}
                            style={{ cursor: "not-allowed" }}
                        >
                            <span className="material-symbols-outlined">folder_open</span>
                            <p style={{ fontSize: "20px" }}>Documentos</p>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}

export default ControlPanelSidebar;
