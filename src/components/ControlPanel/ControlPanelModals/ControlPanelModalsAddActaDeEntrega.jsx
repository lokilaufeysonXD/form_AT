import styles from "@/styles/ControlPanel.module.css";
import uiStyles from '@/styles/UiComponents.module.css';
import Modal from "react-modal";
import { useState, useRef, useEffect, useMemo } from "react";
import PreviewActaDeEntrega from "./PreviewActaDeEntrega";
import ControlPanelModalsAddCliente from "./ControlPanelModalsAddCliente";



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
    const [isModalOpenAddCliente, setIsModalOpenAddCliente] = useState(false);

    // Obtener la lista de clientes al montar el modal
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cliente`);
                if (response.ok) {
                    const result = await response.json();
                    setClients(result);
                }
            } catch (err) {
                // Manejo de error silencioso según las directrices de producción
            }
        };

        const handleClienteCreated = (e) => {
            fetchClients();
            // Si el evento viene con el nuevo cliente registrado, lo seleccionamos de inmediato
            if (e?.detail?.id) {
                setFormData(prev => ({ ...prev, id_cliente: String(e.detail.id) }));
            }
        };

        fetchClients();

        window.addEventListener('clienteCreated', handleClienteCreated);
        return () => {
            window.removeEventListener('clienteCreated', handleClienteCreated);
        };
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
            // 1. Guardar primero el Acta de Entrega en la API
            const deliveryPayload = {
                fecha_entrega: formData.fecha_entrega,
                id_cliente: Number(formData.id_cliente),
                numero_orden_compra: formData.numero_orden_compra
            };

            console.log('Payload enviado a /api/acta:', JSON.stringify(deliveryPayload, null, 2));
            const deliveryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/acta`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(deliveryPayload)
            });

            if (!deliveryResponse.ok) {
                throw new Error("No se pudo registrar el acta de entrega en el servidor");
            }

            const savedDelivery = await deliveryResponse.json();
            console.log('Respuesta completa de /api/acta:', JSON.stringify(savedDelivery, null, 2));
            const createdDeliveryId = savedDelivery.id;

            // 2. Guardar todas las descripciones asociadas en la API
            const saveDescriptionsPromises = items
                .filter(item => item.description.trim() !== '')
                .map(async (item) => {
                    const descriptionPayload = {
                        descripcion_texto: item.description,
                        numero_orden_produccion: (showProductionOrder && item.productionOrder) ? item.productionOrder : "0",
                        id_acta_entrega: createdDeliveryId
                    };
                    console.log('Payload enviado a /api/descripcion:', JSON.stringify(descriptionPayload, null, 2));

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/descripcion`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(descriptionPayload)
                    });

                    if (!response.ok) {
                        const errorText = await response.text().catch(() => 'Sin respuesta del servidor');
                        console.error('Error del servidor /api/descripcion (texto):', errorText);
                        throw new Error(`Error ${response.status}: ${errorText.substring(0, 300)}`);
                    }
                });

            await Promise.all(saveDescriptionsPromises);

            // Cerrar el modal tras el registro exitoso
            if (onClose) onClose();
            window.dispatchEvent(new Event('actaCreated'));
        } catch (err) {
            alert(`Hubo un error al guardar: ${err.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Nombre del cliente seleccionado para mostrar en la vista previa
    const selectedClientName = useMemo(() => {
        if (!formData.id_cliente) return '';
        const found = clients.find(c => String(c.id) === String(formData.id_cliente));
        return found ? found.nombre_cliente : '';
    }, [formData.id_cliente, clients]);

    return (
        <>
            <Modal
                isOpen={true}
                onRequestClose={onClose}
                contentLabel="Nueva Orden de Produccion"
                ariaHideApp={false}
                className={{
                    base: uiStyles.modalContentWide,
                    afterOpen: uiStyles.modalContentAfterOpen,
                    beforeClose: uiStyles.modalContentBeforeClose,
                }}
                overlayClassName={{
                    base: uiStyles.modalOverlay,
                    afterOpen: uiStyles.modalOverlayAfterOpen,
                    beforeClose: uiStyles.modalOverlayBeforeClose,
                }}
            >
                <div className={uiStyles.modalHeader}>
                    <h1 title="si el campo esta vacio le pone la fecha actual">Nueva Acta De Entrega</h1>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* /////////////////////   Layout principal a dos columnas: Formulario a la izquierda y Vista Previa a la derecha */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(420px, 1fr) minmax(460px, 1.15fr)',
                    gap: '24px',
                    height: 'calc(85vh - 160px)',
                    minHeight: '520px'
                }}>
                    {/* Columna Izquierda: Formulario con scroll vertical */}
                    <div style={{
                        overflowY: 'auto',
                        paddingRight: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        {/* Datos generales del Acta */}
                        <div className={uiStyles.modalBody} style={{ marginBottom: 0 }} >
                            <div className={uiStyles.modalBodyInput} style={{ flex: '3', }}>
                                <label htmlFor="fecha_entrega">Fecha de Entrega</label>
                                <input
                                    type="date"
                                    id="fecha_entrega"
                                    name="fecha_entrega"
                                    value={formData.fecha_entrega}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={uiStyles.modalBodyInput} style={{ flex: '3' }}>
                                <label htmlFor="id_cliente">Cliente*</label>
                                <div className={uiStyles.modalSelectContainer}>
                                    <span className="material-symbols-outlined" style={{ color: "#94A3B8", fontSize: "15px" }}>filter_alt</span>
                                    <select
                                        id="id_cliente"
                                        name="id_cliente"
                                        value={formData.id_cliente}
                                        onChange={handleChange}
                                        style={{ color: formData.id_cliente ? "#0F172A" : "#94A3B8" }}
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

                            {/* Botón rápido para abrir el modal de Nuevo Cliente */}
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '98%' }}>
                                <button
                                    type="button"
                                    className={uiStyles.modalSelectContainer}
                                    // className={uiStyles.buttonGreen}
                                    onClick={() => setIsModalOpenAddCliente(true)}
                                    title="Crear nuevo cliente"
                                    style={{
                                        height: '48px',
                                        width: '48px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '8px',
                                        padding: 0,
                                        cursor: 'pointer',
                                        background: '#FFFFFF',
                                        border: '1px solid #CBD5E1',
                                        borderRadius: '6px',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        color: '#334155',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ color: '#94A3B8', fontSize: '22px' }}>
                                        person_add
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className={uiStyles.modalBody} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '14px', marginBottom: 0 }}>
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

                            {/* ////////////////////////////////////////////////////////////   Descripcion de la orden de produccionion  */}
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
                                <span style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                                    ¿Lleva número de orden de producción?
                                </span>
                            </div>
                        </div>

                        {/* Sección de Conceptos / Items Dinámicos */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0F172A' }}>
                                    Descripcion ({items.length})
                                </span>
                            </div>

                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        border: '1px solid #E2E8F0',
                                        borderRadius: '10px',
                                        padding: '14px',
                                        backgroundColor: '#F8FAFC',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '10px',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Cabecera de la tarjeta del concepto con botón de remover */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: '#0284C7', fontSize: '12px', fontWeight: '700' }}>
                                            Concepto #{index + 1}
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
                                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Entrada de la descripción del acta */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label htmlFor={`descripcion-${index}`} style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                                            Descripción del Acta*
                                        </label>
                                        <textarea
                                            id={`descripcion-${index}`}
                                            value={item.description}
                                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                            placeholder="Descripción detallada del material o servicio..."
                                            style={{
                                                width: '100%',
                                                minHeight: '55px',
                                                padding: '8px 10px',
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #CBD5E1',
                                                borderRadius: '6px',
                                                color: '#0F172A',
                                                fontFamily: 'inherit',
                                                fontSize: '13px',
                                                resize: 'vertical',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Entrada opcional del número de orden de producción */}
                                    {showProductionOrder && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <label htmlFor={`op-${index}`} style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                                                Número de Orden de producción
                                            </label>
                                            <input
                                                type="text"
                                                id={`op-${index}`}
                                                value={item.productionOrder}
                                                onChange={(e) => handleItemChange(index, 'productionOrder', e.target.value)}
                                                placeholder="Ej. 0000.05243"
                                                style={{
                                                    width: '100%',
                                                    padding: '8px 10px',
                                                    backgroundColor: '#FFFFFF',
                                                    border: '1px solid #CBD5E1',
                                                    borderRadius: '6px',
                                                    color: '#0F172A',
                                                    fontSize: '13px',
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
                                    padding: '9px',
                                    backgroundColor: 'transparent',
                                    border: '1px dashed #94A3B8',
                                    borderRadius: '8px',
                                    color: '#0284C7',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    marginTop: '4px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(2, 132, 199, 0.05)';
                                    e.currentTarget.style.borderColor = '#0284C7';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.borderColor = '#94A3B8';
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
                                Agregar concepto adicional
                            </button>
                        </div>
                    </div>

                    {/* //////////// Columna Derecha: Vista previa en vivo del acta de entrega con botones de imprimir y descargar PDF */}

                    <div style={{ height: '100%', minHeight: 0 }}>
                        <PreviewActaDeEntrega
                            formData={formData}
                            clientName={selectedClientName}
                            items={items}
                            showProductionOrder={showProductionOrder}
                        />
                    </div>
                </div>

                <div className={uiStyles.modalFooter} style={{ marginTop: '16px', paddingTop: '16px' }}>
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
            </Modal >

            {isModalOpenAddCliente && (
                <ControlPanelModalsAddCliente
                    onClose={() => setIsModalOpenAddCliente(false)}
                />
            )}
        </>
    );
}

export default ControlPanelModalsAddActaDeEntrega;
