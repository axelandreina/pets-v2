import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    // A ref is like I have this piece of something and I need that the same thing back every single time.
    const elRef = useRef(null)

    if (!elRef.current) {
        elRef.current = document.createElement('div');
    }

    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        modalRoot.appendChild(elRef.current);

        // Whenever we return something in a useEffect it will run whenever the component will unmount. (After the component is unmounted from the DOM)
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal;