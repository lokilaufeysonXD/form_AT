import React from 'react'
import Image from 'next/image'
import styles from '@/styles/prueva.module.css'
import TodayDate from '@/components/TodayDate';
import FormNameClient from '@/components/prueva/FormNameClient';
import FormOc from '@/components/prueva/FormOc';
import DescriptionOc from '@/components/prueva/DescriptionOc';
import Print from '@/components/Print';

export default function prueva() {


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Image src="/img/atecno.png" width={150} height={60} alt="logo_atecno" />
                <h1 className={styles.titlePrimaryUnderline}><strong>ACCI TECNOLOGY S.A. DE CV</strong></h1>
            </header>
            <article className={styles.article}>
                <div className={styles.articleinfo}>
                    <p>Cto. Privada Residencial Nichupte. SM 512, MZ-12, LT-06.CP:77534. Cancún.</p>
                    <p>Benito Juarez. Quintana Roo</p>
                    <p>RFC: ATE031119PEA</p>
                    <hr className={styles.hrDividingLine} />
                </div>
                <div>
                    <p>
                        <TodayDate />
                    </p>
                </div>
                <div className={styles.titleCenter}>
                    <h1 className={styles.titlePrimaryUnderline}>ACTA DE ENTREGA</h1>
                </div>
                <FormNameClient />
                <p className={styles.titleSecondary} style={{ marginTop: '10px', marginBottom: '5px' }}>Se hace entrega del siguiente material:</p>
                <FormOc />
                <DescriptionOc />
            </article>

            <footer className={styles.footer}>
                {/* <div className="firm-container"> */}
                <div style={{ display: 'flex', flexDirection: 'column', padding: '5px 46px 10px 46px' }}>
                    <div className="container-align-left">
                        <p className={styles.titleSecondary}>RECIBE CONFORME: </p>
                        <button className={styles.buttonLain}></button>
                        <p className="no-print"></p>
                    </div>
                    <br />
                    <div className="container-align-left">
                        <p className={styles.titleSecondary}>ENTREGA:</p>
                        <button className={styles.buttonLain}></button>
                        <p className="no-print"></p>
                    </div>
                </div>
            </footer>
            <Print />
        </div>
    );
}
