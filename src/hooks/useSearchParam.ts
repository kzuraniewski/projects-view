import { useEffect, useState } from 'react';
import { getUrlParam } from '@/utils';

export type SearchParamPrimitive = string | number | null;

export type SearchParamParser<ReturnValue> = (param: string) => ReturnValue;

const useSearchParam = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	initialValue: ValueType,
	parser: SearchParamParser<ValueType>,
) => {
	const [value, setValue] = useState(() => {
		const param = getUrlParam(key);
		if (!param) return initialValue;

		try {
			return parser(param);
		} catch {
			return initialValue;
		}
	});

	const refreshUrl = () => {
		const url = new URL(window.location.href);

		if (value === null || value === '') {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value.toString());
		}

		window.history.replaceState({}, '', url);
	};

	useEffect(refreshUrl, [value]);

	return [value, setValue] as const;
};

export default useSearchParam;
