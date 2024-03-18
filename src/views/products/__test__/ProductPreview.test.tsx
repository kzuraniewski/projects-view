import { Product } from '@/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import ProductPreview from '../ProductPreview';

const mockProduct: Product = {
	id: 1,
	name: 'cerulean',
	year: 2000,
	color: '#98B2D1',
	pantone_value: '15-4020',
};

describe('ProductPreview', () => {
	it('opens and closes', async () => {
		const user = userEvent.setup();
		let open = true;

		render(
			<ProductPreview
				product={mockProduct}
				open={open}
				onClose={() => (open = false)}
			/>,
		);

		expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

		const closeButton = screen.getByRole('button');
		await user.click(closeButton);
		expect(open).toBe(false);
	});

	it('displays all properties', () => {
		render(<ProductPreview product={mockProduct} open={true} />);

		const label = screen.getByText(mockProduct.name);
		expect(label).toBeInTheDocument();

		[
			['id', 'ID'],
			['year', 'Year'],
			['color', 'Color'],
			['pantone_value', 'Pantone Value'],
		].map(([key, label]) => {
			const property = screen.getByText(`${label}: `, { exact: false });

			expect(property).toHaveTextContent(
				`${label}: ${mockProduct[key as keyof typeof mockProduct]}`,
			);
		});
	});
});