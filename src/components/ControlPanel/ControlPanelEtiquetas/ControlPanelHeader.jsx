import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import { useState } from "react";
import Modal from "react-modal"; // Asegúrate de tener instalado react-modal o importar tu componente Modal
import ControlPanelModalsAddEtiquetas from "../ControlPanelModals/ControlPAnelModalsAddEtiquetas";

function ControlPanelHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar
        console.log("Guardando:", formData);
        handleModalClose();
    };

    return (
        <>
            <div className={styles.panelControlPageEtiquetasContainerMainTitle} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="material-symbols-outlined"
                    style={{
                        fontSize: '37px',
                        color: '#D97706',
                        padding: '8px',
                        borderRadius: '12px',
                        backgroundColor: '#FEF3C7',
                    }}>sell</span>
                <div>
                    <h1
                        style={{
                            color: '#0F172A',
                            fontFamily: 'sans-serif',
                            fontSize: '30px',
                            fontWeight: 'bold'
                        }}>Etiquetas de Envio</h1>
                    <p
                        style={{
                            color: '#64748B',
                            fontFamily: 'sans-serif',
                            fontSize: '16px',
                        }}>Agrega y gestiona Etiquetas para tus envios    </p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <button className={uiStyles.buttonPrimary}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            backgroundColor: '#D97706',
                            borderColor: '#D97706'
                        }} onClick={handleModalOpen}>
                        <span className="material-symbols-outlined">add</span>
                        Nueva Etiqueta
                    </button>
                </div>
            </div>
            {/* hacer el modal de las etiquetas */}
            {isModalOpen && (
                <ControlPanelModalsAddEtiquetas onClose={handleModalClose} formData={formData} setFormData={setFormData} />
            )}
        </>
    );
}

export default ControlPanelHeader;