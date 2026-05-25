import styles from "@/styles/ControlPanel.module.css";
import ControlPanelHeader from "./ControlPanelActaDeEntrega/ControlPanelHeader";
import ControlPanelFilters from "./ControlPanelActaDeEntrega/ControlPanelFilters";
import ControlPanelContent from "./ControlPanelActaDeEntrega/ControlPanelContent";

function ControlPanelPageActaDeEntrga() {
    return (
        <>
            <ControlPanelHeader />
            <ControlPanelFilters />
            <ControlPanelContent />
        </>
    );
}

export default ControlPanelPageActaDeEntrga;
