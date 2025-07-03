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

    return(
        <>
        {isModalOpen ? (
            <div
            className={styles.backdrop} 
            onClick={handleCancel}>
                <div className={styles.modal}>
                    <div>{confirmationMessage}</div>
                    <button
                    onClick={handleCancel}
                    >X</button>
                    <button
                    onClick={onClose}
                    >Confirm</button>
                </div>
            </div>

        ) : null}
        </>
}

export default ConfirmationModal