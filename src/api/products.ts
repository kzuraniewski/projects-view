import { apiClient } from '@/httpCommon';
import { delayPromise } from '@/utils/common';

import { ProductsResponse } from '@/types';

export const getProductsByPage = async (page: number, id?: number | null) => {
	const response = await delayPromise(
		apiClient.get<ProductsResponse>('/products', {
			params: { page, id },
		}),
	);

	return response.data;
};
