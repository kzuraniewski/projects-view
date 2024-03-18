import { useEffect, useState } from 'react';
import {
	getSearchParam,
	SearchParamParser,
	SearchParamPrimitive,
} from '@/utils/url';

const useSearchParam = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	defaultValue: ValueType,
	parser: SearchParamParser<ValueType>,
) => {
	const [value, setValue] = useState(() => {
		const param = getSearchParam(key);
		if (!param) return defaultValue;

		try {
			return parser(param);
		} catch {
			return defaultValue;
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
