import React from 'react';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, TextField, TextFieldProps } from '@mui/material';

export type IdFilter = {
	value?: number | null;
	onChange?: (value: number | null) => void;
};

const IdFilter = ({ value, onChange }: IdFilter) => {
	const handleChange: TextFieldProps['onChange'] = (event) => {
		const parsedId = parseValue(event.target.value);
		onChange?.(parsedId);
	};

	const fieldValue = value && value !== null ? value.toString() : '';

	return (
		<Stack>
			<IdField
				label="ID"
				type="number"
				value={fieldValue}
				onChange={handleChange}
			/>

			<IconButton onClick={() => onChange?.(null)}>
				<ClearIcon />
			</IconButton>
		</Stack>
	);
};

const parseValue = (value: string) => {
	const parsed = parseInt(value);
	if (isNaN(parsed) || parsed <= 0) {
		return null;
	}

	return parsed;
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
