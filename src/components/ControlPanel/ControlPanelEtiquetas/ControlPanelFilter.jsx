import { useRef } from "react";
import styles from "@/styles/ControlPanel.module.css";

function ControlPanelFilter() {
    const isFocusedRef = useRef(false);

    const handleMouseDown = (e) => {
        isFocusedRef.current = document.activeElement === e.target;
    };

    const handleClick = (e) => {
        if (isFocusedRef.current) {
            e.target.blur();
        }
    };

    return (
        <div className={styles.panelControlPageProduccionFilters}>
            <div className={styles.panelControlPageProduccionContainerFilters}>
                <div className={styles.searchBox}>
                    <span className="material-symbols-outlined" style={{ width: "20px", height: "20px", color: "#94A3B8", fontSize: "20px" }}>search</span>
                    <input type="text" placeholder="Buscar por destinatario, ciudad o referencia..." />
                </div>
            </div>
        </div>
    );
}

export default ControlPanelFilter;