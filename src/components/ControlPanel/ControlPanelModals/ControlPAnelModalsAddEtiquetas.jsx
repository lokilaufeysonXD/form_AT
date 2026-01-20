import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState, useRef } from "react";



function ControlPanelModalsAddEtiquetas({ onClose }) {
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
            contentLabel="Nueva Etiqueta de Envio"
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
                <h1>Nueva Etiqueta de Envio</h1>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Numero de Etiqueta*</label>
                    <input type="number" id="nombre" name="nombre" placeholder="ETI-001" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="descripcion">Referencia de Orden</label>
                    <input type="text" id="nombre" name="nombre" placeholder="ORD-001" />
                </div>
            </div>
            <div className={styles.modalTextArea}>
                <label htmlFor="asignado_a">Nombre del Destinatario*</label>
                <input type="text" id="asignado_a" name="asignado_a" placeholder="Nombre Completo" />
                <label htmlFor="notas">Direccion*</label>
                <input type="text" id="asignado_a" name="asignado_a" placeholder="Calle, numero, colonia" />
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Ciudad*</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ciudad" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="descripcion">Codigo Postal</label>
                    <input type="text" id="nombre" name="nombre" placeholder="12345" />
                </div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Pais</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Mexico" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="descripcion">Telefono</label>
                    <input type="text" id="nombre" name="nombre" placeholder="+ 52 1234567890" />
                </div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Peso (Kg)</label>
                    <input type="text" id="nombre" name="nombre" placeholder="1.5" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="descripcion">Dimensiones (L x W x H)</label>
                    <input type="text" id="nombre" name="nombre" placeholder="12 x 12 x 12" />
                </div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Metodo de Envio</label>
                    <div className={styles.modalSelectContainer}>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>filter_alt</span>
                        <select
                            onMouseDown={handleMouseDown}
                            onClick={handleClick}
                            onChange={(e) => e.target.blur()}
                            style={{ color: "#94A3B8" }}
                        >
                            <option style={{ color: "#94A3B8" }}>Estandar</option>
                            <option style={{ color: "#94A3B8" }}>Express</option>
                            <option style={{ color: "#94A3B8" }}>Urgente</option>
                        </select>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>keyboard_arrow_right</span>
                    </div>
                </div>
                <div className={styles.modalBodyInput}>
                    {/* basio */}
                </div>
            </div>
            <div className={styles.modalTextArea}>
                <label htmlFor="notas">Notas</label>
                <textarea id="notas" name="notas" placeholder="Instrucciones especiales de entrega..." />
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
                <button type="submit" className={uiStyles.buttonPrimary} style={{ display: 'flex', gap: '10px', backgroundColor: '#D97706', borderColor: '#D97706' }}>
                    <span className="material-symbols-outlined">save</span>
                    Crear Etiqueta
                </button>
            </div>
        </Modal>
    );
}

export default ControlPanelModalsAddEtiquetas;
