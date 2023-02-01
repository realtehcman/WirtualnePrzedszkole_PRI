import Popup from './Popup';
import { useState } from "react";
import './abc.css'

function App() {
    const [buttonPopup, setButtonPopup] = useState(false)

    return(
        <div className="App">
            <main>
                <button class="btn btn-info" onClick={() => setButtonPopup(true)}>zobacz</button>
            </main>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h2>niewiem</h2>
                <p>asfdusdbfhuhdf</p>
            </Popup>
        </div>
    );
}


export default App




