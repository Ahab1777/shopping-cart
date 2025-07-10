import { useEffect } from 'react';
import styles from './Toast.module.css'

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast = ({message, show, onClose, duration = 1500}: ToastProps) => {

    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer)
        }
    }, [show, onClose, duration])

    if (!show) return null;

    return(
        <div 
        className={styles.toast}
        onClick={onClose}
        >{message}</div>
    )
}

export default Toast