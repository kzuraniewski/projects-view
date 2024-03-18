import { useState } from 'react';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import debounce from 'lodash.debounce';

export type IdFilter = {
	value?: number | null;
	onChange?: (value: number | null) => void;
};

const IdFilter = ({ value, onChange }: IdFilter) => {
	const initialValue = value ? value.toString() : '';
	const [textValue, setTextValue] = useState(initialValue);

	const updateValue = debounce(
		(newValue: number | null) => onChange?.(newValue),
		1000,
	);

	const handleChange: TextFieldProps['onChange'] = (event) => {
		if (event.target.value.match(/[^0-9]/)) {
			event.preventDefault();
			clear();
			return;
		}

		setTextValue(event.target.value);

		const parsed = Number(event.target.value);
		updateValue(parsed);
	};

	const clear = () => {
		setTextValue('');
		updateValue(null);
	};

	return (
		<Stack data-testid="id-filter">
			<IdField label="ID" value={textValue} onChange={handleChange} />

			<IconButton onClick={clear}>
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

export default IdFilter;
