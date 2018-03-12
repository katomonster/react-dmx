import React from 'react';
import PropTypes from 'prop-types';

const SwingUI = (props) => {
    const swingClass = props.swing ? 'active' : '';
    return (
        <article className="swing top-btn">
            <button onClick={(e) => props.onClick(e)} className={swingClass}>SWING</button>
            <span>SWING</span>
        </article>
    );
}

SwingUI.propTypes = {
	onClick: PropTypes.func
}

export default SwingUI;