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
                        <div
                            className={`${styles.buttonControlPanelNavigation} ${activeView === "panel" ? styles.active : ""}`}
                            onClick={() => onNavigate("panel")}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="material-symbols-outlined">dashboard</span>
                            <p style={{ fontSize: "20px" }}>Panel</p>
                        </div>
                        <div
                            className={`${styles.buttonControlPanelNavigation} ${activeView === "produccion" ? styles.active : ""}`}
                            onClick={() => onNavigate("produccion")}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="material-symbols-outlined">package_2</span>
                            <p style={{ fontSize: "20px" }}>Produccion</p>
                        </div>
                        <a href="" className={styles.buttonControlPanelNavigation}>
                            <span className="material-symbols-outlined">sell</span>
                            <p style={{ fontSize: "20px" }}>Etiquetas</p>
                        </a>
                        <a href="" className={styles.buttonControlPanelNavigation}>
                            <span className="material-symbols-outlined">docs</span>
                            <p style={{ fontSize: "20px" }}>Planos</p>
                        </a>
                        <a href="" className={styles.buttonControlPanelNavigation}>
                            <span className="material-symbols-outlined">menu_book</span>
                            <p style={{ fontSize: "20px" }}>Manuales</p>
                        </a>
                        <a href="" className={styles.buttonControlPanelNavigation}>
                            <span className="material-symbols-outlined">folder_open</span>
                            <p style={{ fontSize: "20px" }}>Documentos</p>
                        </a>
                    </>
                )}
            </div>
        </aside>
    );
}

export default ControlPanelSidebar;
