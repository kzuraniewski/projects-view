import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';

const mockQueryClient = new QueryClient();

const MockProviders = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={mockQueryClient}>
		{children}
	</QueryClientProvider>
);

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: MockProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
