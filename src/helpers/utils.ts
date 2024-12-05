import { format } from "date-fns";

const isLoggedIn = async () => {};

export const Utils = {};

export const formatCurrency = (value: number) => {
  return `Rp. ${value.toLocaleString("id-ID")},-`;
};

export const formatBoolean = (value: boolean) => {
  if (value) return "Ya";
  return "Tidak";
};

export const changeDateTimeToNow = (value: Date) => {
  const originalDate = new Date(value);
  const currentDate = new Date(); // Current date and time

  // Extract date part from the original date
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth();
  const date = originalDate.getDate();

  // Create a new Date object with the same date part and current time
  const newDate = new Date(
    year,
    month,
    date,
    currentDate.getHours(),
    currentDate.getMinutes(),
    currentDate.getSeconds()
  );

  // Convert the new date to ISO string format
  const formattedDate = newDate.toISOString().slice(0, 19).replace("T", " ");
  return new Date(formattedDate);
};

export const formatDate = (value: Date) => {
  const date = new Date(value);

  const newDate = format(date, "dd MMM yyyy, HH:mm");
  return newDate;
};

// Function to save data to local storage
export const saveDataToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to load data from local storage
export const loadDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
