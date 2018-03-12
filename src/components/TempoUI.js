import React from 'react';
import PropTypes from 'prop-types';

const TempoUI = (props) => {
    return (
        <article className="tempo">
            <input onChange={(e) => props.onChange(e)} value = {props.tempo} />
            <label>TEMPO</label>
        </article>
    );
}

TempoUI.propTypes = {
	onChange: PropTypes.func
}

export default TempoUI;