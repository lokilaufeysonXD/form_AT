import styles from "@/styles/ControlPanel.module.css";
import ControlPanelSidebar from "@/components/ControlPanel/ControlPanelSidebar";
import ControlPanelStats from "@/components/ControlPanel/ControlPanelStats";
import ControlPanelFastAccess from "@/components/ControlPanel/ControlPanelFastAccess";
import ControlPanelRecentPanel from "@/components/ControlPanel/ControlPanelRecentPanel";

export default function ControlPanel() {
    return (
        <div className={styles.layout}>
            <ControlPanelSidebar />
            <main className={styles.main}>
                <div className={styles.panelControlContainerMainTitle}>
                    <h1>Panel de Control</h1>
                    <p>gestion integral de produccion y documentacion</p>
                </div>
                <ControlPanelStats />
                <ControlPanelFastAccess />
                <ControlPanelRecentPanel />
            </main>
        </div>
    );
}