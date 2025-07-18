import { useEffect, useState } from 'react';
import styles from './Toast.module.css'

interface ToastProps {
    message: string;
    isToastOpen: boolean;
    onClose: () => void;
    duration?: number;
}

const HIDE_ANIMATION_DURATION = 300;//ms

const Toast = ({message, isToastOpen, onClose, duration = 1500}: ToastProps) => {
    const [shouldRender, setShouldRender] = useState<boolean>(isToastOpen)
    //Ensure duration provides time for animation to happen
    const minDuration = 1000;
    const effectiveDuration = Math.max(duration, minDuration)


    useEffect(() => {
        if (isToastOpen) {
            setShouldRender(true)
            const timer = setTimeout(onClose, effectiveDuration);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => setShouldRender(false), HIDE_ANIMATION_DURATION);
            return () => clearTimeout(timer);
        }
    },[isToastOpen, effectiveDuration, onClose]);

    if (!shouldRender) return null;

    return(
        <div 
            className={`
                ${styles.toast} 
                ${isToastOpen ? styles.show : styles.hide}
            `}
            onClick={onClose}
            aria-label="Notification"
        >
            {message}
        </div>
    )
}

export default Toast