import styles from "@/styles/ControlPanel.module.css";
import ControlPanelHeader from "@/components/ControlPanel/ControlPanelPanel/ControlPanelHeader";
import ControlPanelStats from "@/components/ControlPanel/ControlPanelPanel/ControlPanelStats";
import ControlPanelFastAccess from "@/components/ControlPanel/ControlPanelPanel/ControlPanelFastAccess";
import ControlPanelRecentPanel from "@/components/ControlPanel/ControlPanelPanel/ControlPanelRecentPanel";

function ControlPanelPagePanel({ onChangeView }) {
    return (
        <>
            <ControlPanelHeader />
            <ControlPanelStats />
            <ControlPanelFastAccess onChangeView={onChangeView} />
            <ControlPanelRecentPanel />
        </>
    );
}

export default ControlPanelPagePanel;