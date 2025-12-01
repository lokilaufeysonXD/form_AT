import { createContext, useContext, useState, useEffect } from 'react';

const PagesContext = createContext();

export function PagesProvider({ children }) {
    const [totalPages, setTotalPages] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cargar páginas desde localStorage al iniciar
    useEffect(() => {
        const savedPages = localStorage.getItem('totalPages');
        if (savedPages) {
            setTotalPages(parseInt(savedPages, 10));
        }
        setIsLoaded(true);
    }, []);

    // Guardar páginas en localStorage cuando cambien
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('totalPages', totalPages.toString());
        }
    }, [totalPages, isLoaded]);

    const addPage = () => {
        setTotalPages(prev => prev + 1);
    };

    const deletePage = (pageNumber) => {
        // No permitir eliminar la primera página
        if (pageNumber === 1 || totalPages <= 1) return;

        setTotalPages(prev => prev - 1);
    };

    const getTotalPages = () => totalPages;

    return (
        <PagesContext.Provider value={{
            totalPages,
            addPage,
            deletePage,
            getTotalPages,
            isLoaded
        }}>
            {children}
        </PagesContext.Provider>
    );
}

export function usePages() {
    const context = useContext(PagesContext);
    if (!context) {
        throw new Error('usePages must be used within a PagesProvider');
    }
    return context;
}
