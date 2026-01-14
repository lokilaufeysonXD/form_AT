import styles from "@/styles/ControlPanel.module.css";

function ControlPanelFilters() {
    return (
        <div className={styles.panelControlPageProduccionFilters}>
            <div className={styles.panelControlPageProduccionContainerFilters}>
                <div className={styles.searchBox}>
                    <span className="material-symbols-outlined" style={{ width: "20px", height: "20px", color: "#94A3B8", fontSize: "20px" }}>search</span>
                    <input type="text" placeholder="Buscar por número o producto..." />
                </div>
                <div className={styles.filterSelect}>
                    <span class="material-symbols-outlined" style={{ width: "20px", height: "20px", color: "#0A0A0A", fontSize: "20px" }}>filter_alt</span>
                    <select>
                        <option>Todos</option>
                        <option>Pendientes</option>
                        <option>Completadas</option>
                    </select>
                    <span class="material-symbols-outlined" style={{ width: "20px", height: "20px", color: "#94A3B8", fontSize: "20px" }}>keyboard_arrow_right</span>
                </div>
                <div className={styles.filterSelect}>
                    {/* spam basio porque no se usa */}
                    <span></span>
                    <select>
                        <option>Todas</option>
                        <option>Hoy</option>
                        <option>Última semana</option>
                    </select>
                    <span class="material-symbols-outlined" style={{ width: "20px", height: "20px", color: "#94A3B8", fontSize: "20px" }}>keyboard_arrow_right</span>
                </div>
            </div>
        </div>
    );
}

export default ControlPanelFilters;
