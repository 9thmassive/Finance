/*import MainDeposit from './components/Deposit/MainDeposit'*/

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

//first row - from Mariam
//<div class="container-fluid" id="form"></div>

//first row - from Mariam
/*ReactDOM.render(<MainDeposit />, document.getElementById("root"));*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
