import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';

import { Product } from '@/types';

export type ProductPreviewProps = {
	product?: Product | null;
	open?: boolean;
	onClose?: () => void;
};

const ProductPreview = ({
	product,
	open = false,
	onClose,
}: ProductPreviewProps) => {
	if (!product) return null;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{product.name.toUpperCase()}</DialogTitle>

			<DialogContent>
				<div>ID: {product.id}</div>
				<div>Year: {product.year}</div>
				<div>Color: {product.color}</div>
				<div>Pantone Value: {product.pantone_value}</div>
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProductPreview;
