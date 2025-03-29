

const Print = () =>{

    const onPrint = () => {
        window.print();
    };


    return (
        <button onClick={onPrint} className="print:hidden ">imprimir</button>
    );
};

export default Print;