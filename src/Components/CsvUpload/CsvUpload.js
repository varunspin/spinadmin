import React, { useState, useEffect } from 'react';
// import { JSONTree } from 'react-json-tree';
import { useCSVReader } from 'react-papaparse';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { Table } from 'antd';
import DownloadIcon from '@mui/icons-material/Download';
import queryString from 'query-string';
import axios from 'axios';

// import { sleep } from 'util/helper';
import * as CONST from './const';
import sampleCustomerInformationUploadCsv from 'assets/csv/SampleCustomerInformationUploadCsv.csv';

export default function CSVReader() {
	// const [parseJson, setParseJson] = useState(null);
	const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
	const [alertErrorMessage, setAlertErrorMessage] = useState('');
	const [dealerId, setDealerId] = useState('');
	const [uploadingCustomerInfo, setUploadingCustomerInfo] = useState(false);
	const [customerInfoTableData, setCustomerInfoTableData] = useState([]);
	const { CSVReader } = useCSVReader();

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

	const removeAlertsAfterDelay = () => {
		setTimeout(() => {
			setAlertErrorMessage('');
			setAlertSuccessMessage('');
		}, 4000);
	};

	const uploadCustomerInfo = async results => {
		try {
			setUploadingCustomerInfo(true);

			if (!dealerId) {
				setAlertErrorMessage('Invalid session, please login and try again');
				removeAlertsAfterDelay();
				return;
			}

			if (!results?.data || results?.data?.length <= 0) {
				setAlertErrorMessage('Invalid File');
				removeAlertsAfterDelay();
				return;
			}

			const newCustomerInfoTableData = [];
			results?.data?.map((customer, customerIndex) => {
				if (customerIndex === 0) return null;
				if (customer?.length <= 1) return null;
				// console.log('customer-', customer);
				newCustomerInfoTableData.push({
					key: `${customerIndex}`,
					sr_no: `${customerIndex}`,
					vrn: customer?.[1]?.trim() || '',
					model: customer?.[2]?.trim() || '',
					name: customer?.[3]?.trim() || '',
					mobile: customer?.[4]?.trim() || '',
				});
				return null;
			});

			const reqBody = {
				dealer_id: dealerId,
				vehicles: newCustomerInfoTableData,
			};
			// console.log('uploadCustomerInfoReqBody-', { reqBody });
			try {
				// const uploadCustomerInfoRes =
				await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/uploadCustomerInfo`,
					reqBody
				);
				setCustomerInfoTableData(newCustomerInfoTableData);
				setAlertSuccessMessage('Customer Information Uploaded Successfully');
				removeAlertsAfterDelay();
			} catch (error) {
				console.error('E00003', error);
				setAlertErrorMessage('Server down, Try after sometimes');
				removeAlertsAfterDelay();
				// console.log('uploadCustomerInfoRes-', {
				// 	uploadCustomerInfoRes: uploadCustomerInfoRes?.data,
				// });
			}
			// setParseJson(results?.data);
		} catch (error) {
			console.error('E00001', error);
			setAlertErrorMessage(
				'Invalid file, Please refer sample CSV and upload again'
			);
			setTimeout(() => {
				setAlertErrorMessage('');
			}, 4000);
		} finally {
			setUploadingCustomerInfo(false);
		}
	};

	return (
		<div style={{ maxWidth: 800, margin: '0 auto' }}>
			<div style={{ marginTop: 50 }} />
			<h1>Upload Customer Details (.csv)</h1>
			<div style={{ marginTop: 20 }} />
			<h4>
				<a
					href={sampleCustomerInformationUploadCsv}
					download='SampleCustomerInformationUploadCsv'>
					<Button variant='link'>
						<DownloadIcon /> Download Sample CSV File
					</Button>
				</a>
			</h4>
			<div style={{ marginTop: 20 }} />
			<CSVReader
				onUploadAccepted={results => {
					uploadCustomerInfo(results);
				}}
				onUploadRejected={error => {
					console.error('E00002', error);
					setAlertErrorMessage(
						'Invalid file, Please refer sample CSV and upload again'
					);
					setTimeout(() => {
						setAlertErrorMessage('');
					}, 4000);
				}}>
				{({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => {
					const removeProps = getRemoveFileProps();
					const { onClick: onRemoveClick, ...rest } = removeProps;
					return (
						<>
							<div style={CONST.styles.csvReader}>
								<Button {...getRootProps()} style={CONST.styles.browseFile}>
									Browse file
								</Button>
								<div style={CONST.styles.acceptedFile}>
									{acceptedFile && acceptedFile.name}
								</div>
								<Button
									variant='secondary'
									{...rest}
									onClick={e => {
										onRemoveClick(e);
										setCustomerInfoTableData([]);
									}}
									style={CONST.styles.remove}>
									Remove
								</Button>
							</div>
							<ProgressBar style={CONST.styles.progressBarBackgroundColor} />
						</>
					);
				}}
			</CSVReader>
			<div style={{ marginTop: 20 }} />
			{uploadingCustomerInfo ? (
				<div style={{ height: 50, width: 50, margin: '0 auto' }}>
					<Spinner animation='border' variant='primary' />
				</div>
			) : null}
			{alertSuccessMessage && (
				<Alert variant='success'>{alertSuccessMessage}</Alert>
			)}
			{alertErrorMessage && <Alert variant='danger'>{alertErrorMessage}</Alert>}
			{/* {parseJson && <JSONTree data={parseJson} />} */}
			<div style={{ marginTop: 40 }} />
			<Table
				dataSource={customerInfoTableData}
				columns={CONST.columnsCustomerInfo}
			/>
		</div>
	);
}
