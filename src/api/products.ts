import { apiClient } from '@/httpCommon';
import { ProductsResponse } from '@/types';

export const getProductsByPage = async (page: number) => {
	const response = await apiClient.get<ProductsResponse>('/products', {
		params: { page },
	});
	return response.data;
};
