export interface IFormatSelectOptionParams {
  data: any;
  labelKeys: string[];
  valueKey: number | string;
}

export interface ISelectOptions<T extends number | string> {
  label: string;
  value: T;
}

const getLabel = (item: any, labelKeys: string[]) => {
  let label = item;
  labelKeys?.forEach(labelKey => {
    label = label?.[labelKey];
  });
  return label;
};

export function formatSelectOptions({
  data,
  labelKeys,
  valueKey,
}: IFormatSelectOptionParams) {
  return (
    data?.map((item: any) => {
      return {
        label: getLabel(item, labelKeys),
        value: item?.[valueKey],
      };
    }) ?? []
  );
}
