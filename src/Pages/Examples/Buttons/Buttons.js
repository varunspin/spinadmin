import React from 'react';
import Mui from './Mui';
import Antd from './Antd';
import Bootstrap from './Bootstrap';
// import Chakra from './Chakra';
import Semantic from './Semantic';

const Buttons = props => {
	return (
		<div>
			<h1>Button Examples</h1>
			<Mui />
			<Antd />
			<Bootstrap />
			{/* <Chakra /> */}
			<Semantic />
		</div>
	);
};

export default Buttons;
