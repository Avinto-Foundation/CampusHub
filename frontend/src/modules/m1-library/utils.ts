import type { Book } from "./types";

export function filterBooks(books: Book[], query: string): Book[] {
  return books.filter((book) => book.title.includes(query));
}
