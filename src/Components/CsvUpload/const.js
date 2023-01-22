export const styles = {
	csvReader: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10,
	},
	browseFile: {
		borderRadius: 0,
		width: '20%',
	},
	acceptedFile: {
		border: '1px solid #ccc',
		height: 45,
		lineHeight: 2.5,
		paddingLeft: 10,
		width: '80%',
	},
	remove: {
		borderRadius: 0,
		padding: '0 20px',
	},
	progressBarBackgroundColor: {
		backgroundColor: 'skyblue',
	},
};

export const columnsCustomerInfo = [
	{
		title: '#',
		dataIndex: 'sr_no',
		key: 'sr_no',
	},
	{
		title: 'VRN',
		dataIndex: 'vrn',
		key: 'vrn',
	},
	{
		title: 'Model',
		dataIndex: 'model',
		key: 'model',
	},
	{
		title: 'Contact Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Primary Contact Phone',
		dataIndex: 'mobile',
		key: 'mobile',
	},
];
