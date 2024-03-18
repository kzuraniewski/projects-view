import { render, screen } from '@/tests/utils';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

import ProductsView from '..';

describe('ProductsView', () => {
	it('renders id filter', () => {
		render(<ProductsView />);

		screen.findByTestId('id-filter');
	});
});
