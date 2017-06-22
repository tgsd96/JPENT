import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UploadFile from './uploadFile';
import  AllPurchases from './AllPurchases';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let comp = [
    "mar", "col", "marg", "cad", "god"
]

let style = {
    backgroundColor : "#3e3e3e",
    padding : "15px"
}

ReactDOM.render(<div>
    <UploadFile style={style} company={comp}/>
    <AllPurchases />
</div>, document.getElementById('root'));
registerServiceWorker();
