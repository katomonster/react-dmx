import React from 'react';
import PropTypes from 'prop-types';

const SnareDrum = (props) => {
    return (
        <article className='row two'>
            <span>SNARE</span>
            {props.baseArray.map((elem, i) => <button className="snare simple-button" key={i}  onClick={(e) => props.onClick(e)}>Snare</button> )}
        </article>
    );
}

SnareDrum.propTypes = {
	onClick: PropTypes.func
}

export default SnareDrum;
