import React from 'react';
import PropTypes from 'prop-types';

const StartStopUI = (props) => {
    return (
        <article className="start-stop top-btn">
            <button onClick={(e) => props.onClick(e)} className={props.isPlaying ? "active" : ""}>START/STOP</button>
            <span>START/STOP</span>
        </article>
    );
}

StartStopUI.propTypes = {
	onClick: PropTypes.func
}

export default StartStopUI;