import React from 'react'
import styles from '@/styles/ControlPanel.module.css'
import ControlPanelHeader from './ControlPanelDocumentos/ControlPanelHeader'
import ControlPanelFilter from './ControlPanelDocumentos/ControlPanelFilter'
import ControlPanelContent from './ControlPanelDocumentos/ControlPanelContent'

function ControlPanelPageDocumentos() {
    return (
        <>
            <ControlPanelHeader />
            <ControlPanelFilter />
            <ControlPanelContent />
        </>
    )
}

export default ControlPanelPageDocumentos
