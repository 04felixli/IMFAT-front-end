import React, { useState } from 'react';
import GrayBg from './GrayBg';

interface Props {
    set_number: number;
    isCompleted: boolean;
}

const SetButtonDropDown = ({ set_number, isCompleted }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className={`rounded focus:outline-none w-8 z-50 ${isCompleted ? 'bg-green-100' : 'bg-gray-200'}`}
                    onClick={toggleMenu}
                >
                    {set_number}
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="origin-top-left absolute left-0 -mt-7 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <button className="rounded-md py-1 block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 text-xs">
                            Delete
                        </button>
                    </div>

                    <GrayBg onClick={toggleMenu} />
                </>
            )}
        </div>
    );
};

export default SetButtonDropDown;
