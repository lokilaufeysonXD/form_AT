import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState, useRef } from "react";



function ControlPanelModalsAddDocumentos({ onClose }) {

    const [fileName, setFileName] = useState("");

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
                <h1>Nuevo Plano Técnico</h1>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className={styles.modalTextArea}>
                <label htmlFor="asignado_a">Titulo*</label>
                <input type="text" id="asignado_a" name="asignado_a" placeholder="Nombre del Documento" />
                <label htmlFor="notas">Descripción</label>
                <textarea id="notas" name="notas" placeholder="Descripción del Contenido..." />
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Categoria</label>
                    <div className={styles.modalSelectContainer}>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>filter_alt</span>
                        <select
                            onMouseDown={handleMouseDown}
                            onClick={handleClick}
                            onChange={(e) => e.target.blur()}
                            style={{ color: "#94A3B8" }}
                        >
                            <option style={{ color: "#94A3B8" }}>Operación</option>
                            <option style={{ color: "#94A3B8" }}>Mantenimiento</option>
                            <option style={{ color: "#94A3B8" }}>Instalación</option>
                            <option style={{ color: "#94A3B8" }}>Otro</option>
                        </select>
                        <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>keyboard_arrow_right</span>
                    </div>
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="version">Version</label>
                    <input type="text" id="version" name="version" placeholder="v1.0" />
                </div>
            </div>
            <div className={styles.modalBody}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Departamento</label>
                    <input type="text" id="nombre" name="departamento" placeholder="Departamento" />
                </div>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="nombre">Etiquetas</label>
                    <input type="text" id="nombre" name="etiquetas" placeholder="tag1, tag2, tag3" />
                </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", width: "100%", marginBottom: "20px" }}>
                <div className={styles.modalBodyInput}>
                    <label htmlFor="asignado_a">Archivo</label>
                    <input type="text" placeholder="URL del archivo o sube uno nuevo" value={fileName} readOnly />
                </div>
                <div style={{ marginTop: "auto" }} className={styles.btnUpload}>
                    <label htmlFor="file-input"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "10px 14px",
                            borderRadius: "5px",
                            border: "1px solid #e6e6e6",
                            cursor: "pointer",
                            fontSize: "15px",
                            fontWeight: 500,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            background: "#fff",
                            color: "#0F172A",
                            height: "48px",
                        }}
                    >
                        <span class="material-symbols-outlined">upgrade</span>
                    </label>
                    <input id="file-input" type="file" className={styles.input_file_hidden} onChange={(e) => setFileName(e.target.files[0]?.name || "")} />
                </div>
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
                <button type="submit" className={uiStyles.buttonPrimary} style={{ display: 'flex', gap: '10px', backgroundColor: '#9333EA', borderColor: '#9333EA ' }}>
                    <span className="material-symbols-outlined">save</span>
                    Guardar
                </button>
            </div>
        </Modal>
    );
}

export default ControlPanelModalsAddDocumentos;
