import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProjectsView from './views/projects';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />

			<Container>
				<ProjectsView />
			</Container>
		</QueryClientProvider>
	);
};

export default App;
