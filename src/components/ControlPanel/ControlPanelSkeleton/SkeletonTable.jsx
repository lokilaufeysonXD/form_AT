import styles from '@/styles/Skeleton.module.css'

// Estilo base del shimmer reutilizado en cada celda del skeleton
const shimmer = {
    background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeletonShimmer 1.4s infinite',
};


function SkeletonTable() {
    return (
        <>
            {/* Skeleton de carga — imita la estructura de la tabla */}
            <div style={{ padding: '0 4px' }}>
                {/* Fila de encabezados */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', padding: '14px 16px', background: '#F8FAFC', borderRadius: '10px 10px 0 0', borderBottom: '2px solid #E2E8F0' }}>
                    {[70, 180, 240, 'auto', 120].map((w, i) => (
                        <div key={i} style={{
                            height: '14px', borderRadius: '6px',
                            background: 'linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)',
                            backgroundSize: '200% 100%',
                            animation: 'skeletonShimmer 1.4s infinite',
                            flex: w === 'auto' ? 1 : `0 0 ${w}px`
                        }} />
                    ))}
                </div>
                {/* Filas de datos */}
                {Array.from({ length: 6 }).map((_, rowIdx) => (
                    <div key={rowIdx} className={styles.skeletonTable} >
                        {/* numero # */}
                        <div style={{ flex: '0 0 70px' }}>
                            <div className={styles.skeletonColumnNumero} style={{ ...shimmer }} />
                        </div>
                        {/* Fecha */}
                        <div style={{ flex: '0 0 180px' }}>
                            <div className={styles.skeletonColumnFecha} style={{ ...shimmer }} />
                        </div>
                        {/* Cliente */}
                        <div style={{ flex: '0 0 240px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className={styles.skeletonColumnClienteLogo} style={{ ...shimmer }} />
                            <div className={styles.skeletonColumnClientName} style={{ ...shimmer }} />
                        </div>
                        {/* Descripción */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ height: '22px', width: `${60 + (rowIdx * 13) % 30}%`, borderRadius: '6px', ...shimmer }} />
                        </div>
                        {/* Acciones */}
                        <div style={{ flex: '0 0 120px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <div className={styles.skeletonColumnAccion} style={{ ...shimmer }} />
                            <div className={styles.skeletonColumnAccion} style={{ ...shimmer }} />
                        </div>
                    </div>
                ))}
                <style>{`
                            @keyframes skeletonShimmer {
                                0%   { background-position: 200% 0; }
                                100% { background-position: -200% 0; }
                            }
                        `}</style>
            </div>
        </>
    );
}

export default SkeletonTable;
