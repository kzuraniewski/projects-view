import { describe, it } from 'vitest';

import { render, screen } from '@/tests/utils';

import ProductsView from '..';

describe('ProductsView', () => {
	it('renders id filter', () => {
		render(<ProductsView />);

		screen.findByTestId('id-filter');
	});
});
