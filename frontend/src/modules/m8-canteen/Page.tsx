import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import type { CartItem, MenuItem, Order, OrderRequest } from "./types";
import { calculateTotal } from "./utils";

const PICKUP_TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

function CanteenPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const [orders, setOrders] = useState<Order[] | null>(null);
  const [ordersError, setOrdersError] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      const res = await fetch("/api/canteen/menu/");
      const data = await res.json();
      setMenu(data);
    }
    loadMenu();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await fetch("/api/canteen/order/");
        if (!res.ok) {
          throw new Error("Failed to load orders");
        }
        const data = await res.json();
        setOrders(data);
      } catch {
        setOrdersError(true);
      }
    }
    loadOrders();
  }, []);

  function handleDetails(item: MenuItem) {
    alert(`${item.name} — ${item.descrption.slice(0, 120)}`);
  }

  function handleAddToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  const total = calculateTotal(cart);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: OrderRequest = {
      name,
      phone,
      pickupTime,
      notes,
      delivery_address: `${hostel}, Room ${room}`,
      items: cart.map((item) => ({ menu_item_id: item.id, qty: item.qty })),
    };

    try {
      const res = await fetch("/api/canteen/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to place order");
      }
      setFormSuccess(true);
      setCart([]);
      setName("");
      setPhone("");
      setPickupTime("");
      setNotes("");
      setHostel("");
      setRoom("");
    } catch {
      setFormError(true);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>Canteen Order</h1>

      <div className="layout">
        <div className="main-list">
          {menu.map((item) => (
            <div className="list-item" key={item.id}>
              <div>
                <strong>{item.name}</strong> — {item.category} — {item.price}
              </div>
              <div className="list-item-actions">
                <button onClick={() => handleDetails(item)}>Details</button>
                <button onClick={() => handleAddToCart(item)}>Add</button>
              </div>
            </div>
          ))}

          <div className="cart">
            <h2>Cart</h2>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.qty}
                </li>
              ))}
            </ul>
            <p className="cart-total">Total: {total}</p>
          </div>
        </div>

        <div className="side-panel">
          <h2>Recent orders</h2>
          {ordersError && <p>Could not load recent orders.</p>}
          {!ordersError && orders === null && <p>Loading...</p>}
          {!ordersError && orders !== null && (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>
                  {order.name} — {order.pickup_time}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <select
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          required
        >
          <option value="">Choose a pickup time</option>
          {PICKUP_TIMES.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        <input
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <input
          placeholder="Hostel"
          value={hostel}
          onChange={(e) => setHostel(e.target.value)}
          required
        />
        <input
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          required
        />
        <button className="place-order-button" type="submit">
          Place Order
        </button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Order placed!</p>}
      </form>
    </div>
  );
}

export default CanteenPage;
