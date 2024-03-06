import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Collapse, DatePicker, Divider } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';
import _ from 'lodash';

import { getRandomNumber } from 'util/helper';

import * as CONST from './const';
import './SA.scss';

const { RangePicker } = DatePicker;

const SA = () => {
	const [visibleColumnsList, setVisibleColumnsList] = useState(
		CONST.defaultVisibleColumnsList
	);
	const [tableData, setTableData] = useState([]);
	const [fetchingSAReport, setFetchingSAReport] = useState(false);
	const [dealerId, setDealerId] = useState('');
	const [fromDate, setFromDate] = useState(moment().subtract('15', 'days'));
	const [toDate, setToDate] = useState(moment());
	// const [saFilterList, setSaFilterList] = useState([]);
	// const [filters, setFilters] = useState({});
	const [filterReportData, setFilterReportData] = useState([]);
	const [tableColumns, setTableColumns] = useState(CONST.columns);

	const fetchSAReport = async () => {
		try {
			setFetchingSAReport(true);
			const saReportData = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/analyticssadaily?dealer_id=${dealerId}&from_date=${fromDate}&to_date=${toDate}`
			);
			console.log('saReportData-', { saReportData });
			const newTableData = [];
			const newSaFilterList = [];
			saReportData?.data?.data?.forEach((record, record_index) => {
				if (record?.date) {
					newTableData.push({
						key: record?.txn_id,
						sr_no: record_index + 1,
						...record,
						date: moment(record?.date).format('DD-MM-YYYY'),
					});
					if (!newSaFilterList.includes(record.sa_name)) {
						newSaFilterList.push(record.sa_name);
					}
				}
			});
			const newTableColumns = _.cloneDeep(CONST.columns);
			newTableColumns[newTableColumns.length - 1].filters = newTableColumns.map(
				col => {
					if (col.dataIndex === 'sa_name') {
						col.filters = newSaFilterList.map(sa_name => {
							return { text: sa_name, value: sa_name };
						});
					}
					return col;
				}
			);
			setTableData(newTableData);
			setFilterReportData(newTableData);
			setTableColumns(newTableColumns);
			// setSaFilterList(newSaFilterList);
		} catch (error) {
			console.error('error-report-sa-', error);
		} finally {
			setFetchingSAReport(false);
		}
	};

	useEffect(() => {
		if ((dealerId && fromDate, toDate)) {
			fetchSAReport();
		}
		// eslint-disable-next-line
	}, [dealerId, fromDate, toDate]);

	useEffect(() => {
		const parse = queryString.parse(window.location.search);
		const newDealerId = parse?.dealer_id?.trim();
		if (newDealerId) {
			// console.log('selected-dealer-id=', newDealerId);
			setDealerId(newDealerId);
		} else {
			window.open('/', '_self');
		}
		// eslint-disable-next-line
	}, []);

	const columnsOptions = tableColumns.map(({ dataIndex, title }) => ({
		label: title,
		value: dataIndex,
	}));

	const tableProps = {
		bordered: true,
		loading: false, // true/false
		size: 'middle', // 'large','middle','small'
		scroll: {
			y: 240,
		},
	};

	const items = [
		{
			key: '1',
			label: (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span>Filters</span>
					<div>
						<CSVLink
							data={CONST.filterTableData({
								filterReportData,
								visibleColumnsList,
							})}
							filename={'my-file' + getRandomNumber() + '.csv'}
							// asyncOnClick={true}
							// onClick={async (event, done) => {
							// 	const newFilterReportData = CONST.filterTableData({
							// 		tableData,
							// 		visibleColumnsList,
							// 		filters,
							// 	});
							// 	setFilterReportData(newFilterReportData);
							// 	await sleep(5000);
							// }}
						>
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
							// console.log('onchange-range-', selectedDate);
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
						onChange={newVisibleColumnsList => {
							const newTableColumns = [];
							tableColumns.forEach(item => {
								const newItem = _.cloneDeep(item);
								newTableColumns.push({
									...newItem,
									hidden: !newVisibleColumnsList.includes(item.dataIndex),
								});
							});
							console.log({
								tableColumns,
								newTableColumns,
								newVisibleColumnsList,
							});
							setTableColumns(newTableColumns);
							setVisibleColumnsList(newVisibleColumnsList);
						}}
					/>
				</div>
			),
		},
	];
	// console.log('tableData-', { tableData, filterReportData });
	return (
		<div className='ReportsSA'>
			<Collapse items={items} />
			<div style={{ height: 20 }} />
			<Table
				{...tableProps}
				columns={tableColumns}
				dataSource={tableData}
				sticky={true}
				loading={fetchingSAReport}
				onChange={(pagination, filters, sort, extra) => {
					// console.log('ontablechange-', { pagination, filters, sort, extra });
					// setFilters(filters);
					setFilterReportData(extra?.currentDataSource || []);
				}}
			/>
		</div>
	);
};
export default SA;
