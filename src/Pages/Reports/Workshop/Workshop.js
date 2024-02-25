import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Collapse, DatePicker, Divider } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';

import { getRandomNumber } from 'util/helper';

import * as CONST from './const';
const { RangePicker } = DatePicker;

const Workshop = () => {
	const [visibleColumnsList, setVisibleColumnsList] = useState(
		CONST.defaultVisibleColumnsList
	);
	const [tableData, setTableData] = useState([]);
	const [fetchingWorkshopReport, setFetchingWorkshopReport] = useState(false);
	const [dealerId, setDealerId] = useState('4');
	const [fromDate, setFromDate] = useState(moment().subtract('2000', 'days'));
	const [toDate, setToDate] = useState(moment());

	const fetchWorkshopReport = async () => {
		try {
			setFetchingWorkshopReport(true);
			const workshopReportData = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/analyticsworkshopdaily?dealer_id=${dealerId}&from_date=${fromDate}&to_date=${toDate}`
			);
			console.log('workshopReportData-', { workshopReportData });
			const newTableData = [];
			workshopReportData?.data?.data?.forEach(record => {
				if (record?.date) {
					newTableData.push({
						key: record?.txn_id,
						date: moment(record?.date).format('DD-MM-YYYY'),
						inflow: record?.inflow || 0,
						outflow: record?.outflow || 0,
					});
				}
			});
			setTableData(newTableData);
		} catch (error) {
			console.error('error-report-workshop-', error);
		} finally {
			setFetchingWorkshopReport(false);
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
		fetchWorkshopReport();
		// eslint-disable-next-line
	}, [fromDate, toDate]);

	const columnsOptions = CONST.columns.map(({ dataIndex, title }) => ({
		label: title,
		value: dataIndex,
	}));
	const tableColumns = CONST.columns.map(item => ({
		...item,
		hidden: !visibleColumnsList.includes(item.dataIndex),
	}));
	const tableProps = {
		bordered: true,
		loading: false, // true/false
		size: 'middle', // 'large','middle','small'
		scroll: {
			y: 240,
		},
	};
	const filterData = tableData.map(item => {
		const newItem = {};
		Object.keys(item).forEach(itemKey => {
			if (visibleColumnsList.includes(itemKey)) {
				newItem[itemKey] = item[itemKey];
			}
		});
		return newItem;
	});
	const items = [
		{
			key: '1',
			label: (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Filters</span>
					<div onClick={e => {}}>
						<CSVLink
							data={filterData}
							filename={'my-file' + getRandomNumber() + '.csv'}>
							Download <FileExcelOutlined />
						</CSVLink>
					</div>
				</div>
			),
			children: (
				<div style={{ textAlign: 'left' }}>
					<RangePicker
						defaultValue={[fromDate, toDate]}
						onChange={selectedDate => {
							console.log('onchange-range-', selectedDate);
							if (selectedDate?.length === 2) {
								setFromDate(selectedDate?.[0]);
								setToDate(selectedDate?.[1]);
							}
						}}
					/>
					<Divider />
					<Checkbox.Group
						value={visibleColumnsList}
						options={columnsOptions}
						onChange={value => {
							setVisibleColumnsList(value);
						}}
					/>
				</div>
			),
		},
	];
	console.log('tableData-', { tableData, filterData });
	return (
		<div>
			<Collapse items={items} />
			<Table
				{...tableProps}
				columns={tableColumns}
				dataSource={tableData}
				sticky={true}
				loading={fetchingWorkshopReport}
			/>
		</div>
	);
};
export default Workshop;
