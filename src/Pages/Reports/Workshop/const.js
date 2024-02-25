export const columns = [
	{
		title: 'Date',
		dataIndex: 'date',
		sorter: (a, b) => a.date - b.date,
	},
	{
		title: 'Inflow',
		dataIndex: 'inflow',
		sorter: (a, b) => a.inflow - b.inflow,
	},
	{
		title: 'Outflow',
		dataIndex: 'outflow',
		sorter: (a, b) => a.outflow - b.outflow,
	},
];

export const defaultVisibleColumnsList = columns.map(item => item.dataIndex);
