import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import { useState } from "react";
import Modal from "react-modal"; // Asegúrate de tener instalado react-modal o importar tu componente Modal
import ControlPanelModalsAddDocumentos from "../ControlPanelModals/ControlPanelAddDocumentos";

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
                        color: '#FFFFFF',
                        padding: '8px',
                        borderRadius: '12px',
                        backgroundColor: '#9333EA',
                    }}>folder_open</span>
                <div>
                    <h1
                        style={{
                            color: '#0F172A',
                            fontFamily: 'sans-serif',
                            fontSize: '30px',
                            fontWeight: 'bold'
                        }}>Documentos</h1>
                    <p
                        style={{
                            color: '#64748B',
                            fontFamily: 'sans-serif',
                            fontSize: '16px',
                        }}>Archivos, reportes y documentacion oficial</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <button className={uiStyles.buttonPrimary}
                        style={{
                            display: 'flex',
                            gap: '10px',
                            backgroundColor: '#9333EA',
                            borderColor: '#9333EA'
                        }} onClick={handleModalOpen}>
                        <span className="material-symbols-outlined">add</span>
                        Nuevo Documento
                    </button>
                </div>
            </div>
            {/* hacer el modal de las etiquetas */}
            {isModalOpen && (
                <ControlPanelModalsAddDocumentos onClose={handleModalClose} formData={formData} setFormData={setFormData} />
            )}
        </>
    );
}

export default ControlPanelHeader;