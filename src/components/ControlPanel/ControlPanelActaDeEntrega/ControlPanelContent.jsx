import styles from "@/styles/ControlPanel.module.css";
import tableStyles from "@/styles/ActaDeEntregaTable.module.css";
import pageStyles from "@/styles/Pagination.module.css";
import { useState, useMemo, useEffect, useCallback, Fragment } from "react";
import SkeletonTable from "@/components/ControlPanel/ControlPanelSkeleton/SkeletonTable";

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

/**
 * Agrupa los materiales de un acta por su texto de descripción.
 * Retorna un array con: { description, count, serials: [] }
 */
function groupMaterialsByDescription(materials = []) {
    if (!materials || materials.length === 0) return [];

    const map = new Map();

    materials.forEach((mat) => {
        const text = (mat.descripcion_texto || "Sin descripción").trim();
        const serial = (mat.numero_orden_produccion && mat.numero_orden_produccion !== "0")
            ? String(mat.numero_orden_produccion).trim()
            : null;

        if (!map.has(text)) {
            map.set(text, {
                description: text,
                count: 0,
                serials: []
            });
        }

        const group = map.get(text);
        group.count += 1;
        if (serial) {
            group.serials.push(serial);
        }
    });

    return Array.from(map.values());
}

function ControlPanelContent() {
    // 1. Definición de estados para consumo de API
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "desc" });
    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRowExpand = (id) => {
        setExpandedRows(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

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
    }, [data, sortConfig]);

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

    const handleEditClick = (row) => {
        // Lógica de edición
        console.log("Editar acta:", row);
    };

    const handleDeleteClick = (id) => {
        // Lógica de eliminación
        console.log("Eliminar acta:", id);
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

                {/* Skeleton de carga — imita la estructura de la tabla */}
                {isLoading && (
                    <SkeletonTable />
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
                                        const grouped = groupMaterialsByDescription(row.materials);
                                        const isExpanded = expandedRows.has(row.id);
                                        const firstGroup = grouped[0] || null;
                                        const extraCount = grouped.length > 1 ? grouped.length - 1 : 0;
                                        const hasExpandableContent =
                                            grouped.length > 1 ||
                                            grouped.some((g) => g.serials.length > 0 || g.count > 1);

                                        const rowClass = `${tableStyles.tableRow} ${index % 2 === 0 ? tableStyles.tableRowEven : tableStyles.tableRowOdd}`;

                                        return (
                                            <Fragment key={row.id}>
                                                <tr
                                                    className={rowClass}
                                                    style={{
                                                        height: '52px',
                                                        cursor: hasExpandableContent ? 'pointer' : 'default',
                                                    }}
                                                    onClick={() => hasExpandableContent && toggleRowExpand(row.id)}
                                                    onKeyDown={(e) => {
                                                        if (hasExpandableContent && (e.key === 'Enter' || e.key === ' ')) {
                                                            e.preventDefault();
                                                            toggleRowExpand(row.id);
                                                        }
                                                    }}
                                                    tabIndex={hasExpandableContent ? 0 : undefined}
                                                    aria-expanded={hasExpandableContent ? isExpanded : undefined}
                                                >
                                                    {/* # */}
                                                    <td className={`${tableStyles.tableCell} ${tableStyles.cellFixed}`}>
                                                        <span className={tableStyles.idBadge}>{row.id}</span>
                                                    </td>

                                                    {/* Fecha */}
                                                    <td className={`${tableStyles.tableCellDate} ${tableStyles.cellFixed}`}>
                                                        <span className={DATE_BADGE_CLASS[dateStatus]}>
                                                            <span className="material-symbols-outlined">calendar_today</span>
                                                            {formatDate(row.deliveryDate)}
                                                        </span>
                                                    </td>

                                                    {/* Cliente */}
                                                    <td className={`${tableStyles.tableCell} ${tableStyles.cellFixed}`}>
                                                        <div className={tableStyles.clientContainer}>
                                                            <span className={tableStyles.clientAvatar}>
                                                                {row.clientName ? row.clientName.charAt(0) : "?"}
                                                            </span>
                                                            <span
                                                                className={tableStyles.clientName}
                                                                title={row.clientName}
                                                                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}
                                                            >
                                                                {row.clientName || "Sin nombre"}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Descripción: una sola línea */}
                                                    <td className={`${tableStyles.tableCellDescription} ${tableStyles.cellFixed}`} style={{ maxWidth: '460px' }}>
                                                        {firstGroup ? (
                                                            <div className={tableStyles.descWrap}>
                                                                <span title={firstGroup.description} className={tableStyles.descText}>
                                                                    {firstGroup.description}
                                                                </span>

                                                                {firstGroup.count > 1 && (
                                                                    <span className={tableStyles.badgeUnits}>× {firstGroup.count} uds</span>
                                                                )}

                                                                {extraCount > 0 && (
                                                                    <span className={tableStyles.badgeMore}>+{extraCount} más</span>
                                                                )}

                                                                {hasExpandableContent && (
                                                                    <span
                                                                        className={`material-symbols-outlined ${tableStyles.chevron} ${isExpanded ? tableStyles.chevronExpanded : ''}`}
                                                                    >
                                                                        expand_more
                                                                    </span>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span className={tableStyles.materialChip}>Sin descripción</span>
                                                        )}
                                                    </td>

                                                    {/* Acciones */}
                                                    <td className={`${tableStyles.tableCell} ${tableStyles.cellFixed}`}>
                                                        <div
                                                            style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
                                                            onClick={(e) => e.stopPropagation()}
                                                            onKeyDown={(e) => e.stopPropagation()}
                                                        >
                                                            <button onClick={() => handleEditClick(row)} className={tableStyles.editButton} title="Editar">
                                                                <span className="material-symbols-outlined">edit</span>
                                                            </button>
                                                            <button onClick={() => handleDeleteClick(row.id)} className={tableStyles.deleteButton} title="Eliminar">
                                                                <span className="material-symbols-outlined">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                                {/* Fila de detalle a todo el ancho */}
                                                {isExpanded && hasExpandableContent && (
                                                    <tr className={rowClass}>
                                                        <td colSpan={columns.length} className={tableStyles.detailCell}>
                                                            <div className={tableStyles.detailBox}>
                                                                {grouped.map((group, gIdx) => (
                                                                    <div key={gIdx} className={tableStyles.detailGroup}>
                                                                        <div className={tableStyles.detailGroupHeader}>
                                                                            <span className={tableStyles.detailTitle}>{group.description}</span>
                                                                            <span className={tableStyles.badgeUnits}>
                                                                                {group.count === 1 ? '1 ud' : `× ${group.count} uds`}
                                                                            </span>
                                                                        </div>

                                                                        {group.serials.length > 0 && (
                                                                            <div className={tableStyles.detailSerials}>
                                                                                {group.serials.map((serial, sIdx) => (
                                                                                    <span key={sIdx} className={tableStyles.serialChip}>
                                                                                        # {serial}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Fragment>
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