import styled from '@emotion/styled';
import { Container, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductsView from './views/products';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<CssBaseline />

			<Background>
				<Container>
					<ProductsView />
				</Container>
			</Background>
		</QueryClientProvider>
	);
};

const Background = styled.div`
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
`;

export default App;
