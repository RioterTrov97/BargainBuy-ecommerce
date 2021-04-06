import React from 'react';
import '../styles/InlineLoader.scss';

const InlineSpinner = () => {
	return (
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default InlineSpinner;
