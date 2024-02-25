import React, { useState } from 'react';
import {
	AppstoreOutlined,
	CalendarOutlined,
	LinkOutlined,
	DatabaseOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}
const items = [
	getItem('Workshop', '1', <DatabaseOutlined />),
	getItem('Navigation Two', '2', <CalendarOutlined />),
	getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
		getItem('Option 3', '3'),
		getItem('Option 4', '4'),
		getItem('Submenu', 'sub1-2', null, [
			getItem('Option 5', '5'),
			getItem('Option 6', '6'),
		]),
	]),
	getItem('Navigation Three', 'sub2', <SettingOutlined />, [
		getItem('Option 7', '7'),
		getItem('Option 8', '8'),
		getItem('Option 9', '9'),
		getItem('Option 10', '10'),
	]),
	getItem(
		<a href='https://ant.design' target='_blank' rel='noopener noreferrer'>
			Ant Design
		</a>,
		'link',
		<LinkOutlined />
	),
];
const Reports = () => {
	// const [mode, setMode] = useState('inline');
	// const [theme, setTheme] = useState('light');
	// const changeMode = value => {
	// 	setMode(value ? 'vertical' : 'inline');
	// };
	// const changeTheme = value => {
	// 	setTheme(value ? 'dark' : 'light');
	// };
	return (
		<div>
			<Menu
				style={{
					width: 250,
					minHeight: '100%',
				}}
				defaultSelectedKeys={['1']}
				// defaultOpenKeys={['sub1', 'sub2']}
				defaultOpenKeys={[]}
				mode='inline'
				theme='light'
				items={items}
			/>
		</div>
	);
};
export default Reports;
