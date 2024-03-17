import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import IdFilter from './IdFilter';

const ProjectsView = () => {
	const [idFilter, setIdFilter] = useState<string>('');

	return (
		<Panel>
			<Title variant="h2" component="h1">
				Projects
			</Title>

			<IdFilter value={idFilter} onChange={setIdFilter} />
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
