import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/tests/utils';

import IdFilter from '../IdFilter';

describe('IdFilter', () => {
	it('renders and accepts value', () => {
		render(<IdFilter value={1} />);

		const input = screen.getByRole('textbox');

		expect(input).toHaveValue('1');
	});

	it('clears value on button press', async () => {
		const user = userEvent.setup();
		let value: number | null = 1;

		render(
			<IdFilter
				value={value}
				onChange={(newValue) => (value = newValue)}
			/>,
		);

		const input = screen.getByRole('textbox');
		const clearButton = screen.getByRole('button');

		expect(input).toHaveValue('1');

		await user.click(clearButton);

		expect(input).toHaveValue('');
	});

	it('accepts only numeric values', async () => {
		const user = userEvent.setup();
		let value: number | null = null;

		render(
			<IdFilter
				value={value}
				onChange={(newValue) => (value = newValue)}
			/>,
		);

		const input = screen.getByRole('textbox');

		await user.type(input, '-a1a');

		expect(input).toHaveValue('1');
	});
});
