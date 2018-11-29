import React from 'react';
import './App.css';
import plus from './images/plus.svg'
import minus from './images/minus.svg'

const Counter = (props) => {
  return (
    <div className="app-counter">
      <button
        className="app-button"
        onClick={props.onPlus}>
        <img
          alt="plus"
          src={plus}
        />
      </button>
      <input
        className="app-input"
        disabled
        max="3"
        value={props.value}
      />
      <button
        className="app-button"
        onClick={props.onMinus}
      >
        <img
          alt="minus"
          src={minus}
        />
      </button>
    </div>
  );
}

export default Counter;
