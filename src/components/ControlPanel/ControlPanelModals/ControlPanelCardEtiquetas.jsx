import styles from "@/styles/ControlPanel.module.css";

function ControlPanelCardEtiquetas() {
    return (
        <div className={styles.panelControlPageProduccionContentCart}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", gap: "10px" }}>
                <p style={{ fontSize: "14px" }}>DJADA_31</p>
                <p className={styles.ButomObtionEnvio + " " + styles.ButomObtionEnvioUrgente} style={{ marginLeft: "auto" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px", marginRight: "4px" }}>delivery_truck_speed</span>
                    Urgente
                </p>
            </div>
            <h1>Lsaso jw</h1>
            <br />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>location_on</span>
                <p style={{ fontSize: "14px" }}>Calle 123, Ciudad, País, Colombia </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>add_call</span>
                <p style={{ fontSize: "14px" }}>+52 312 345 6789</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>package_2</span>
                <p style={{ fontSize: "14px" }}>2.45 Kg</p>
                <p style={{ fontSize: "14px" }}>*</p>
                <p style={{ fontSize: "14px" }}>32x244x440 mm</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <p style={{ fontSize: "14px" }}>Ref:</p>
                <p style={{ fontSize: "14px" }}>DAWE-123456789</p>
            </div>
            <div>
                <p className={styles.panelControlPageProduccionContentCartNote}>Hola mundo esto es una nota</p>
            </div>
            <div className={styles.panelControlPageProduccionContentCartFooter}>
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
    );
}

export default ControlPanelCardEtiquetas;

