

const Print = () =>{

    const onPrint = () => {
        window.print();
    };


    return (
        <button onClick={onPrint} className="print:hidden " id="print-button"></button>
    );
};

export default Print;