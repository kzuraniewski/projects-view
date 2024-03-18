export type SearchParamPrimitive = string | number | null;

export type SearchParamParser<ReturnValue> = (param: string) => ReturnValue;

// TODO: query param validation
const useSearchParam = <ValueType extends SearchParamPrimitive = string>(
	key: string,
	initialValue: ValueType,
	parser: SearchParamParser<ValueType>,
) => {
	const url = new URL(window.location.href);
	const rawParam = url.searchParams.get(key);

	const parsedParam = rawParam ? parser(rawParam) : initialValue;

	const setParam = (newValue: ValueType) => {
		if (newValue === null) {
			url.searchParams.delete(key);
		} else {
			url.searchParams.set(key, newValue.toString());
		}

		window.location.search = url.searchParams.toString();
	};

	return [parsedParam, setParam] as const;
};

export default useSearchParam;
