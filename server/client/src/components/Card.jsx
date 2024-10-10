import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, navigateTo }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (navigateTo) {
            navigate(navigateTo);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
        }
    };

  return (
    <div
    onClick={handleClick}
    onKeyDown={handleKeyDown}
    role="button"
    tabIndex="0"
    className="grid w-32 h-20 sm:w-40 sm:h-24 rounded-md border-2 border-soild bg-amber-100 border-red-50"
    >
      <h3 className="font-serif text-base leading-5 sm:text-lg text-center place-self-center">{title}</h3>
    </div>

  );
}

export default Card;
