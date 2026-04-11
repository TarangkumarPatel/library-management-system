import { atom } from 'jotai';

// This will store the list of IDs for the user's favourite books
export const favouritesAtom = atom();

// This will store the list of search queries the user has made
export const searchHistoryAtom = atom([]);