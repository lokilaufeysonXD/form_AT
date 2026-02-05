import styles from "@/styles/ControlPanel.module.css";
import ControlPanelCardManuales from "../ControlPanelModals/ControlPanelCardManuales";
function ControlPanelContent() {
    return (
        <div className={styles.panelControlPagePlanosContent}>
            <ControlPanelCardManuales />
            <ControlPanelCardManuales />
            <ControlPanelCardManuales />
            <ControlPanelCardManuales />
        </div>
    );
}

export default ControlPanelContent;
