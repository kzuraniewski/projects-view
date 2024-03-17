import React from 'react';
import { Container, CssBaseline } from '@mui/material';

import ProjectsView from './views/projects';

const App = () => {
	return (
		<>
			<CssBaseline />

			<Container>
				<ProjectsView />
			</Container>
		</>
	);
};

export default App;
