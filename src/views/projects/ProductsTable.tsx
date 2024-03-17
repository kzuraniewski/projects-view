import React from 'react';
import { Product } from '@/types';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TablePaginationProps,
	TableRow,
} from '@mui/material';

import useUrlState from '@/hooks/useUrlState';

export type ProductsTableProps = {
	products: Product[];
};

const ProductsTable = ({ products }: ProductsTableProps) => {
	const [page, setPage] = useUrlState('page', 1, parseInt);
	// TODO: validation

	const handlePageChange: TablePaginationProps['onPageChange'] = (
		_event,
		page,
	) => {
		setPage(page);
	};

	return (
		<Table aria-label="products table">
			<TableHead>
				<TableRow>
					<TableCell>ID</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>Year</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{products.map((product) => (
					<TableRow key={product.name}>
						<TableCell component="th" scope="row" align="right">
							{product.id}
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.year}</TableCell>
					</TableRow>
				))}
			</TableBody>

			<TableFooter>
				<TableRow>
					<TablePagination
						colSpan={3}
						count={products.length}
						page={page - 1}
						onPageChange={handlePageChange}
						rowsPerPageOptions={[]}
						rowsPerPage={5}
					/>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default ProductsTable;
