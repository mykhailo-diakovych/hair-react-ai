import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

dayjs.extend(advancedFormat);

export const formatDate = (date: Date, format = "Do MMM YY"): string => {
  return dayjs(date).format(format);
};
