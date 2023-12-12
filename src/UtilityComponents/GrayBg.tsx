// This component renders a gray background for when a pop-up appears on screen - Will replace GrayedBg.tsx

import React from 'react';

interface Props {
    onClick: () => void;
}

const GrayBg = ({ onClick }: Props) => {

    const handleClick = () => {
        onClick();
    }

    return (
        <div className={'fixed inset-0 bg-gray-600 bg-opacity-50 z-10'} onClick={handleClick}>
        </div>
    );
}

export default GrayBg;
