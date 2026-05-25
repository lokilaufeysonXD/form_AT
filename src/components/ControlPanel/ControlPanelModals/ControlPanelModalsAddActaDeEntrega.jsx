import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState, useRef } from "react";



function ControlPanelModalsAddActaDeEntrega({ onClose }) {
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
    // Estado para controlar la visibilidad del número de orden de producción
    const [showProductionOrder, setShowProductionOrder] = useState(true);

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
                base: uiStyles.modalContent,
                afterOpen: uiStyles.modalContentAfterOpen,
                beforeClose: uiStyles.modalContentBeforeClose,
            }}
            overlayClassName={{
                base: uiStyles.modalOverlay,
                afterOpen: uiStyles.modalOverlayAfterOpen,
                beforeClose: uiStyles.modalOverlayBeforeClose,
            }}
            ariaHideApp={false}
        >
            <div className={uiStyles.modalHeader}>
                <h1>Nueva Acta De Entrega</h1>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <div className={uiStyles.modalBody}>
                <div className={uiStyles.modalBodyInput}>
                    <label htmlFor="fecha_entrega">Fecha de Entrega</label>
                    <input type="date" id="fecha_entrega" name="fecha_entrega" />
                </div>
                <div className={uiStyles.modalBodyInput}>
                    <label htmlFor="nombre">Cliente*</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre del Cliente" />
                </div>
            </div>
            <div className={uiStyles.modalBody}>
                <div className={uiStyles.modalBodyInput}>
                    <label htmlFor="nombre">Numero de Orden de compra*</label>
                    <input type="number" id="nombre" name="nombre" placeholder="ACT-001" />
                </div>
            </div>
            <div className={uiStyles.modalTextArea}>
                <label htmlFor="descripcion">Descripcion del Acta*</label>
                <textarea id="descripcion" name="descripcion" placeholder="Descripcion del Acta de entrega" />
                
                {/* Switch elegante para alternar la visibilidad de la orden de producción */}
                <div 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginTop: '16px',
                        marginBottom: '12px',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }} 
                    onClick={() => setShowProductionOrder(!showProductionOrder)}
                >
                    <span 
                        className="material-symbols-outlined" 
                        style={{
                            color: showProductionOrder ? '#10B981' : '#94A3B8',
                            fontSize: '28px',
                            transition: 'color 0.2s ease, transform 0.1s ease'
                        }}
                    >
                        {showProductionOrder ? 'toggle_on' : 'toggle_off'}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#CBD5E1' }}>
                        ¿Lleva número de orden de producción?
                    </span>
                </div>

                {showProductionOrder && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label htmlFor="numero_orden_de_produccion">Numero de Orden de produccion*</label>
                        <input type="number" id="numero_orden_de_produccion" name="numero_orden_de_produccion" placeholder="0000.05243" />
                    </div>
                )}
            </div>
            <div className={uiStyles.modalFooter}>
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
                    Crear Orden
                </button>
            </div>
        </Modal>
    );
}

export default ControlPanelModalsAddActaDeEntrega;
