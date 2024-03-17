import React, { useState } from 'react';
import { getProductsByPage } from '@/api/products';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import useUrlState from '@/hooks/useUrlState';

import IdFilter from './IdFilter';
import ProductsTable from './ProductsTable';

const ProjectsView = () => {
	const [page, setPage] = useUrlState('page', 1, parseInt);
	// TODO: validation
	const [idFilter, setIdFilter] = useState<string>('');

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

			{isSuccess ? (
				<>
					<IdFilter value={idFilter} onChange={setIdFilter} />
					<ProductsTable
						products={products.data}
						page={page - 1}
						onPageChange={(page) => setPage(page + 1)}
					/>
				</>
			) : (
				<Typography>Loading...</Typography>
			)}
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

export default ProjectsView;
