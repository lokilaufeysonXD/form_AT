import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState } from "react";

function ControlPanelModalsAddCliente({ onClose }) {
    const [nombreCliente, setNombreCliente] = useState("");
    const [numeroCliente, setNumeroCliente] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        if (isSubmitting) return;

        if (!nombreCliente.trim()) {
            alert("Por favor ingresa el nombre del cliente.");
            return;
        }

        if (!numeroCliente.trim()) {
            alert("Por favor ingresa el número del cliente.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/cliente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre_cliente: nombreCliente,
                    numero_cliente: numeroCliente
                })
            });

            if (!response.ok) {
                throw new Error("No se pudo registrar el cliente en el servidor");
            }

            if (onClose) onClose();
            // Disparar un evento global para notificar la creación de un nuevo cliente
            window.dispatchEvent(new Event('clienteCreated'));
        } catch (err) {
            alert(`Hubo un error al guardar el cliente: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            contentLabel="Nuevo Cliente"
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
                <h1>Nuevo Cliente</h1>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div style={{ maxHeight: 'calc(80vh - 140px)', overflowY: 'auto', paddingBottom: '16px' }}>
                <form onSubmit={handleSubmit} className={uiStyles.modalBody} style={{ flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    <div className={uiStyles.modalBodyInput} style={{ width: '100%' }}>
                        <label htmlFor="nombre_cliente">Nombre del Cliente*</label>
                        <input
                            type="text"
                            id="nombre_cliente"
                            name="nombre_cliente"
                            placeholder="Ej. Juan Pérez"
                            value={nombreCliente}
                            onChange={(e) => setNombreCliente(e.target.value)}
                            required
                        />
                        <label htmlFor="numero_cliente">Número de Cliente*</label>
                        <input
                            type="text"
                            id="numero_cliente"
                            name="numero_cliente"
                            placeholder="Ej. 123456789"
                            value={numeroCliente}
                            onChange={(e) => setNumeroCliente(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </div>

            <div className={uiStyles.modalFooter}>
                <button
                    type="button"
                    onClick={onClose}
                    className={uiStyles.buttonSecondary}
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
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={uiStyles.buttonPrimary}
                    disabled={isSubmitting}
                    style={{
                        display: 'flex',
                        gap: '10px',
                        opacity: isSubmitting ? 0.6 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    <span className="material-symbols-outlined">save</span>
                    {isSubmitting ? 'Guardando...' : 'Crear Cliente'}
                </button>
            </div>
        </Modal>
    );
}

export default ControlPanelModalsAddCliente;
