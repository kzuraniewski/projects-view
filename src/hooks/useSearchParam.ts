export type SearchParamPrimitive = string | number | null;

export type ParamParser<ReturnValue> = (param: string) => ReturnValue;

// TODO: query param validation
const useSearchParam = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	initialValue: ValueType,
	parser: ParamParser<ValueType>,
) => {
	// const searchParams = new URLSearchParams(window.location.search);
	const url = new URL(window.location.href);
	const rawParam = url.searchParams.get(key);

	const setParam = (newValue: ValueType) => {
		if (newValue === null) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, newValue.toString());
		}

		window.location.search = url.searchParams.toString();
	};

	const parseParam = (): ValueType => {
		if (rawParam === null) return initialValue;
		return parser(rawParam);
	};

	return [parseParam(), setParam] as const;
};

export default useSearchParam;
