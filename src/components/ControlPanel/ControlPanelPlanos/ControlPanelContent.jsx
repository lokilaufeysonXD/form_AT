import styles from "@/styles/ControlPanel.module.css";
import ControlPanelCardOrdenProduccion from "../ControlPanelModals/ControlPanelCardOrdenProduccion";
import ControlPanelCardPlanos from "../ControlPanelModals/ControlPanelCardPlanos";
function ControlPanelContent() {
    return (
        <div className={styles.panelControlPagePlanosContent}>
            <ControlPanelCardPlanos />
            <ControlPanelCardPlanos />
            <ControlPanelCardPlanos />
            <ControlPanelCardPlanos />
        </div>
    );
}

export default ControlPanelContent;
