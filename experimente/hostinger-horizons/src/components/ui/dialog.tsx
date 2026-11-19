import {
    createContext,
    useContext,
    useEffect,
    type ReactNode,
    type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';

const DialogContext = createContext<{
    open: boolean;
    onOpenChange?: (value: boolean) => void;
}>({ open: false });

export function Dialog({
    open = false,
    onOpenChange,
    children,
}: {
    open?: boolean;
    onOpenChange?: (value: boolean) => void;
    children: ReactNode;
}) {
    return (
        <DialogContext.Provider value={{ open, onOpenChange }}>
            {children}
        </DialogContext.Provider>
    );
}

export function DialogContent({
    children,
    className = '',
    style,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { open, onOpenChange } = useContext(DialogContext);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onOpenChange?.(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onOpenChange]);

    if (!open) return null;

    return createPortal(
        <div
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onOpenChange?.(false);
                }
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(0, 0, 0, 0.55)',
                display: 'grid',
                placeItems: 'center',
                padding: 16,
            }}
        >
            <div
                {...props}
                role="dialog"
                aria-modal="true"
                className={className}
                style={{
                    background: 'white',
                    color: '#242033',
                    borderRadius: 18,
                    padding: 24,
                    position: 'relative',
                    width: 'min(100%, 680px)',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    ...style,
                }}
            >
                <button
                    type="button"
                    aria-label="Închide"
                    onClick={() => onOpenChange?.(false)}
                    style={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        border: 0,
                        background: 'transparent',
                        fontSize: 24,
                        cursor: 'pointer',
                    }}
                >
                    ×
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
}

export function DialogTitle({
    children,
    ...props
}: HTMLAttributes<HTMLHeadingElement>) {
    return <h2 {...props}>{children}</h2>;
}

export function DialogDescription({
    children,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return <p {...props}>{children}</p>;
}