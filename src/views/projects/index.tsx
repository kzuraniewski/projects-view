import React, { useState } from 'react';
import styled from '@emotion/styled';

import IdFilter from './IdFilter';

const ProjectsView = () => {
	const [idFilter, setIdFilter] = useState<string>('');

	return (
		<Panel>
			<IdFilter value={idFilter} onChange={setIdFilter} />
		</Panel>
	);
};

const Panel = styled.div`
	padding-top: 40px;
`;

export default ProjectsView;
