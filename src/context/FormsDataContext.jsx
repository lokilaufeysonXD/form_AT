import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FormsDataContext = createContext();

export function FormsDataProvider({ children }) {
    const [pagesData, setPagesData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Cargar datos desde localStorage al iniciar
    useEffect(() => {
        const savedData = localStorage.getItem('pagesFormsData');
        if (savedData) {
            try {
                setPagesData(JSON.parse(savedData));
            } catch (error) {
                console.error('Error loading forms data:', error);
            }
        }
        setIsLoaded(true);
    }, []);

    // Obtener datos de una página específica
    const getPageData = useCallback((pageNum) => {
        const defaultData = {
            formNameClient: {
                selectedOption: 'nombre del cliente'
            },
            formOc: {
                ocValue: '',
                displayedOC: ''
            },
            descriptionOc: {
                descriptions: [{ id: 1, text: '', input: '' }],
                descriptionsSerie: [{ id: 1, text: '', input: '' }]
            }
        };

        // Si no existe data para esta página, retornar default
        if (!pagesData[pageNum]) {
            return defaultData;
        }

        // Si existe, asegurarse de que tenga todas las propiedades
        return {
            formNameClient: pagesData[pageNum].formNameClient || defaultData.formNameClient,
            formOc: pagesData[pageNum].formOc || defaultData.formOc,
            descriptionOc: pagesData[pageNum].descriptionOc || defaultData.descriptionOc
        };
    }, [pagesData]);

    // Actualizar datos de una página específica
    const updatePageData = useCallback((pageNum, field, value) => {
        setPagesData(prev => ({
            ...prev,
            [pageNum]: {
                ...prev[pageNum],
                [field]: value
            }
        }));
    }, []);

    // Guardar en localStorage cuando cambien los datos
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('pagesFormsData', JSON.stringify(pagesData));
        }
    }, [pagesData, isLoaded]);

    // Limpiar datos de una página específica
    const clearPageData = useCallback((pageNum) => {
        setPagesData(prev => {
            const newData = { ...prev };
            delete newData[pageNum];
            localStorage.setItem('pagesFormsData', JSON.stringify(newData));
            return newData;
        });
    }, []);

    return (
        <FormsDataContext.Provider value={{
            getPageData,
            updatePageData,
            clearPageData,
            isLoaded
        }}>
            {children}
        </FormsDataContext.Provider>
    );
}

export function useFormsData() {
    const context = useContext(FormsDataContext);
    if (!context) {
        throw new Error('useFormsData must be used within a FormsDataProvider');
    }
    return context;
}
