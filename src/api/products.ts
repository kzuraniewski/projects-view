import { apiClient } from '@/httpCommon';
import { ProductsResponse } from '@/types';
import { delayPromise } from '@/utils';

export const getProductsByPage = async (page: number, id?: number | null) => {
	const response = await delayPromise(
		apiClient.get<ProductsResponse>('/products', {
			params: { page, id },
		}),
	);

	return response.data;
};
