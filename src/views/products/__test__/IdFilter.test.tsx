import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import IdFilter from '../IdFilter';

describe('IdFilter', () => {
	it('renders and accepts value', () => {
		render(<IdFilter />);

		expect(screen.getByTestId('id-filter')).toBeInTheDocument();
	});
});
