import type { CartItem } from "./types";

export function calculateTotal(cart: CartItem[]): number {
  let total = 0;
  for (const item of cart) {
    total = total + Number(item.price);
  }
  return total;
}
