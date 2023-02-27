import React from 'react';
import './Popup.css';

function Popup(props) {
    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close" onClick={() => props.setTrigger(false)}>
                    ×
                </button>
                {props.children}
            </div>
        </div>
    ) : null;
}

export default Popup;