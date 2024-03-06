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
		title: 'Delivered',
		dataIndex: 'outflow',
		sorter: (a, b) => a.outflow - b.outflow,
		className: 'tbl_sa_td',
	},
	// {
	// 	title: 'Outflow',
	// 	dataIndex: 'outflow',
	// 	sorter: (a, b) => a.outflow - b.outflow,
	// 	className: 'tbl_sa_td',
	// },
	{
		title: 'On Premises',
		dataIndex: 'on_premise',
		sorter: (a, b) => a.on_premise - b.on_premise,
		className: 'tbl_sa_td',
	},
	{
		title: 'Cancel Vehicle',
		dataIndex: 'cancel',
		sorter: (a, b) => a.cancel - b.cancel,
		className: 'tbl_sa_td',
	},
];

export const defaultVisibleColumnsList = columns.map(item => item.dataIndex);
