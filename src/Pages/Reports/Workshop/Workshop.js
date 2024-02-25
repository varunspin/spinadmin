import React, { useEffect, useState } from 'react';
import { Table, Checkbox, Collapse } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import moment from 'moment';

import { getRandomNumber } from 'util/helper';

import * as CONST from './const';

const Workshop = () => {
	const [visibleColumnsList, setVisibleColumnsList] = useState(
		CONST.defaultVisibleColumnsList
	);
	const [tableData, setTableData] = useState([]);
	const [fetchingWorkshopReport, setFetchingWorkshopReport] = useState(false);

	const fetchWorkshopReport = async () => {
		try {
			setFetchingWorkshopReport(true);
			const workshopReportData = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/analyticsworkshopdaily?dealer_id=4&from_date=01-01-2019&to_date=01-01-2024`
			);
			console.log('workshopReportData-', { workshopReportData });
			const newTableData = [];
			workshopReportData?.data?.data?.forEach(record => {
				if (record?.date) {
					newTableData.push({
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
		fetchWorkshopReport();
	}, []);

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
					<span>Filter Columns</span>
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
