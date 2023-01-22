import React from 'react';
import moment from 'moment';

export const sleep = m => new Promise(r => setTimeout(r, m));

export const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const maxStr = (str, maxLen) => {
	if (str.length > maxLen) return str.slice(0, maxLen) + '...';
	return str;
};

// TABLE
export const formatCellImage = cell => (
	<a href={cell} target='_blank' rel='noopener noreferrer'>
		<img
			src={cell}
			height='20'
			width='30'
			alt='organisation'
			style={{ border: '1px solid blue' }}
		/>
	</a>
);

export const formatCellMobile = (cell, row) => (
	<a
		href={`tel:+${row.mobile_country_code}${cell}`}>{`+${row.mobile_country_code} ${cell}`}</a>
);

export const formatCellActiveInActiveChip = cell => {
	return cell ? (
		<span className='badge bg-success'>Active</span>
	) : (
		<span className='badge bg-danger'>InActive</span>
	);
};

export const formatCellDateTime = (cell, row) =>
	moment(cell).format('DD-MM-YYYY HH:mm:ss');

export const formatDeviceSrNo = (cell, row) => {
	return row.vendor === 'zktecho' ? cell.split('-')[0] : cell;
};

export const formatKeyValue = (cell, row) => {
	return row.vendor === 'zktecho' ? `${cell}-In, ${+cell + 1}-Out` : '-';
};

export const formatEmptyToAll = cell => cell || 'ALL';

export const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
	<div
		className='btn-group btn-group-toggle'
		style={{ display: 'block', lineHeight: '40px' }}
		data-toggle='buttons'>
		{columns
			.map(column => ({
				...column,
				toggle: toggles[column.dataField],
			}))
			.map(column => (
				<label
					key={column.dataField}
					className={`btn btn-sm ${
						column.toggle ? 'btn-primary active' : 'btn-outline-primary'
					} ${column.nonToggle ? 'disabled' : ''}`}>
					<input
						type='checkbox'
						name={column.dataField}
						id={column.dataField}
						onChange={() => {}}
						onClick={() => onColumnToggle(column.dataField)}
						autoComplete='off'
						disabled={column.nonToggle}
						checked={column.toggle}
					/>
					{column.text}
				</label>
			))}
	</div>
);
// -- TABLE
