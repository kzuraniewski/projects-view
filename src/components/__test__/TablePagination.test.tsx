import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import TablePagination from '../TablePagination';

describe('TablePagination', () => {
	it('shows current page', () => {
		render(<TablePagination page={1} />);
		screen.findByText('Page 1');
	});

	it('shows total pages', () => {
		render(<TablePagination page={1} totalPages={10} />);
		screen.findByText('Page 1 of 10');
	});

	it('provides a page change event', async () => {
		const user = userEvent.setup();
		const handler = vi.fn();
		render(
			<TablePagination page={5} totalPages={10} onPageChange={handler} />,
		);

		const actions = await screen.findAllByRole('button');
		await user.click(actions[0]);
		await user.click(actions[1]);

		expect(handler.mock.calls[0][0]).toBe(4);
		expect(handler.mock.calls[1][0]).toBe(6);
	});

	it('has bottom boundary', async () => {
		render(<TablePagination page={1} totalPages={2} />);

		const actions = await screen.findAllByRole('button');
		const previousButton = actions[0];

		expect(previousButton).toBeDisabled();
	});

	it('has upper boundary only if totalPages specified', async () => {
		const { rerender } = render(<TablePagination page={1} />);

		let actions = await screen.findAllByRole('button');
		let nextButton = actions[1];

		expect(nextButton).not.toBeDisabled();

		rerender(<TablePagination page={2} totalPages={2} />);

		actions = await screen.findAllByRole('button');
		nextButton = actions[1];

		expect(nextButton).toBeDisabled();
	});
});
