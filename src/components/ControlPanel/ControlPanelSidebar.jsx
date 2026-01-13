import styles from "@/styles/ControlPanel.module.css";

function ControlPanelSidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.ContainerLogo}>
                <span className={`material-symbols-outlined ${styles.SpanLogo}`}> package_2 </span>
                <h1 className={styles.H1LogoControlPanel}>Control Panel</h1>
            </div>
            <div className={styles.ContainerButtonsNavigation}>
                <a href="" className={styles.buttonControlPanelNavigation}>
                    <span class="material-symbols-outlined">dashboard</span>
                    <p style={{ fontSize: "20px" }}>Panel</p>
                </a>
                <a href="" className={styles.buttonControlPanelNavigation}>
                    <span class="material-symbols-outlined">package_2</span>
                    <p style={{ fontSize: "20px" }}>Produccion</p>
                </a>
                <a href="" className={styles.buttonControlPanelNavigation}>
                    <span class="material-symbols-outlined">sell</span>
                    <p style={{ fontSize: "20px" }}>Etiquetas</p>
                </a>
                <a href="" className={styles.buttonControlPanelNavigation}>
                    <span class="material-symbols-outlined">docs</span>
                    <p style={{ fontSize: "20px" }}>Planos</p>
                </a>
                <a href="" className={styles.buttonControlPanelNavigation}>
                    <span class="material-symbols-outlined">menu_book</span>
                    <p style={{ fontSize: "20px" }}>Manuales</p>
                </a>
                <a href="" className={styles.buttonControlPanelNavigation}>
                    <span class="material-symbols-outlined">folder_open</span>
                    <p style={{ fontSize: "20px" }}>Documentos</p>
                </a>
            </div>
        </aside>
    );
}

export default ControlPanelSidebar;
