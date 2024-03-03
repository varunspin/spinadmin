import React, { useState } from 'react';
import { Space, Table, Checkbox, Collapse } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { getRandomNumber } from 'util/helper';
const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Age',
		dataIndex: 'age',
		sorter: (a, b) => a.age - b.age,
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		filters: [
			{
				text: 'London',
				value: 'London',
			},
			{
				text: 'New York',
				value: 'New York',
			},
		],
		onFilter: (value, record) => record.address.indexOf(value) === 0,
		key: 'address',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		sorter: true,
		render: () => <Space size='middle'>Delete</Space>,
		key: 'action',
	},
];
const tableData = [];
for (let i = 1; i <= 10; i++) {
	tableData.push({
		key: i,
		name: 'John Brown',
		age: Number(`${i}2`),
		address: `New York No. ${i} Lake Park`,
		description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
	});
}
const defaultVisibleColumnsList = columns.map(item => item.dataIndex);
const Workshop = () => {
	const [visibleColumnsList, setVisibleColumnsList] = useState(
		defaultVisibleColumnsList
	);
	const columnsOptions = columns.map(({ dataIndex, title }) => ({
		label: title,
		value: dataIndex,
	}));
	const tableColumns = columns.map(item => ({
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
							// console.log('onchange-', { defaultVisibleColumnsList, value });
							setVisibleColumnsList(value);
						}}
					/>
				</div>
			),
		},
	];
	// console.log('tableData-', { tableData, filterData });
	return (
		<div>
			<Collapse items={items} />
			<Table
				{...tableProps}
				columns={tableColumns}
				dataSource={tableData}
				sticky={true}
			/>
		</div>
	);
};
export default Workshop;
