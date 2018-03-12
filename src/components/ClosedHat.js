import React from 'react';
import PropTypes from 'prop-types';

const ClosedHat = (props) => {
    return (
        <article className='row four'>
            <span>HI-HAT A</span>
            {props.baseArray.map((elem, i) => <button className="clhat  simple-button" key={i}  onClick={(e) => props.onClick(e)}>Closed Hat</button> )}
        </article>
    );
}

ClosedHat.propTypes = {
	onClick: PropTypes.func
}

export default ClosedHat;