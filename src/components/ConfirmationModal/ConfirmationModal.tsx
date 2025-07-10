import styles from './ConfirmationModal.module.css'
import { createPortal } from 'react-dom';

interface ConfirmationModalProps {
    confirmationMessage: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

const ConfirmationModal = ({confirmationMessage, isModalOpen, setIsModalOpen, onClose}: ConfirmationModalProps) => {


    function handleCancel(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(false);
    }

    function handleConfirmation(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        onClose()
        setIsModalOpen(false);
    }

    return(
        <>
        {isModalOpen ? 
            createPortal(
                <div
                className={styles.backdrop} 
                onClick={handleCancel}>
                    <div className={styles.modal}>
                        <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        >X</button>
                        <div
                        className={styles.message}
                        >{confirmationMessage}</div>
                        <button
                        className={styles.confirmButton}
                        onClick={handleConfirmation}
                        >Confirm</button>
                    </div>
                </div>,
                document.body
            )

         : null}
        </>)
}

export default ConfirmationModal