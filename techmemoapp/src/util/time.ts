import { format } from "date-fns";
import { ja } from "date-fns/locale";
export const formatDate = (date: string | Date) => {
  return format(new Date(date), "yyyy/MM/dd");
};

export const formatDateJa = (date: string | Date) => {
  return format(new Date(date), "yyyy年MM月dd日 HH:mm", {
    locale: ja,
  });
};
