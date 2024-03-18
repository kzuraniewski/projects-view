import { describe, expect, it } from 'vitest';

import { mockProduct, mockProductList } from '@/tests/mockData';
import { render, screen } from '@/tests/utils';

import ProductsTable from '../ProductsTable';

import { Product } from '@/types';

describe('ProductsTable', () => {
	it('displays products', () => {
		const slicedProducts = mockProductList.slice(0, 3);
		render(<ProductsTable products={slicedProducts} page={0} />);

		const displayedPropertyKeys: (keyof Product)[] = [
			'id',
			'name',
			'color',
		];

		slicedProducts.forEach((product) => {
			displayedPropertyKeys.forEach((key) => {
				screen.findByText(product[key]);
			});
		});
	});

	it('limits displayed products to 5', async () => {
		const products = [...new Array(10)].fill(mockProduct);
		render(<ProductsTable products={products} page={0} />);

		const rows = await screen.findAllByRole('row');
		expect(rows.length - 2).toBe(5); // exclude header, footer
	});
});
