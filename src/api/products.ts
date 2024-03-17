import { apiClient } from '@/httpCommon';
import { ProductsResponse } from '@/types';

export const getProductsByPage = async (page: number, id?: number | null) => {
	const response = await apiClient.get<ProductsResponse>('/products', {
		params: { page, id },
	});
	return response.data;
};
