import styles from "@/styles/ControlPanel.module.css";

function ControlPanelCardPlanos() {
    return (
        <div className={styles.panelControlPagePlanosContentCart}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", gap: "10px", flexDirection: "row", justifyContent: "Flex-start" }}>
                <div>
                    <span className="material-symbols-outlined"
                        style={{
                            fontSize: '37px',
                            color: '#1E293B',
                            padding: '8px',
                            borderRadius: '12px',
                            backgroundColor: '#CBD5E1',
                        }}>docs</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px", alignItems: "Flex-start" }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: "black" }}>Manual Carcamo</p>
                    <p style={{ fontSize: "14px" }}>V1.0</p>
                </div>
                <div style={{ marginLeft: "auto", marginBottom: "auto" }}>
                    <p className={styles.ButomObtionPlanos + " " + styles.ButomObtionPlanosMecanico}>
                        Mecánico
                    </p>
                </div>
            </div>
            <div >
                <p style={{ fontSize: "16px", marginBottom: "10px", marginLeft: "62px" }}>Manual de un tablero Carcamo </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", marginLeft: "62px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>sell</span>
                <p style={{ fontSize: "14px" }}>Carcamo</p>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>calendar_today</span>
                <p style={{ fontSize: "14px" }}>27 nov 2025</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", marginLeft: "62px", justifyContent: "Flex-start" }}>
                <p className={styles.ButomObtionEtiquetasPlanos}>
                    Carcamo
                </p>
                <p className={styles.ButomObtionEtiquetasPlanos}>
                    Sin Variador
                </p>
            </div>
            <div className={styles.panelControlPageProduccionContentCartFooter}>
                <button style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: "10px" }} className={styles.ButomObtionVerManuales}>
                    <span className="material-symbols-outlined">open_in_new</span>
                    Ver archivo
                </button>
                <div className={styles.panelControlPageProduccionContentCartFooterButtom} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <button style={{ color: "blue" }}>
                        <span className="material-symbols-outlined">print</span>
                    </button>
                    <button >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button style={{ color: "red" }}>
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ControlPanelCardPlanos;
