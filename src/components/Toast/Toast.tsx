import { useEffect, useState } from 'react';
import styles from './Toast.module.css'

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
    duration?: number;
}

const Toast = ({message, show, onClose, duration = 1500}: ToastProps) => {
    const [visible, setVisible] = useState<boolean>(show)
    //Ensure duration provides time for animation to happen
    const minDuration = 1000;
    const effectiveDuration = Math.max(duration, minDuration)

    useEffect(() => {
        if(show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, effectiveDuration + 100);
            return () => clearTimeout(timer);
        }
    }, [show, effectiveDuration])

    useEffect(() => {
        if (!visible && show) {
            const timer = setTimeout(onClose, 1900);//match hideToast duration
            return () => clearTimeout(timer)
        }
    }, [visible, show, onClose])

    if (!show && !visible) return null;

    return(
        <div 
            className={`
                ${styles.toast} 
                ${visible ? styles.show : styles.hide}
            `}
            onClick={onClose}
            aria-label="Notification"
        >
            {message}
        </div>
    )
}

export default Toast