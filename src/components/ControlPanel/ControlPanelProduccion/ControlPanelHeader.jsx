import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';

function ControlPanelHeader() {
    return (
        <div className={styles.panelControlPageProduccionContainerMainTitle}>
            <div>
                <h1>Ordenes de Produccion</h1>
                <p>Gestiona las ordenes de fabricacion</p>
            </div>
            <div>
                <button className={uiStyles.buttonPrimary} style={{ display: 'flex', gap: '10px' }}>
                    <span className="material-symbols-outlined">add</span>
                    Nueva Orden
                </button>
            </div>
        </div>
    );
}

export default ControlPanelHeader;