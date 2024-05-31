import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const Html = (props) => {
	const [start, change] = useState(0);
	const show = () => {
		change(start + props.n);
	};
	return (
		<div>
			{props.array.slice(0, start + props.n).map((item) => (
				<p>{item}</p>
			))}
			{start + props.n < props.array.length && (
				<button onClick={show}>Показать ещё</button>
			)}
		</div>
	);
};

const App = () => {
	const array = [
		'1 элемент',
		'2 элемент',
		'3 элемент',
		'4 элемент',
		'5 элемент',
		'6 элемент',
		'7 элемент',
		'8 элемент',
		'9 элемент',
		'10 элемент'
	];
	return (
	<div>
		<h1>Список элементов</h1>
		<Html array={array} n={3} />
	</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App/>
	</React.StrictMode>
);

reportWebVitals();