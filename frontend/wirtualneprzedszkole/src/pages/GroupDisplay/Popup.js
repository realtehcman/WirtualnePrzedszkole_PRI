import React from 'react'
import './Popup.css'

function Popup(props) {

    return (props.trigger) ? (
        <div data-testid="popup" className="popup">
            <div data-testid="popup-inner" className="popup-inner">
                <div data-testid="close" className="close"> <button data-testid="btn-close" className="btn-close" aria-label="Close" onClick={() => props.setTrigger(false)}></button></div>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup
