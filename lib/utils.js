import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function addMonths(date, amount) {
  date.setMonth(date.getMonth() + amount);
  return date;
}

export function formatMonthYear(date) {
  const month = date?.toLocaleString("default", { month: "numeric" });
  const year = date?.getFullYear();
  return `${month}/${year}`;
}
