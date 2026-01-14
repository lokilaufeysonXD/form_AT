import styles from "@/styles/ControlPanel.module.css";

function ControlPanelHeader() {
    return (
        <div className={styles.panelControlContainerMainTitle}>
            <h1>Panel de Control</h1>
            <p>gestion integral de produccion y documentacion</p>
        </div>
    );
}

export default ControlPanelHeader;