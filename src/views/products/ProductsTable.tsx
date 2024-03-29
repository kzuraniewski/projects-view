import styled from '@emotion/styled';
import {
	Table as MuiTable,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';

import TablePagination from '@/components/TablePagination';

import { Product } from '@/types';

export type ProductsTableProps = {
	products: Product[];
	page: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
	onProductSelect?: (id: number) => void;
};

const ProductsTable = ({
	products,
	page,
	totalPages,
	onPageChange,
	onProductSelect,
}: ProductsTableProps) => {
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
				{products.length === 0 ? (
					<TableRow>
						<TableCell colSpan={3}>
							<Typography color="GrayText" align="center">
								The results are empty
							</Typography>
						</TableCell>
					</TableRow>
				) : (
					products.map((product) => (
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
					))
				)}
			</TableBody>

			<TableFooter>
				<TableRow>
					<TablePagination
						page={page}
						totalPages={totalPages}
						colSpan={3}
						onPageChange={onPageChange}
					/>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

const Table = styled(MuiTable)`
	tr td,
	tr th {
		&:nth-child(1) {
			width: 6rem;
		}

		&:nth-child(3) {
			width: 8rem;
		}
	}
`;

const ProductRow = styled(TableRow)<{ background?: string }>`
	background-color: ${(props) => props.background};
	cursor: pointer;
`;

export default ProductsTable;
