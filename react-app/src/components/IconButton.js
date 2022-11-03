import React from "react";

const IconButton = ({ iconName, label, onClick }) => {
    return (
        <button className="ui button" onClick={ onClick }>
            <i className={`icon-left ${iconName} icon`} />
            { label }
        </button>
    )
}

export default IconButton