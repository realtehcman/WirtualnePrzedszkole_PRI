import React from 'react'
import './Popup_user.css'

function Popup_user(props) {

    return (props.trigger) ? (
        <div data-testid="Popup_user" className="Popup_user">
            <div data-testid="Popup_user-inner" className="Popup_user-inner">
                <div data-testid="Popup_user_close" className="Popup_user_close"> <button data-testid="btn-close" className="btn-close" aria-label="Close" onClick={() => props.setTrigger(false)}></button></div>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup_user;