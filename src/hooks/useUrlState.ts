import { useEffect } from 'react';

export type SearchParamPrimitive = string | number;

export type ParamParser<ReturnValue> = (param: string) => ReturnValue;

const useUrlState = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	initialValue: ValueType,
	parser: ParamParser<ValueType>,
) => {
	const searchParams = new URLSearchParams(window.location.search);
	const rawParam = searchParams.get(key);

	const setParam = (newValue: ValueType) => {
		searchParams.set(key, newValue.toString());
		window.location.search = searchParams.toString();
	};

	useEffect(() => {
		if (!rawParam) {
			setParam(initialValue);
		}
	}, [key, initialValue]);

	const parseParam = (): ValueType => {
		if (rawParam === null) return initialValue;
		return parser(rawParam);
	};

	return [parseParam(), setParam] as const;
};

export default useUrlState;
