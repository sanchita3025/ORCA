import en from "./en";
import hi from "./hi";
import od from "./od";

export const translations = {
  en,
  hi,
  od,
};

export type Language = keyof typeof translations;

export default translations;