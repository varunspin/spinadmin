export const columns = [
	{
		title: '#',
		dataIndex: 'sr_no',
		sorter: (a, b) => a.sr_no - b.sr_no,
		width: '100px',
		className: 'tbl_sa_td',
	},
	{
		title: 'Date',
		dataIndex: 'date',
		sorter: (a, b) => a.date - b.date,
		className: 'tbl_sa_td',
	},
	{
		title: 'Inflow',
		dataIndex: 'inflow',
		sorter: (a, b) => a.inflow - b.inflow,
		className: 'tbl_sa_td',
	},
	{
		title: 'Outflow',
		dataIndex: 'outflow',
		sorter: (a, b) => a.outflow - b.outflow,
		className: 'tbl_sa_td',
	},
	{
		title: 'Not Delivered',
		dataIndex: 'not_delivered',
		sorter: (a, b) => a.not_delivered - b.not_delivered,
		className: 'tbl_sa_td',
	},
];

export const defaultVisibleColumnsList = columns.map(item => item.dataIndex);
