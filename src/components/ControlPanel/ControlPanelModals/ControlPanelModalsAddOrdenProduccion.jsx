import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState, useRef } from "react";

function ControlPanelModalsAddOrdenProduccion({ onClose }) {
    const isFocusedRef = useRef(false);

    const handleMouseDown = (e) => {
        isFocusedRef.current = document.activeElement === e.target;
    };

    const handleClick = (e) => {
        if (isFocusedRef.current) {
            e.target.blur();
        }
    };

    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar
        console.log("Guardando:", formData);
        if (onClose) onClose();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Nueva Orden de Produccion"
            closeTimeoutMS={300}
            className={{
                base: styles.modalContent,
                afterOpen: styles.modalContentAfterOpen,
                beforeClose: styles.modalContentBeforeClose,
            }}
            overlayClassName={{
                base: styles.modalOverlay,
                afterOpen: styles.modalOverlayAfterOpen,
                beforeClose: styles.modalOverlayBeforeClose,
            }}
            ariaHideApp={false}
        >
            <div className={styles.modalHeader}>
                <h1>Nueva Orden de Produccion</h1>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Numero de Orden*</label>
                    <input type="number" id="nombre" name="nombre" placeholder="ORD-001" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="descripcion">Producto*</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre del Producto" />
                </div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Cantidad*</label>
                    <input type="number" id="nombre" name="nombre" placeholder="100" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Prioridad</label>
                    <div className={styles.modalSelectContainer}>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>filter_alt</span>
                        <select
                            onMouseDown={handleMouseDown}
                            onClick={handleClick}
                            onChange={(e) => e.target.blur()}
                            style={{ color: "#94A3B8" }}
                        >
                            <option style={{ color: "#94A3B8" }}>Baja</option>
                            <option style={{ color: "#94A3B8" }}>Media</option>
                            <option style={{ color: "#94A3B8" }}>Alta</option>
                            <option style={{ color: "#94A3B8" }}>Urgente</option>
                        </select>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>keyboard_arrow_right</span>
                    </div>
                </div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="estado">Estado</label>
                    <div className={styles.modalSelectContainer}>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>filter_alt</span>
                        <select
                            onMouseDown={handleMouseDown}
                            onClick={handleClick}
                            onChange={(e) => e.target.blur()}
                            style={{ color: "#94A3B8" }}
                        >
                            <option style={{ color: "#94A3B8" }}>Pendiente</option>
                            <option style={{ color: "#94A3B8" }}>En Proceso</option>
                            <option style={{ color: "#94A3B8" }}>Completada</option>
                            <option style={{ color: "#94A3B8" }}>Cancelada</option>
                        </select>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>keyboard_arrow_right</span>
                    </div>
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="fecha_entrega">Fecha de Entrega</label>
                    <input type="date" id="fecha_entrega" name="fecha_entrega" />
                </div>
            </div>
            <div className={styles.modalTextArea}>
                <label htmlFor="asignado_a">Asignado a</label>
                <input type="text" id="asignado_a" name="asignado_a" placeholder="Nombre del Responsable" />
                <label htmlFor="notas">Notas</label>
                <textarea id="notas" name="notas" placeholder="Observaciones Adicionales" />
            </div>
            <div className={styles.modalFooter}>
                <button type="button" onClick={onClose} className={uiStyles.buttonSecondary}
                    style={{
                        display: 'flex',
                        gap: '10px',
                        backgroundColor: '#F8FAFC',
                        color: '#0F172A',
                        border: '1px solid #94A3B8'
                    }}
                >
                    <span className="material-symbols-outlined">close</span>
                    Cancelar
                </button>
                <button type="submit" className={uiStyles.buttonPrimary} style={{ display: 'flex', gap: '10px' }}>
                    <span className="material-symbols-outlined">save</span>
                    Guardar
                </button>
            </div>
        </Modal>
    );
}

export default ControlPanelModalsAddOrdenProduccion;
