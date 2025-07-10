import { useEffect } from 'react';
import styles from './Toast.module.css'

export interface ToastPosition {
    top: number;
    left: number;
    width: number;
}

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
    duration?: number;
    position?: ToastPosition;
}

const Toast = ({message, show, onClose, duration = 1500, position}: ToastProps) => {

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
        style={
                position
                    ? {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                        zIndex: 9999,
                    }
                    : undefined
            }
        >{message}</div>
    )
}

export default Toast