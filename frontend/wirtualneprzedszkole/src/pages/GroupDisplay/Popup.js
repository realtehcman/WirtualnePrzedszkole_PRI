import React from 'react'
import './Popup.css'

function Popup(props) {

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className="close"> <button class="btn-close" aria-label="Close" onClick={() => props.setTrigger(false)}></button></div>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup