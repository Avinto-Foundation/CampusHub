import type { CartItem } from "./types";

export function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.price, 0);
}
