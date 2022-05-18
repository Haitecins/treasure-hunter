/// <reference types="vite/client" />
import { Dayjs } from "dayjs";

type DateType = string | number | Date | Dayjs;
declare module "dayjs" {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string;

    from(compared: DateType, withoutSuffix?: boolean): string;

    toNow(withoutSuffix?: boolean): string;

    to(compared: DateType, withoutSuffix?: boolean): string;
  }
}
