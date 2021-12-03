import { format } from "date-fns";

export function ISOToDBDate(isoDate: string) {
  return format(new Date(isoDate), "yyyy-MM-dd kk:mm:ss.SSS");
}
