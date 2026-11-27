import React, { useRef } from 'react';
import Image from 'next/image';

/**
 * Formatea una fecha YYYY-MM-DD en texto legible español tipo "Cancún, Quintana Roo 27 Noviembre 2026"
 * @param {string} dateStr Fecha en formato YYYY-MM-DD
 * @returns {string} Fecha formateada
 */
function formatPreviewDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parts[0];
    const monthIdx = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const monthName = months[monthIdx] || '';
    return `Cancún, Quintana Roo ${day} ${monthName} ${year}`;
}

export default function PreviewActaDeEntrega({
    formData,
    clientName,
    items,
    showProductionOrder
}) {
    const printContentRef = useRef(null);

    // Acción para imprimir la vista previa del acta
    const handlePrint = () => {
        if (!printContentRef.current) return;
        const printWindow = window.open('', '_blank', 'width=900,height=1100');
        if (!printWindow) {
            alert('Por favor permite ventanas emergentes para imprimir');
            return;
        }

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Acta de Entrega - ${formData.numero_orden_compra || 'Sin OC'}</title>
                <meta charset="utf-8" />
                <style>
                    @page {
                        size: A4;
                        margin: 15mm 20mm 15mm 20mm;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        color: #111;
                        margin: 0;
                        padding: 0;
                        background: #fff;
                    }
                    .print-wrapper {
                        width: 100%;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .header-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 20px;
                    }
                    .logo-img {
                        max-width: 240px;
                        height: auto;
                    }
                    .title-primary {
                        font-family: 'Roboto', sans-serif;
                        font-size: 20px;
                        text-decoration: underline;
                        font-weight: bold;
                        text-align: right;
                        margin: 0;
                    }
                    .company-address {
                        text-align: center;
                        font-size: 13px;
                        line-height: 1.4;
                        margin-top: 10px;
                        color: #333;
                    }
                    .hr-line {
                        height: 4px;
                        background-color: #000;
                        border: none;
                        margin: 10px 0 16px 0;
                    }
                    .date-text {
                        text-align: right;
                        font-weight: bold;
                        font-size: 13px;
                        margin: 10px 0 20px 0;
                    }
                    .acta-title {
                        text-align: center;
                        font-size: 18px;
                        font-weight: bold;
                        text-decoration: underline;
                        margin: 25px 0 20px 0;
                        letter-spacing: 0.5px;
                    }
                    .info-block {
                        margin-bottom: 14px;
                        font-size: 14px;
                    }
                    .info-label {
                        font-weight: bold;
                    }
                    .material-item {
                        margin-top: 18px;
                        margin-bottom: 18px;
                    }
                    .material-desc {
                        font-size: 14px;
                        font-weight: 500;
                        color: #111;
                        margin: 0 0 6px 0;
                        line-height: 1.4;
                    }
                    .material-serie {
                        font-size: 13px;
                        font-weight: bold;
                        color: #111;
                        margin: 4px 0 0 20px;
                    }
                    .signatures-block {
                        margin-top: 50px;
                    }
                    .signature-row {
                        display: flex;
                        align-items: flex-end;
                        margin-top: 25px;
                        font-size: 13px;
                        font-weight: bold;
                    }
                    .signature-line {
                        flex: 1;
                        border-bottom: 1px solid #000;
                        margin-left: 10px;
                        height: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="print-wrapper">
                    ${printContentRef.current.innerHTML}
                </div>
                <script>
                    window.onload = function() {
                        window.focus();
                        window.print();
                        window.close();
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    // Descargar como PDF usando el driver nativo de impresión/guardado en PDF del navegador
    const handleDownloadPdf = () => {
        handlePrint();
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            background: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden'
        }}>
            {/* Barra superior de la vista previa con botones */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: '#FFFFFF',
                borderBottom: '1px solid #E2E8F0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#64748B' }}>
                        visibility
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B' }}>
                        Vista Previa
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={handlePrint}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#334155',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F1F5F9';
                            e.currentTarget.style.borderColor = '#94A3B8';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                            e.currentTarget.style.borderColor = '#CBD5E1';
                        }}
                        title="Imprimir documento"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                            print
                        </span>
                        Imprimir
                    </button>

                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: '#0284C7',
                            border: '1px solid #0284C7',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0369A1'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0284C7'}
                        title="Descargar como PDF"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                            download
                        </span>
                        Descargar PDF
                    </button>
                </div>
            </div>

            {/* Hoja de papel simulada (A4 visual) */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div
                    ref={printContentRef}
                    style={{
                        width: '100%',
                        maxWidth: '650px',
                        background: '#FFFFFF',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        borderRadius: '4px',
                        padding: '36px 36px',
                        minHeight: '800px',
                        fontSize: '13px',
                        color: '#111827',
                        lineHeight: '1.4'
                    }}
                >
                    {/* Encabezado con logo y razón social */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '180px', height: '65px', position: 'relative' }}>
                            <img
                                src="/img/atecno.png"
                                alt="Logo Atecno"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                onError={(e) => {
                                    // Fallback si la imagen no se encuentra
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <h2 style={{
                            margin: 0,
                            fontFamily: 'Roboto, sans-serif',
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            color: '#000000',
                            textAlign: 'right'
                        }}>
                            ACCI TECNOLOGY S.A. DE CV
                        </h2>
                    </div>

                    {/* Dirección y RFC */}
                    <div style={{ textAlign: 'center', fontSize: '11px', marginTop: '14px', color: '#334155', lineHeight: '1.4' }}>
                        <div>Cto. Privada Residencial Nichupte. SM 512, MZ-12, LT-06.CP:77534. Cancún.</div>
                        <div>Benito Juarez. Quintana Roo</div>
                        <div style={{ fontWeight: 'bold' }}>RFC: ATE031119PEA</div>
                        <div style={{
                            height: '4px',
                            backgroundColor: '#000000',
                            margin: '10px auto 14px auto',
                            width: '100%'
                        }} />
                    </div>

                    {/* Fecha de entrega */}
                    <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px', margin: '10px 0 16px 0' }}>
                        {formatPreviewDate(formData.fecha_entrega)}
                    </div>

                    {/* Título Acta de Entrega */}
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '17px',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        margin: '18px 0 16px 0',
                        letterSpacing: '0.5px'
                    }}>
                        ACTA DE ENTREGA
                    </h1>

                    {/* Nombre del Cliente */}
                    <div style={{ marginTop: '16px', fontSize: '13px' }}>
                        <span style={{ fontWeight: 'bold' }}></span>
                        <span style={{ textDecoration: 'none', fontWeight: '600' }}>
                            {clientName || '(Sin cliente seleccionado)'}
                        </span>
                    </div>

                    {/* Leyenda y Orden de Compra */}
                    <p style={{ margin: '14px 0 10px 0', fontSize: '13px' }}>
                        Se hace entrega del siguiente material:
                    </p>
                    <div style={{ fontSize: '13px', marginBottom: '14px' }}>
                        <span style={{ fontWeight: 'bold' }}>OC: </span>
                        <span style={{ paddingBottom: '2px', minWidth: '150px', display: 'inline-block' }}>
                            {formData.numero_orden_compra || '—'}
                        </span>
                    </div>

                    {/* Conceptos / Materiales como texto normal idéntico al index */}
                    <div style={{ marginTop: '16px' }}>
                        {items && items.length > 0 && items.some(item => item.description.trim() !== '') ? (
                            items.map((item, index) => (
                                <div key={index} style={{ margin: '16px 0' }}>
                                    <p style={{
                                        margin: '0 0 6px 0',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                        color: '#111827',
                                        lineHeight: '1.4'
                                    }}>
                                        {index + 1}- &nbsp;&nbsp; MOD: {item.description || '—'}
                                    </p>
                                    {showProductionOrder && item.productionOrder && (
                                        <p style={{
                                            margin: '4px 0 0 24px',
                                            fontSize: '12.5px',
                                            fontWeight: 'bold',
                                            color: '#111827'
                                        }}>
                                            SERIE #: {item.productionOrder}
                                        </p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p style={{ margin: '14px 0', fontSize: '13px', color: '#94A3B8', fontStyle: 'italic' }}>
                                (Sin material agregado aún)
                            </p>
                        )}
                    </div>

                    {/* Firmas de entrega y recibido */}
                    <div style={{ marginTop: '50px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '24px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', minWidth: '140px' }}>
                                RECIBE CONFORME:
                            </span>
                            <div style={{ flex: 1, borderBottom: '1px solid #000000', height: '18px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '30px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '12px', minWidth: '140px' }}>
                                ENTREGA:
                            </span>
                            <div style={{ flex: 1, borderBottom: '1px solid #000000', height: '18px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
