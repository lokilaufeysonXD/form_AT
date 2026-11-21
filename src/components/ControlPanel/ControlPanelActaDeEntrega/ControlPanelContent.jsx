import styles from "@/styles/ControlPanel.module.css";
import tableStyles from "@/styles/ActaDeEntregaTable.module.css";
import pageStyles from "@/styles/Pagination.module.css";
import { useState, useMemo, useEffect, useCallback } from "react";

/**
 * Devuelve el ancho actual de la ventana y se actualiza en cada resize
 */
function useWindowWidth() {
    const [width, setWidth] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth : 9999
    );
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
}

/**
 * Formatea una fecha ISO a formato legible en español (ej: "28 May 2026")
 * @param {string} dateString - Fecha en formato ISO (YYYY-MM-DD)
 * @returns {string} Fecha formateada
 */
function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

/**
 * Determina si una fecha de entrega está próxima (dentro de 7 días),
 * vencida, o en tiempo normal para aplicar estilos visuales
 */
function getDateStatus(dateString) {
    if (!dateString) return "normal";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const delivery = new Date(dateString + "T00:00:00");
    const diffDays = Math.ceil((delivery - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "overdue";
    if (diffDays <= 7) return "soon";
    return "normal";
}

// Mapeo de estado de fecha a clase CSS correspondiente
const DATE_BADGE_CLASS = {
    overdue: tableStyles.dateBadgeOverdue,
    soon: tableStyles.dateBadgeSoon,
    normal: tableStyles.dateBadgeNormal,
};

function ControlPanelContent() {
    // 1. Definición de estados para consumo de API
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });

    // Estados de paginación
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });

    // Ancho de ventana para mostrar el hint de scroll solo en pantallas pequeñas
    const windowWidth = useWindowWidth();

    // Función para obtener datos de la API con soporte de paginación
    const fetchDeliveries = async (currentPage = 1) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/acta?page=${currentPage}`);

            if (!response.ok) {
                throw new Error("Error al obtener los registros del servidor");
            }

            const result = await response.json();

            // Soporta respuesta paginada (result.data) o array directo
            const items = Array.isArray(result) ? result : (result.data ?? []);

            // Guardar metadata de paginación si existe
            if (result.current_page) {
                setMeta({
                    current_page: result.current_page,
                    last_page: result.last_page,
                    total: result.total,
                });
            }

            // Mapear los datos de la API estructurada al formato en inglés usado por el componente
            const mappedData = items.map((item) => ({
                id: item.id,
                deliveryDate: item.fecha_entrega,
                clientName: item.cliente ? item.cliente.nombre_cliente : "Sin cliente",
                // Guardamos el array completo de materiales para mostrar todos los ítems
                materials: Array.isArray(item.material) ? item.material : [],
            }));

            setData(mappedData);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Recargar cuando cambia la página
    useEffect(() => {
        fetchDeliveries(page);
    }, [page]);

    // 3. Escuchar evento de creación de acta para refrescar la tabla
    useEffect(() => {
        const handler = () => {
            fetchDeliveries(page);
        };
        window.addEventListener('actaCreated', handler);
        return () => window.removeEventListener('actaCreated', handler);
    }, [page]);

    /**
     * Ordena los datos de la tabla según la columna y dirección seleccionada.
     * Ahora utiliza el estado dinámico 'data'.
     */
    const sortedData = useMemo(() => {
        const sorted = [...data].sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            if (sortConfig.key === "deliveryDate") {
                aVal = new Date(aVal || 0);
                bVal = new Date(bVal || 0);
            }

            if (typeof aVal === "string") {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [data, sortConfig]); // Se añade 'data' como dependencia

    /** Alterna la dirección de ordenamiento o cambia la columna activa */
    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    /** Renderiza el icono de ordenamiento según el estado actual de la columna */
    const renderSortIcon = (key) => {
        const isActive = sortConfig.key === key;
        return (
            <span className={`material-symbols-outlined ${isActive ? tableStyles.sortIconActive : tableStyles.sortIconInactive}`}>
                {isActive
                    ? (sortConfig.direction === "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down")
                    : "unfold_more"
                }
            </span>
        );
    };

    // Definición de columnas de la tabla
    const columns = [
        { key: "id", label: "#", width: "70px" },
        { key: "deliveryDate", label: "Fecha de Entrega", width: "180px" },
        { key: "clientName", label: "Nombre del Cliente", width: "240px" },
        { key: "description", label: "Descripción", width: "auto" },
        { key: "actions", label: "Acciones", width: "120px" },
    ];

    return (
        <div className={styles.panelControlPagePlanosContent}>
            <div className={styles.panelControlPageActaDeEntregaContainerTable}>

                {/* Encabezado de la tabla con contador de registros */}
                <div className={tableStyles.tableHeader}>
                    <div className={tableStyles.tableHeaderInfo}>
                        <div className={tableStyles.tableHeaderIcon}>
                            <span className="material-symbols-outlined">table_chart</span>
                        </div>
                        <div>
                            <h3 className={tableStyles.tableHeaderTitle}>Actas de Entrega</h3>
                            <p className={tableStyles.tableHeaderSubtitle}>
                                {isLoading ? "Cargando..." : `${data.length} registros encontrados`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Renderizado Condicional según estado de la API */}
                {isLoading && (
                    <div className={styles.loadingState}>
                        <p style={{ color: '#94A3B8', fontSize: '20px' }}>Cargando información desde el servidor...</p>
                    </div>
                )}

                {error && (
                    <div className={styles.errorState}>
                        <p> <span style={{ color: '#DC2626', fontSize: '20px' }}>⚠️</span> Hubo un problema: {error}</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        {/* Contenedor con scroll horizontal para responsividad en móviles */}
                        <div className={tableStyles.tableScrollContainer}>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        {columns.map((col) => (
                                            <th
                                                key={col.key}
                                                onClick={() => handleSort(col.key)}
                                                style={{ width: col.width }}
                                            >
                                                <div className={tableStyles.thContent}>
                                                    {col.label}
                                                    {renderSortIcon(col.key)}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedData.map((row, index) => {
                                        const dateStatus = getDateStatus(row.deliveryDate);

                                        return (
                                            <tr
                                                key={row.id}
                                                className={`${tableStyles.tableRow} ${index % 2 === 0 ? tableStyles.tableRowEven : tableStyles.tableRowOdd}`}
                                            >
                                                {/* Columna # con badge numérico */}
                                                <td className={tableStyles.tableCell}>
                                                    <span className={tableStyles.idBadge}>
                                                        {row.id}
                                                    </span>
                                                </td>

                                                {/* Columna Fecha con badge de estado */}
                                                <td className={tableStyles.tableCellDate}>
                                                    <span className={DATE_BADGE_CLASS[dateStatus]}>
                                                        <span className="material-symbols-outlined">
                                                            calendar_today
                                                        </span>
                                                        {formatDate(row.deliveryDate)}
                                                    </span>
                                                </td>

                                                {/* Columna Cliente con avatar */}
                                                <td className={tableStyles.tableCell}>
                                                    <div className={tableStyles.clientContainer}>
                                                        <span className={tableStyles.clientAvatar}>
                                                            {row.clientName ? row.clientName.charAt(0) : "?"}
                                                        </span>
                                                        <span className={tableStyles.clientName}>
                                                            {row.clientName || "Sin nombre"}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Columna Descripción: chips combinados de texto + N° orden de producción */}
                                                <td className={tableStyles.tableCellDescription}>
                                                    {(row.materials || []).length > 0 ? (
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                            {(row.materials || []).map((mat, i) => (
                                                                <span key={i} className={tableStyles.materialChip}>
                                                                    {mat.descripcion_texto || "Sin descripción"}
                                                                    {mat.numero_orden_produccion && mat.numero_orden_produccion !== '0' && (
                                                                        <span className={tableStyles.materialChipOrder}>
                                                                            # {mat.numero_orden_produccion}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className={tableStyles.materialChip}>Sin descripción</span>
                                                    )}
                                                </td>

                                                {/* colomna para los botones de edicion */}
                                                <td className={tableStyles.tableCell} >
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                                                        <button
                                                            onClick={() => handleEditClick(row)}
                                                            className={tableStyles.editButton}
                                                            title="Editar"

                                                        >
                                                            <span className="material-symbols-outlined">
                                                                edit
                                                            </span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(row.id)}
                                                            className={tableStyles.deleteButton}
                                                            title="Eliminar"
                                                        >
                                                            <span className="material-symbols-outlined">
                                                                delete
                                                            </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {sortedData.length === 0 && (
                                        <tr>
                                            <td colSpan={columns.length} style={{ textAlign: "center", padding: "30px" }}>
                                                No se encontraron registros de actas de entrega.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Pie de tabla con paginación */}
                        <div className={tableStyles.tableFooter} style={{ justifyContent: windowWidth >= 1453 ? 'flex-end' : 'space-between' }}>
                            {windowWidth < 1453 && (
                                <p className={tableStyles.scrollHint}>
                                    Desliza horizontalmente para ver más columnas →
                                </p>
                            )}
                            {meta.last_page > 1 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className={pageStyles.pageButton}
                                    >
                                        ‹
                                    </button>
                                    <span style={{ color: '#94A3B8', fontSize: '13px' }}>
                                        Página {meta.current_page} de {meta.last_page}
                                    </span>
                                    <button
                                        onClick={() => setPage(p => Math.min(meta.last_page, p + 1))}
                                        disabled={page === meta.last_page}
                                        className={pageStyles.pageButton}
                                    >
                                        ›
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default ControlPanelContent;
