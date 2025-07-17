import styles from './ConfirmationModal.module.css'
import { createPortal } from 'react-dom';

interface ConfirmationModalProps {
    product: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

const ConfirmationModal = ({product, isModalOpen, setIsModalOpen, onClose}: ConfirmationModalProps) => {


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

    return (
        <>
        {isModalOpen ? 
            createPortal(
                <div
                className={styles.backdrop} 
                onClick={handleCancel}
                aria-label="Close confirmation modal"
                >
                    <div className={styles.modal} aria-modal="true" role="dialog" aria-label={`Remove ${product} from your cart`}>
                        <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        aria-label="Cancel and close modal"
                        >X</button>
                        <div
                        className={styles.message}
                        >Remove <span>{product}</span> from your cart?</div>
                        <button
                        className={styles.confirmButton}
                        onClick={handleConfirmation}
                        aria-label="Confirm removal"
                        >Confirm</button>
                    </div>
                </div>,
                document.body
            )

         : null}
        </>
    )
}

export default ConfirmationModal