// import React, { useState, useEffect } from 'react';

// interface Props {
//     isAddExerciseOpen: boolean;
//     setIsAddExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     isConfirmRemoveExerciseOpen: boolean;
//     setIsConfirmExerciseOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const GrayedBg = ({ isAddExerciseOpen, setIsAddExerciseOpen, isConfirmRemoveExerciseOpen, setIsConfirmExerciseOpen }: Props) => {

//     const [arePopUpsOpen, setArePopUpsOpen] = useState<boolean>(false);

//     useEffect(() => {
//         if (isAddExerciseOpen || isConfirmRemoveExerciseOpen) {
//             setArePopUpsOpen(true);
//         } else {
//             setArePopUpsOpen(false);
//         }
//     }, [isAddExerciseOpen, isConfirmRemoveExerciseOpen]);

//     const handleClosePopUps = () => {
//         if (isAddExerciseOpen) {
//             setIsAddExerciseOpen(false);
//         } else if (isConfirmRemoveExerciseOpen) {
//             setIsConfirmExerciseOpen(false);
//         }

//         setArePopUpsOpen(false)
//     }

//     return (
//         <div className={arePopUpsOpen ? 'fixed inset-0 bg-gray-600 bg-opacity-50 z-5' : 'hidden'} onClick={() => handleClosePopUps()}>
//         </div>
//     );
// }

// export default GrayedBg;
