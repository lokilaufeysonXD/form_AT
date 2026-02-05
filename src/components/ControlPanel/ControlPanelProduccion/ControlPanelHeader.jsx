import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import { useState } from "react";
import Modal from "react-modal"; // Asegúrate de tener instalado react-modal o importar tu componente Modal
import ControlPanelModalsAddOrdenProduccion from "../ControlPanelModals/ControlPanelModalsAddOrdenProduccion";

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
            <div className={styles.panelControlPageProduccionContainerMainTitle}>
                <div>
                    <h1>Ordenes de Produccion</h1>
                    <p>Gestiona las ordenes de fabricacion</p>
                </div>
                <div>
                    <button className={uiStyles.buttonPrimary} style={{ display: 'flex', gap: '10px' }} onClick={handleModalOpen}>
                        <span className="material-symbols-outlined">add</span>
                        Nueva Orden
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <ControlPanelModalsAddOrdenProduccion onClose={handleModalClose} formData={formData} setFormData={setFormData} />
            )}
        </>
    );
}

export default ControlPanelHeader;