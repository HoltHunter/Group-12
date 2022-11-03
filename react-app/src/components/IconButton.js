import React from "react";

const IconButton = ({ iconName, label, onClick }) => {
    return (
        <div>
            <button className="ui button" onClick={ onClick }>
                <i className={`icon-left ${iconName} icon`} />
                { label }
            </button>
        </div>
    )
}

export default IconButton