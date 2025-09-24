import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { Account } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Function to add or merge an object
export function addOrMergeAccounts(array: Account[], obj: Account) {
  const index = _.findIndex(array, { account_id: obj.account_id });

  if (index !== -1) {
    // If object with same ID exists, merge it
    _.merge(array[index], obj);
  } else {
    // If not found, add the new object
    array.push(obj);
  }
  return array;
}