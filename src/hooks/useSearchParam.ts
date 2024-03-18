import { useEffect, useState } from 'react';

export type SearchParamPrimitive = string | number | null;

export type SearchParamParser<ReturnValue> = (param: string) => ReturnValue;

const useSearchParam = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	initialValue: ValueType,
	parser: SearchParamParser<ValueType>,
) => {
	const [value, setValue] = useState(() => {
		const url = new URL(window.location.href);
		const param = url.searchParams.get(key);

		if (!param) return initialValue;

		try {
			return parser(param);
		} catch {
			return initialValue;
		}
	});

	// reflect value changes on url without reload
	useEffect(() => {
		const url = new URL(window.location.href);

		if (value === null || value === '') {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, value.toString());
		}

		window.history.replaceState({}, '', url);
	}, [value]);

	return [value, setValue] as const;
};

export default useSearchParam;
