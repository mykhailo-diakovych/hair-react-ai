import { FilterTypes } from "@config/constants";

export interface IFilterTypeOption {
  index: number;
  value: string;
  type: FilterTypes;
  ordering: string;
}
