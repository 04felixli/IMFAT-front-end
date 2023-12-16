// This component renders a gray background for when a pop-up appears on screen - Will replace GrayedBg.tsx

import React, { useEffect } from 'react';

interface Props {
    onClick: () => void;
}

const GrayBg = ({ onClick }: Props) => {

    const handleClick = (): void => {
        onClick();
    }

    useEffect(() => {
        console.log("Gray bg rendered")
    }, [])

    return (
        <div className={'fixed inset-0 bg-gray-600 bg-opacity-50 z-10'} onClick={handleClick}>
        </div>
    );
}

export default GrayBg;
