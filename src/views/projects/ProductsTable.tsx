import React from 'react';
import { Product } from '@/types';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';

export type ProductsTableProps = {
	products: Product[];
	page: number;
	onPageChange: (page: number) => void;
	idFilter?: number;
};

const ProductsTable = ({
	products,
	page,
	onPageChange,
	idFilter,
}: ProductsTableProps) => {
	const filteredProduts = idFilter
		? products.filter((product) => product.id === idFilter)
		: products;

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
				{filteredProduts.map((product) => (
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
						page={page}
						onPageChange={(_, page) => onPageChange(page)}
						rowsPerPageOptions={[]}
						rowsPerPage={5}
					/>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default ProductsTable;
