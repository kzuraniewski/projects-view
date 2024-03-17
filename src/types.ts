export type Product = {
	id: number;
	name: string;
	year: number;
	color: string;
	pantone_value: string;
};

// TODO: rename
export type ProductsResponse = {
	page?: number;
	per_page?: number;
	total?: number;
	total_pages?: number;
	data: Product | Product[];

	// support key irrelevant
};
