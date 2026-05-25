import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState, useRef, useEffect } from "react";



/**
 * Obtiene la fecha actual formateada como YYYY-MM-DD para inicializar el input de tipo date
 * @returns {string} Fecha actual en formato ISO
 */
function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

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

    // Estado del formulario inicializado con la fecha actual del día de hoy
    const [formData, setFormData] = useState({
        fecha_entrega: getTodayDateString(),
        id_cliente: '',
        numero_orden_compra: ''
    });
    // Estado para controlar la visibilidad del número de orden de producción
    const [showProductionOrder, setShowProductionOrder] = useState(true);

    // Lista dinámica de conceptos (cada uno tiene una descripción y orden de producción opcional)
    const [items, setItems] = useState([{ description: '', productionOrder: '' }]);

    // Lista de clientes obtenidos de la API
    const [clients, setClients] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Obtener la lista de clientes al montar el modal
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/cliente");
                if (response.ok) {
                    const result = await response.json();
                    setClients(result);
                }
            } catch (err) {
                // Manejo de error silencioso según las directrices de producción
            }
        };

        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Agregar un nuevo concepto a la lista
    const handleAddItem = () => {
        setItems(prev => [...prev, { description: '', productionOrder: '' }]);
    };

    // Eliminar un concepto específico de la lista
    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            setItems(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Manejar el cambio de texto de cada campo dentro de la lista de conceptos
    const handleItemChange = (index, field, value) => {
        setItems(prev => {
            const newItems = [...prev];
            newItems[index] = { ...newItems[index], [field]: value };
            return newItems;
        });
    };

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        if (isSubmitting) return; // prevenir doble envío
        setIsSubmitting(true);

        // Validar campos requeridos generales
        if (!formData.fecha_entrega || !formData.id_cliente || !formData.numero_orden_compra) {
            alert("Por favor completa todos los campos obligatorios.");
            setIsSubmitting(false);
            return;
        }

        // Se requiere al menos un concepto de material ingresado
        if (items.length === 0 || !items[0].description) {
            alert("Por favor ingresa al menos una descripción al acta.");
            setIsSubmitting(false);
            return;
        }

        try {
            // 1. Guardar primero la descripción en la API
            const descriptionPayload = {
                descripcion_texto: items[0].description,
                numero_orden_produccion: showProductionOrder ? items[0].productionOrder : null,
            };


            const descriptionResponse = await fetch("http://127.0.0.1:8000/api/descripcion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(descriptionPayload)
            });

            if (!descriptionResponse.ok) {
                throw new Error("No se pudo registrar la descripción en el servidor");
            }

            const savedDescription = await descriptionResponse.json();
            const createdDescriptionId = savedDescription.id;

            // 2. Guardar el Acta de Entrega vinculando el ID de la descripción recién creada
            const deliveryPayload = {
                fecha_entrega: formData.fecha_entrega,
                id_cliente: Number(formData.id_cliente),
                numero_orden_compra: formData.numero_orden_compra,
                id_orden_produccion: createdDescriptionId
            };

            console.log('Payload enviado a /api/acta:', JSON.stringify(deliveryPayload, null, 2));
            const deliveryResponse = await fetch("http://127.0.0.1:8000/api/acta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deliveryPayload)
            });

            if (!deliveryResponse.ok) {
                throw new Error("No se pudo registrar el acta de entrega en el servidor");
            }

            // Cerrar el modal tras el registro exitoso
            if (onClose) onClose();
            window.dispatchEvent(new Event('actaCreated'));
        } catch (err) {
            alert(`Hubo un error al guardar: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
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
                <h1 title="si el campo esta vacio le pone la fecha actual" >Nueva Acta De Entrega</h1>
                <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Contenedor principal con scroll vertical para no desbordar el modal en pantallas pequeñas */}
            <div style={{ maxHeight: 'calc(80vh - 140px)', overflowY: 'auto', paddingBottom: '16px' }}>

                {/* Datos generales del Acta */}
                <div className={uiStyles.modalBody}>
                    <div className={uiStyles.modalBodyInput}>
                        <label htmlFor="fecha_entrega">Fecha de Entrega</label>
                        <input
                            type="date"
                            id="fecha_entrega"
                            name="fecha_entrega"
                            value={formData.fecha_entrega}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={uiStyles.modalBodyInput}>
                        <label htmlFor="id_cliente">Cliente*</label>
                        <div className={uiStyles.modalSelectContainer}>
                            <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>filter_alt</span>
                            <select
                                id="id_cliente"
                                name="id_cliente"
                                value={formData.id_cliente}
                                onChange={handleChange}
                                style={{ color: "#94A3B8" }}
                            >
                                <option value="">Selecciona un cliente</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.nombre_cliente}
                                    </option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>keyboard_arrow_right</span>
                        </div>
                    </div>

                </div>

                <div className={uiStyles.modalBody} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '14px', marginBottom: '20px' }}>
                    <div className={uiStyles.modalBodyInput} style={{ width: '100%' }}>
                        <label htmlFor="numero_orden_compra">Numero de Orden de compra*</label>
                        <input
                            type="text"
                            id="numero_orden_compra"
                            name="numero_orden_compra"
                            placeholder="ACT-001"
                            value={formData.numero_orden_compra}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Switch elegante para alternar la visibilidad de la orden de producción */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            userSelect: 'none',
                            padding: '4px 0'
                        }}
                        onClick={() => setShowProductionOrder(!showProductionOrder)}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                color: showProductionOrder ? '#10B981' : '#94A3B8',
                                fontSize: '32px',
                                transition: 'color 0.2s ease, transform 0.1s ease'
                            }}
                        >
                            {showProductionOrder ? 'toggle_on' : 'toggle_off'}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#CBD5E1' }}>
                            ¿Lleva número de orden de producción?
                        </span>
                    </div>
                </div>

                {/* Sección de Conceptos / Items Dinámicos */}
                <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '9px' }}>

                    {items.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                border: '1px solid #334155',
                                borderRadius: '10px',
                                padding: '16px',
                                backgroundColor: '#1E293B',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                position: 'relative'
                            }}
                        >
                            {/* Cabecera de la tarjeta del concepto con botón de remover */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#38BDF8', fontSize: '12px', fontWeight: '600' }}>
                                    #{index + 1}
                                </span>
                                {items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#EF4444',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '4px',
                                            borderRadius: '6px',
                                            transition: 'background-color 0.2s'
                                        }}
                                        title="Eliminar concepto"
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                    </button>
                                )}
                            </div>

                            {/* Entrada de la descripción del acta */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <label htmlFor={`descripcion-${index}`} style={{ fontSize: '12px', fontWeight: '500', color: '#94A3B8' }}>
                                    Descripción del Acta*
                                </label>
                                <textarea
                                    id={`descripcion-${index}`}
                                    value={item.description}
                                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                    placeholder="Descripción detallada del acta de entrega"
                                    style={{
                                        width: '100%',
                                        minHeight: '60px',
                                        padding: '10px',
                                        backgroundColor: '#0F172A',
                                        border: '1px solid #475569',
                                        borderRadius: '6px',
                                        color: '#F8FAFC',
                                        fontFamily: 'inherit',
                                        resize: 'vertical',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            {/* Entrada opcional del número de orden de producción */}
                            {showProductionOrder && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    <label htmlFor={`op-${index}`} style={{ fontSize: '12px', fontWeight: '500', color: '#94A3B8' }}>
                                        Número de Orden de producción*
                                    </label>
                                    <input
                                        type="number"
                                        id={`op-${index}`}
                                        value={item.productionOrder}
                                        onChange={(e) => handleItemChange(index, 'productionOrder', e.target.value)}
                                        placeholder="0000.05243"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            backgroundColor: '#0F172A',
                                            border: '1px solid #475569',
                                            borderRadius: '6px',
                                            color: '#F8FAFC',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Botón para añadir un concepto dinámico adicional */}
                    <button
                        type="button"
                        onClick={handleAddItem}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'transparent',
                            border: '1px dashed #475569',
                            borderRadius: '8px',
                            color: '#38BDF8',
                            fontWeight: '500',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            marginTop: '4px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.05)';
                            e.currentTarget.style.borderColor = '#38BDF8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = '#475569';
                        }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
                        Agregar concepto adicional
                    </button>
                </div>

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
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={uiStyles.buttonPrimary}
                    disabled={isSubmitting}
                    style={{ display: 'flex', gap: '10px', opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                    <span className="material-symbols-outlined">save</span>
                    {isSubmitting ? 'Guardando...' : 'Crear Acta De Entrega'}
                </button>
            </div>
        </Modal>
    );
}

export default ControlPanelModalsAddActaDeEntrega;
