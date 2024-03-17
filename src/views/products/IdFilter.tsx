import React, { useState } from 'react';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, TextField, TextFieldProps } from '@mui/material';

export type IdFilter = {
	value?: number | null;
	onChange?: (value: number | null) => void;
};

const IdFilter = ({ value, onChange }: IdFilter) => {
	const initialValue = value ? value.toString() : '';
	const [textValue, setTextValue] = useState(initialValue);

	const handleChange: TextFieldProps['onChange'] = (event) => {
		const parsed = Number(event.target.value);
		if (isNaN(parsed) || parsed <= 0) {
			setTextValue('');
		}
		setTextValue(event.target.value);
	};

	const handleBlur: TextFieldProps['onBlur'] = (event) => {
		if (!onChange) return;

		const parsed = Number(event.target.value);
		onChange(parsed);
	};

	return (
		<Stack>
			<IdField
				label="ID"
				type="number"
				value={textValue}
				onChange={handleChange}
				onBlur={handleBlur}
			/>

			<IconButton onClick={() => onChange?.(null)}>
				<ClearIcon />
			</IconButton>
		</Stack>
	);
};

const Stack = styled.div`
	display: flex;
	width: fit-content;
`;

const IdField = styled(TextField)`
	width: 7rem;
`;

// FIXME: prevent non-numeric signs

export default IdFilter;
