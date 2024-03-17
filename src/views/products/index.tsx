import React, { useState } from 'react';
import { getProductsByPage } from '@/api/products';
import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import useSearchParam from '@/hooks/useSearchParam';

import IdFilter from './IdFilter';
import ProductPreview from './ProductPreview';
import ProductsTable from './ProductsTable';

const ProductsView = () => {
	const [page, setPage] = useSearchParam('page', 1, parseInt);
	// add option to disable/enable reload on change
	const [idFilter, setIdFilter] = useSearchParam('id', null, parseInt);
	const [previewId, setPreviewId] = useState<number | null>(null);

	// TODO: implement proper loading, error states
	const { data: products, isSuccess } = useQuery({
		queryKey: ['products', { page, idFilter }],
		queryFn: () => getProductsByPage(page, idFilter),
		initialData: { data: [] },
	});

	const productList = Array.isArray(products.data)
		? products.data
		: [products.data];

	const previewedProduct =
		isSuccess && previewId
			? productList.find((product) => product.id === previewId)
			: null;

	return (
		<Panel>
			<Title variant="h2" component="h1">
				Projects
			</Title>

			<ProductsPanel>
				<Filters>
					<IdFilter value={idFilter} onChange={setIdFilter} />
				</Filters>

				{isSuccess ? (
					<>
						<ProductsTable
							products={productList}
							page={page - 1}
							onPageChange={(page) => setPage(page + 1)}
							onProductSelect={setPreviewId}
						/>

						<ProductPreview
							product={previewedProduct}
							open={!!previewedProduct}
							onClose={() => setPreviewId(null)}
						/>
					</>
				) : (
					<Typography>Loading...</Typography>
				)}
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
	padding: 15px;
`;

const Filters = styled.div`
	margin: 0 auto 2.5rem;
	width: fit-content;
`;

export default ProductsView;
