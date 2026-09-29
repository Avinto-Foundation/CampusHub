import type { Book } from "./types";

export function filterBooks(books: Book[], query: string): Book[] {
  const search = query.toLowerCase();
  return books.filter((book) => book.author.toLowerCase().includes(search));
}
