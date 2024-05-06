import React from "react";
import '../styles/header.css'

export const Square = ({ customStyle, upgradeEvent, info }) => {
  const handleClick = () => {
    upgradeEvent();
  };

  return (
    <div className={`${customStyle}`} onClick={handleClick}> 
      <p>{info}</p>
    </div>
  );
};
