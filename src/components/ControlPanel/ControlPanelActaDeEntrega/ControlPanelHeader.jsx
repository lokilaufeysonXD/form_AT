import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import { useState } from "react";
import Modal from "react-modal"; // Asegúrate de tener instalado react-modal o importar tu componente Modal
import ControlPanelModalsAddActaDeEntrega from "../ControlPanelModals/ControlPanelModalsAddActaDeEntrega";
import ControlPanelModalsAddCliente from "../ControlPanelModals/ControlPanelModalsAddCliente";

function ControlPanelHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAddActaEntrega, setIsModalOpenAddActaEntrega] = useState(false);
    const [isModalOpenAddCliente, setIsModalOpenAddCliente] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', descripcion: '' });

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleModalOpenAddActaEntrega = () => setIsModalOpenAddActaEntrega(true);
    const handleModalCloseAddActaEntrega = () => setIsModalOpenAddActaEntrega(false);

    const handleModalOpenAddCliente = () => setIsModalOpenAddCliente(true);
    const handleModalCloseAddCliente = () => setIsModalOpenAddCliente(false);

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
                    <h1>Acta de Entrega</h1>
                    <p>Gestiona las actas de entrega</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className={uiStyles.buttonGreen} style={{ display: 'flex', gap: '10px' }} onClick={handleModalOpenAddCliente}>
                        <span className="material-symbols-outlined">person</span>
                        Nuevo Cliente
                    </button>
                    <button className={uiStyles.buttonPrimary} style={{ display: 'flex', gap: '10px' }} onClick={handleModalOpenAddActaEntrega}>
                        <span className="material-symbols-outlined">add</span>
                        Nueva Acta De Entrega
                    </button>
                </div>
            </div>

            {isModalOpenAddActaEntrega && (
                <ControlPanelModalsAddActaDeEntrega onClose={handleModalCloseAddActaEntrega} formData={formData} setFormData={setFormData} />

            )}
            {isModalOpenAddCliente && (
                <ControlPanelModalsAddCliente onClose={handleModalCloseAddCliente} formData={formData} setFormData={setFormData} />
            )}
        </>
    );
}

export default ControlPanelHeader;