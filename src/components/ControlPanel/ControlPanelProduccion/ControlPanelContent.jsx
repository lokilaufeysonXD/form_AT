import styles from "@/styles/ControlPanel.module.css";
import ControlPanelCardOrdenProduccion from "../ControlPanelModals/ControlPanelCardOrdenProduccion";

function ControlPanelContent() {
    return (
        <div className={styles.panelControlPageProduccionContent}>
            <ControlPanelCardOrdenProduccion />
            <ControlPanelCardOrdenProduccion />
            <ControlPanelCardOrdenProduccion />
            <ControlPanelCardOrdenProduccion />
        </div>
    );
}

export default ControlPanelContent;
