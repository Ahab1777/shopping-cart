import styles from './ConfirmationModal.module.css'

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
        {isModalOpen ? (
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
            </div>

        ) : null}
        </>)
}

export default ConfirmationModal