import styles from "@/styles/ControlPanel.module.css";
import ControlPanelCardEtiquetas from "../ControlPanelModals/ControlPanelCardEtiquetas";

function ControlPanelContent() {
    return (
        <>
            <div className={styles.panelControlPageEtiquetasContentCartContainer}>
                <ControlPanelCardEtiquetas />
                <ControlPanelCardEtiquetas />
                <ControlPanelCardEtiquetas />
                <ControlPanelCardEtiquetas />
            </div>
        </>
    );
}

export default ControlPanelContent;