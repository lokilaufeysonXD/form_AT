import styles from "@/styles/ControlPanel.module.css";
import ControlPanelHeader from "@/components/ControlPanel/ControlPanelProduccion/ControlPanelHeader";
import ControlPanelFilters from "@/components/ControlPanel/ControlPanelProduccion/ControlPanelFilters";
import ControlPanelContent from "@/components/ControlPanel/ControlPanelProduccion/ControlPanelContent";

function ControlPanelPageProduccion() {
    return (
        <>
            <ControlPanelHeader />
            <ControlPanelFilters />
            <ControlPanelContent />
        </>
    );
}

export default ControlPanelPageProduccion;
