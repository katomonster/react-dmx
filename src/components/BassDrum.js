import React from 'react';
import PropTypes from 'prop-types';

const BassDrum = (props) => {
    return (
        <article className='row one'>
            <span>BASS</span>
            {props.baseArray.map((elem, i) => <button className="kick simple-button" key={i} onClick={(e) => props.onClick(e)}>Kick</button> )}
        </article>
    );
}

BassDrum.propTypes = {
	onClick: PropTypes.func
}

export default BassDrum;