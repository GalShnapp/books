import {createPortal} from 'react-dom';
import { useEffect, useRef } from 'react';

export default function Modal({children, open, className='', onClose}) {
    const dialog = useRef();
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }

        return () => {
            modal.close();
        }

    }, [open])

    return createPortal(
        <dialog onClose={onClose} ref={dialog} className={`modal ${className}`}>{children}</dialog>,
        document.getElementById('modal')
    );
}