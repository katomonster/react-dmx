import React from 'react';
import PropTypes from 'prop-types';

const Clap = (props) => {
    return (
        <article className='row three'>
            <span>CLAP</span>
            {props.baseArray.map((elem, i) => <button className="clap simple-button" key={i}  onClick={(e) => props.onClick(e)}>Clap</button> )}
        </article>
    );
}

Clap.propTypes = {
	onClick: PropTypes.func
}

export default Clap;