import styles from "@/styles/ControlPanel.module.css";

function ControlPanelCardOrdenProduccion() {
    return (
        <div className={styles.panelControlPageProduccionContentCart}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", gap: "10px" }}>
                <p style={{ fontSize: "14px" }}>ORD-044</p>
                <p>Media</p>
                <p style={{ marginLeft: "auto" }}>En Proceso</p>
            </div>
            <h1>casa OS</h1>
            <br />
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B" }}>package_2</span>
                <p>Cantidad:</p>
                <strong>
                    <p>4</p>
                </strong>
                <p>unidades</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B" }}>calendar_today</span>
                <p>Entrega:</p>
                <p> 3 diciembre de 2025</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <span className="material-symbols-outlined" style={{ color: "#64748B" }}>account_box</span>
                <p>Jose</p>
            </div>
            <div>
                <p>Hola mundo esto es una nota</p>
            </div>
            <div className={styles.panelControlPageProduccionContentCartFooter}>
                <button>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button>
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    );
}

export default ControlPanelCardOrdenProduccion;