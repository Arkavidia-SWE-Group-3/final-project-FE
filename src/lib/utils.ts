import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { monthNames } from "@/components/ui/date-picker";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberCommas(num: number){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function countTimeAfterDate(date: string){
  const now = new Date();
  const past = new Date(date);

  const diffInSeconds = Math.abs(Math.floor((now.getTime() - past.getTime()) / 1000));


  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];


  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

export function convertDateFormat(date: Date){
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return formattedDate;
}

export function convertDateFormatToMonthYear(date: Date){
  const formattedDate = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  return formattedDate;
}