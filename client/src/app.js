import React  from "react";
import ReactDOM  from "react-dom";
import Main from './components/Main.js';
import 'normalize.css/normalize.css';
import './styles/style.scss';


const jsx = (
	<Main />
);

ReactDOM.render(jsx,document.getElementById('app'))
