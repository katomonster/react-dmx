import React from 'react';
import PropTypes from 'prop-types';

const OpenHat = (props) => {
    return (
        <article className='row five'>
            <span>HI-HAT B</span>
            {props.baseArray.map((elem, i) => <button className="ophat simple-button" key={i} onClick={(e) => props.onClick(e)}>Opened Hat</button> )}
        </article>
    );
}

OpenHat.propTypes = {
	onClick: PropTypes.func
}

export default OpenHat;
