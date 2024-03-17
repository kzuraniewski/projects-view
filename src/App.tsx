import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductsView from './views/products';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />

			<Container>
					<ProductsView />
			</Container>
		</QueryClientProvider>
	);
};

export default App;
