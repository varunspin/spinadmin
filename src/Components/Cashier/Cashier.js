import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { Table } from 'antd';
import queryString from 'query-string';
import axios from 'axios';

import * as CONST from './const';

const Cashier = props => {
	const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
	const [alertErrorMessage, setAlertErrorMessage] = useState('');
	const [dealerId, setDealerId] = useState('');
	const [fetchingVehicles, setFetchingVehicles] = useState(false);
	const [gateinVehicleTableData, setGateinVehicleTableData] = useState([]);
	const [generattingGatePass, setGenerattingGatePass] = useState([]);

	const removeAlertsAfterDelay = () => {
		setTimeout(() => {
			setAlertErrorMessage('');
			setAlertSuccessMessage('');
		}, 4000);
	};

	const generateGatePass = async grp_txn_id => {
		const newGenerattingGatePass = [...generattingGatePass, grp_txn_id];
		try {
			setGenerattingGatePass(newGenerattingGatePass);
			const reqBody = {
				grp_txn_id,
			};
			// const gatepassRes =
			await axios.post(
				`${`${process.env.REACT_APP_API_BASE_URL}/generagegatepass`}`,
				reqBody
			);
			fetchVehicles();
			setAlertSuccessMessage('Gate Pass Generated Successfully');
			// console.log('generateGatePass-res-', gatepassRes);
		} catch (error) {
			console.error('error-fetchVehicles-', error);
			setAlertErrorMessage('Server down, Try after sometimes');
		} finally {
			setGenerattingGatePass(
				newGenerattingGatePass.filter(i => i !== grp_txn_id)
			);
			removeAlertsAfterDelay();
		}
	};

	const fetchVehicles = async () => {
		try {
			setFetchingVehicles(true);
			const vehicles = await axios.get(
				`${`${process.env.REACT_APP_API_BASE_URL}/gateinvehicles?dealer_id=${dealerId}`}`
			);
			// console.log('fetchvehicles-res-', vehicles);
			const newGateInVehicleTableData = [];
			vehicles?.data?.data?.map((vehicle, vehicleIndex) => {
				const isGenerattingGatePass = generattingGatePass?.includes(
					vehicle.grp_txn_id
				);
				return newGateInVehicleTableData.push({
					sr_no: vehicleIndex + 1,
					vrn: vehicle?.vrn,
					gate_in_time: vehicle?.in_time_fx,
					name: vehicle?.owner_name,
					mobile: vehicle?.owner_mobile,
					gate_pass_time: vehicle?.gate_pass_time ? (
						<Badge bg='secondary' size='sm'>
							Generated
						</Badge>
					) : (
						<Button
							disabled={isGenerattingGatePass}
							onClick={() => generateGatePass(vehicle?.grp_txn_id)}
							size='sm'>
							{isGenerattingGatePass ? 'Generatting' : 'Generate'}
						</Button>
					),
				});
			});
			setGateinVehicleTableData(newGateInVehicleTableData);
		} catch (error) {
			console.error('error-fetchVehicles-', error);
		} finally {
			setFetchingVehicles(false);
		}
	};

	useEffect(() => {
		const parse = queryString.parse(window.location.search);
		const newDealerId = parse?.dealer_id?.trim();
		if (newDealerId) {
			// console.log('selected-dealer-id=', newDealerId);
			setDealerId(newDealerId);
		} else {
			window.open('/', '_self');
		}
	}, []);

	useEffect(() => {
		if (dealerId) {
			fetchVehicles();
		}
		// eslint-disable-next-line
	}, [dealerId]);

	return (
		<div style={{ maxWidth: 800, margin: '0 auto' }}>
			<div style={{ marginTop: 50 }} />
			<h1>Gate In Vehicle List</h1>
			<div style={{ marginTop: 20 }} />
			{fetchingVehicles ? (
				<div style={{ height: 50, width: 50, margin: '0 auto' }}>
					<Spinner animation='border' variant='primary' />
				</div>
			) : null}
			<div style={{ marginTop: 40 }} />
			<Table
				dataSource={gateinVehicleTableData}
				columns={CONST.columnsVehicleInfo}
			/>
			{alertSuccessMessage && (
				<Alert variant='success'>{alertSuccessMessage}</Alert>
			)}
			{alertErrorMessage && <Alert variant='danger'>{alertErrorMessage}</Alert>}
		</div>
	);
};

export default Cashier;
