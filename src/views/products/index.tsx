import { useState } from 'react';
import { setViewTitle } from '@/utils/common';
import { numberParser } from '@/utils/url';
import styled from '@emotion/styled';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CircularProgress, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import useSearchParam from '@/hooks/useSearchParam';
import { getProductsByPage } from '@/api/products';

import IdFilter from './IdFilter';
import ProductPreview from './ProductPreview';
import ProductsTable from './ProductsTable';

const ProductsView = () => {
	const [page, setPage] = useSearchParam('page', 1, numberParser);
	const [idFilter, setIdFilter] = useSearchParam('id', null, numberParser);
	const [previewId, setPreviewId] = useState<number | null>(null);

	const {
		data: products,
		isSuccess,
		status,
		error,
	} = useQuery({
		queryKey: ['products', { page, idFilter }],
		queryFn: () => getProductsByPage(page, idFilter),
		retry: 1,
	});

	const productList = isSuccess
		? Array.isArray(products.data)
			? products.data
			: [products.data]
		: [];

	const previewedProduct =
		isSuccess && previewId
			? productList.find((product) => product.id === previewId)
			: null;

	setViewTitle(
		idFilter && isSuccess ? productList[0].name : `Page ${page}`,
		'Products',
	);

	return (
		<Panel>
			<Title variant="h2" component="h1">
				Projects
			</Title>

			<ProductsPanel>
				<Filters>
					<IdFilter value={idFilter} onChange={setIdFilter} />
				</Filters>

				{status === 'pending' && (
					<TableFallback>
						<CircularProgress />
					</TableFallback>
				)}

				{status === 'error' && (
					<TableFallback>
						<ErrorOutlineIcon color="error" fontSize="large" />
						<Typography color="red">
							{error.message}
						</Typography>
					</TableFallback>
				)}

				{status === 'success' && (
					<ProductsTable
						products={productList}
						page={page}
						totalPages={products.total_pages}
						onPageChange={setPage}
						onProductSelect={setPreviewId}
					/>
				)}

				<ProductPreview
					product={previewedProduct}
					open={!!previewedProduct}
					onClose={() => setPreviewId(null)}
				/>
			</ProductsPanel>
		</Panel>
	);
};

const Panel = styled.div`
	padding-top: 40px;
`;

const Title = styled(Typography)`
	margin-bottom: 3rem;
	text-align: center;
` as typeof Typography; // https://github.com/mui/material-ui/issues/15759#issuecomment-493994852

const ProductsPanel = styled(Paper)`
	max-width: 30rem;
	margin: 0 auto;
	padding: 30px 15px 10px;
`;

const Filters = styled.div`
	margin: 0 auto 2.5rem;
	width: fit-content;
`;

const TableFallback = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	min-height: 10rem;
`;

export default ProductsView;
