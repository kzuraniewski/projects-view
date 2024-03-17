import React from 'react';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, TextField, TextFieldProps } from '@mui/material';

export type IdFilter = {
	value?: string;
	onChange?: (value: string) => void;
};

const IdFilter = ({ value, onChange }: IdFilter) => {
	const handleChange: TextFieldProps['onChange'] = (event) => {
		const parsedId = parseId(event.target.value);
		onChange?.(parsedId);
	};

	return (
		<Root>
			<IdField
				label="ID"
				type="number"
				value={value}
				onChange={handleChange}
			/>

			<IconButton onClick={() => onChange?.('')}>
				<ClearIcon />
			</IconButton>
		</Root>
	);
};

const parseId = (value: string) => {
	const parsed = parseInt(value);
	if (isNaN(parsed) || parsed <= 0) {
		return '';
	}

	return value;
};

const Root = styled.div`
	display: flex;
	width: fit-content;
`;

const IdField = styled(TextField)`
	width: 7rem;
`;

// FIXME: prevent non-numeric signs

export default IdFilter;
