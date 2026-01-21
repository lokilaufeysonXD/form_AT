import styles from "@/styles/ControlPanel.module.css";
import ControlPanelCardDocumentos from "../ControlPanelModals/ControlPanelCardDocumentos";
function ControlPanelContent() {
    return (
        <div className={styles.panelControlPagePlanosContent}>
            <ControlPanelCardDocumentos />
            <ControlPanelCardDocumentos />
            <ControlPanelCardDocumentos />
            <ControlPanelCardDocumentos />
        </div>
    );
}

export default ControlPanelContent;
