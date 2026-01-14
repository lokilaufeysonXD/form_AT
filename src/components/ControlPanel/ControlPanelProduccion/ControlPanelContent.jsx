import styles from "@/styles/ControlPanel.module.css";

function ControlPanelContent() {
    return (
        <div className={styles.panelControlPageProduccionContent}>
            <div className={styles.panelControlPageProduccionContentCart}>
                {/* esto es momentanio */}
                <h1 style={{ textAlign: "center" }}>hola mundo</h1>
            </div>
        </div>
    );
}

export default ControlPanelContent;
