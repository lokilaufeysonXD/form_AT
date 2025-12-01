import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePages } from '@/context/PagesContext';
import styles from '@/styles/Pagination.module.css';

export default function Pagination({ currentPage }) {
    const { totalPages, addPage, deletePage, isLoaded } = usePages();
    const router = useRouter();

    if (!isLoaded) return null;

    const handleAddPage = () => {
        addPage();
    };

    const handleDeletePage = (pageNum, e) => {
        e.preventDefault();
        if (pageNum === 1 || totalPages <= 1) return;

        deletePage(pageNum);

        // Si estamos en la última página y la eliminamos, redirigir a la anterior
        if (currentPage === totalPages && currentPage > 1) {
            if (currentPage === 2) {
                router.push('/');
            } else {
                router.push(`/page/${currentPage - 1}`);
            }
        }
    };

    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            const isActive = currentPage === i;
            const href = i === 1 ? '/' : `/page/${i}`;

            buttons.push(
                <div key={i} className={styles.pageButtonWrapper}>
                    <Link
                        href={href}
                        className={isActive ? styles.active : styles.pageButton}
                    >
                        {i === 1 ? (
                            <span className="material-symbols-sharp" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >home</span>
                        ) : (
                            `Pág ${i}`
                        )}
                    </Link>
                    {i > 1 && totalPages > 1 && (
                        <button
                            onClick={(e) => handleDeletePage(i, e)}
                            className={styles.deleteButton}
                            title={`Eliminar página ${i}`}
                        >
                            ×
                        </button>
                    )}
                </div>
            );
        }

        return buttons;
    };

    return (
        <div className={styles.paginationContainer}>
            <div className={styles.pagination}>
                {renderPageButtons()}
                <button
                    onClick={handleAddPage}
                    className={styles.addButton}
                >
                    + Agregar Página
                </button>
            </div>
        </div>
    );
}
