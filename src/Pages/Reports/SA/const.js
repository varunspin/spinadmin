import _ from 'lodash';
import { convertMinutesToDayHoursMinutes } from 'util/helper';

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
		title: 'SA',
		dataIndex: 'sa_name',
		className: 'tbl_sa_td',
		filters: [],
		onFilter: (value, record) => record.sa_name.indexOf(value) === 0,
	},
	{
		title: 'RO',
		dataIndex: 'ro',
		sorter: (a, b) => a.ro - b.ro,
		className: 'tbl_sa_td',
	},
	{
		title: 'Delivered',
		dataIndex: 'delivered',
		sorter: (a, b) => a.delivered - b.delivered,
		className: 'tbl_sa_td',
	},
	{
		title: 'AVG TAT RO',
		dataIndex: 'tat_ro',
		sorter: (a, b) => a.tat_ro - b.tat_ro,
		className: 'tbl_sa_td',
		render: input => convertMinutesToDayHoursMinutes(input),
	},
	{
		title: 'AVG TAT GIGO',
		dataIndex: 'tat_gigo',
		sorter: (a, b) => a.tat_gigo - b.tat_gigo,
		className: 'tbl_sa_td',
		render: input => convertMinutesToDayHoursMinutes(input),
	},
	{
		title: 'AVG TAT RDGO',
		dataIndex: 'tat_delivered',
		sorter: (a, b) => a.tat_delivered - b.tat_delivered,
		className: 'tbl_sa_td',
		render: input => convertMinutesToDayHoursMinutes(input),
	},
	{
		title: 'Cancel Vehicle',
		dataIndex: 'cancel',
		sorter: (a, b) => a.cancel - b.cancel,
		className: 'tbl_sa_td',
	},
];

export const filterTableData = data => {
	// console.log('calling-filterTableData-');
	const {
		filterReportData,
		// filters,
		visibleColumnsList,
	} = data;
	// console.log('SA-useMemo-filterData-computed');
	const newFilterReportData = [];
	filterReportData.forEach(item => {
		// if (
		// 	filters?.sa_name?.length === 0 ||
		// 	filters?.sa_name?.includes(item?.sa_name)
		// ) {
		const newItem = {};
		Object.keys(item).forEach(itemKey => {
			if (visibleColumnsList.includes(itemKey)) {
				// console.log('filters-items', { filters, item: item });
				newItem[itemKey] = item[itemKey];
			}
		});
		newFilterReportData.push(_.cloneDeep(newItem));
		// }
	});
	return newFilterReportData;
};

export const defaultVisibleColumnsList = columns.map(item => item.dataIndex);
