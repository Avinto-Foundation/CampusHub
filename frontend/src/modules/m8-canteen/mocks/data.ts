// Fake data for the M8 tests, copied from backend/m8_canteen/fixtures/seed.json.
//
// The shapes below are written from Swagger (/api/docs/, canteen section),
// NOT imported from ../types.ts. That is on purpose: types.ts belongs to the
// app, and the app might be wrong. The mocks must always describe what the
// real API sends.

// GET /api/canteen/menu/ returns a list of these.
export interface ApiMenuItem {
  id: number;
  name: string;
  price: string; // Django sends prices as text, like "20.00"
  category: string;
  description: string;
}

// GET and POST /api/canteen/orders/ use this shape.
export interface ApiOrder {
  id: number;
  name: string;
  phone: string;
  pickup_time: string;
  notes: string;
  delivery_address: { hostel: string; room: string };
  items: { menu_item_id: number; qty: number }[];
}

export const menuItems: ApiMenuItem[] = [
  {
    id: 1,
    name: "Samosa",
    price: "20.00",
    category: "Snacks",
    description: "A crisp, deep-fried pastry filled with spiced potatoes and peas.",
  },
  {
    id: 2,
    name: "Tea",
    price: "15.00",
    category: "Beverages",
    description: "Hot Indian-style masala tea served in a small glass.",
  },
  {
    id: 3,
    name: "Momo",
    price: "120.00",
    category: "Snacks",
    description: "Steamed dumplings filled with vegetables, served with spicy chutney.",
  },
  {
    id: 4,
    name: "Veg Sandwich",
    price: "45.00",
    category: "Snacks",
    description: "Grilled sandwich with mixed vegetables and mint chutney.",
  },
  {
    id: 5,
    name: "Cold Coffee",
    price: "60.00",
    category: "Beverages",
    description: "Blended iced coffee topped with a scoop of ice cream.",
  },
  {
    id: 6,
    name: "Veg Thali",
    price: "90.00",
    category: "Meals",
    description: "A full meal with rice, dal, two curries, roti, and salad.",
  },
];

// Newest first, like the real API.
export const orders: ApiOrder[] = [
  {
    id: 3,
    name: "Rohan Das",
    phone: "9900112233",
    pickup_time: "16:00",
    notes: "Extra chutney.",
    delivery_address: { hostel: "B", room: "112" },
    items: [
      { menu_item_id: 3, qty: 3 },
      { menu_item_id: 5, qty: 2 },
    ],
  },
  {
    id: 2,
    name: "Tanya Bose",
    phone: "9812345678",
    pickup_time: "18:30",
    notes: "",
    delivery_address: { hostel: "C", room: "108" },
    items: [{ menu_item_id: 6, qty: 1 }],
  },
  {
    id: 1,
    name: "Ishaan Kapoor",
    phone: "9876543210",
    pickup_time: "13:00",
    notes: "Less spicy please.",
    delivery_address: { hostel: "A", room: "204" },
    items: [
      { menu_item_id: 1, qty: 2 },
      { menu_item_id: 2, qty: 1 },
    ],
  },
];
