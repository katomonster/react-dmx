import React from 'react';
import PropTypes from 'prop-types';

const PatternUI = (props) => {
    return (
        <article className="toggle-pattern top-btn">
            <button className="active" onClick={(e) => props.onClick(e)}>PATTERN</button>
            <span>PATTERN</span>
        </article>
    );
}

PatternUI.propTypes = {
	onClick: PropTypes.func
}

export default PatternUI;