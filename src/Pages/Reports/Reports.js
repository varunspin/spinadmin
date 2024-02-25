import React, { useState } from 'react';
import { DatabaseOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Workshop from './Workshop';
import SA from './SA';

const KEYS = {
	workshop: 'workshop',
	sa: 'sa',
};
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const sideMenuItems = [
	getItem('Workshop', KEYS.workshop, <DatabaseOutlined />),
	getItem('SA', KEYS.sa, <DatabaseOutlined />),
];

const sideMenuContentMapping = {
	workshop: Workshop,
	sa: SA,
};

const Reports = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState(KEYS.workshop);
	const SelectedComponent = sideMenuContentMapping[selectedMenuItem];
	return (
		<Layout>
			<Layout>
				<Sider
					width={200}
					style={{
						textAlign: 'left',
					}}>
					<Menu
						mode='inline'
						selectedKeys={[selectedMenuItem]}
						// defaultSelectedKeys={['1']}
						// defaultOpenKeys={['sub1']}
						style={{
							height: '100%',
							borderRight: 0,
						}}
						items={sideMenuItems}
						onClick={e => {
							// console.log('onChange-', e);
							setSelectedMenuItem(e.key);
						}}
					/>
				</Sider>
				<Layout
					style={{
						padding: '24px 24px 24px',
					}}>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}>
						<SelectedComponent />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};
export default Reports;
