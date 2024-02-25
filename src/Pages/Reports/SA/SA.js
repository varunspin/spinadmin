import React, { useState, useEffect } from 'react';

const SA = props => {
	const [fetchingSARecords, setFetchingSARecords] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setFetchingSARecords(false);
		}, 2000);
	}, []);
	return <div>{fetchingSARecords ? <h1>Loading...</h1> : <h1>SA</h1>}</div>;
};

export default SA;
