import styled from '@emotion/styled';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';

import { Product } from '@/types';

const MAX_PRODUCTS = 5;

export type ProductsTableProps = {
	products: Product[];
	page: number;
	onPageChange: (page: number) => void;
	onProductSelect?: (id: number) => void;
};

const ProductsTable = ({
	products,
	page,
	onPageChange,
	onProductSelect,
}: ProductsTableProps) => {
	const selectedProducts = products.slice(0, MAX_PRODUCTS);

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
				{selectedProducts.map((product) => (
					<ProductRow
						key={product.name}
						background={product.color}
						onClick={() => onProductSelect?.(product.id)}
					>
						<TableCell component="th" scope="row" align="right">
							{product.id}
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.year}</TableCell>
					</ProductRow>
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

const ProductRow = styled(TableRow)<{ background?: string }>`
	background-color: ${(props) => props.background};
	cursor: pointer;
`;

export default ProductsTable;
