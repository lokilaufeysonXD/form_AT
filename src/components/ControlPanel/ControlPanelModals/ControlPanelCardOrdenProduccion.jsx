import styles from "@/styles/ControlPanel.module.css";

function ControlPanelCardOrdenProduccion() {
    return (
        <div className={styles.panelControlPageProduccionContentCart}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", gap: "10px" }}>
                <p style={{ fontSize: "14px" }}>ORD-044</p>
                <p className={styles.ButomObtionPrioridad + " " + styles.ButomObtionPrioridadMedia}>Media</p>
                <p className={styles.ButomObtionEstado + " " + styles.ButomObtionEstadoEnProceso} style={{ marginLeft: "auto" }}>En Proceso</p>
            </div>
            <h1>casa OS</h1>
            <br />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>package_2</span>
                <p style={{ fontSize: "14px" }}>Cantidad:</p>
                <strong>
                    <p style={{ fontSize: "14px" }}>4</p>
                </strong>
                <p style={{ fontSize: "14px" }}>unidades</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>calendar_today</span>
                <p style={{ fontSize: "14px" }}>Entrega:</p>
                <p style={{ fontSize: "14px" }}> 3 diciembre de 2025</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B", fontSize: "14px" }}>account_box</span>
                <p style={{ fontSize: "14px" }}>Jose</p>
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

export default ControlPanelCardOrdenProduccion;