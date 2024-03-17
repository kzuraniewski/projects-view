import React from 'react';
import { getProductsByPage } from '@/api/products';
import styled from '@emotion/styled';
import { Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import useSearchParam from '@/hooks/useSearchParam';

import IdFilter from './IdFilter';
import ProductsTable from './ProductsTable';

const ProjectsView = () => {
	const [page, setPage] = useSearchParam('page', 1, parseInt);
	// add option to disable/enable reload on change
	const [idFilter, setIdFilter] = useSearchParam('id', null, parseInt);

	// TODO: implement proper loading, error states
	const { data: products, isSuccess } = useQuery({
		queryKey: ['products', page],
		queryFn: () => getProductsByPage(page),
	});

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
					<ProductsTable
						products={products.data}
						page={page - 1}
						onPageChange={(page) => setPage(page + 1)}
					/>
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

export default ProjectsView;
