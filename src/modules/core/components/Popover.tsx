import React, { FC, useEffect, useRef, useState } from 'react';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    content: React.ReactNode;
}

const Popover: FC<PopupProps> = ({ open: show, onClose, children, content }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [popoverStyles, setPopoverStyles] = useState({});
    const referenceRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const updatePopoverPosition = () => {
        if (!referenceRef.current || !popoverRef.current) return;

        const refRect = referenceRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();

        let top = refRect.bottom;
        let left = refRect.left;

        if (top + popoverRect.height < window.innerHeight) {
            top = refRect.height
        } else {
            top = -1 * popoverRect.height
        }

        if (left + popoverRect.width < window.innerWidth) {
            left = 0
        } else {
            left = -1 * (popoverRect.width - refRect.width)
        }

        setPopoverStyles({
            position: 'absolute',
            top: top,
            left: left + window.scrollX,
            zIndex: 1000,
        });
    };

    useEffect(() => {
        if (show) {
            updatePopoverPosition();
            window.addEventListener('resize', updatePopoverPosition);
            window.addEventListener('scroll', updatePopoverPosition);
        }
        return () => {
            window.removeEventListener('resize', updatePopoverPosition);
            window.removeEventListener('scroll', updatePopoverPosition);
        };
    }, [show]);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, onClose]);

    return (
        <div className='relative inline-block w-full'>
            <div ref={referenceRef}>
                {children}
            </div>
            {show && (
                <div ref={popoverRef} style={popoverStyles}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Popover;
