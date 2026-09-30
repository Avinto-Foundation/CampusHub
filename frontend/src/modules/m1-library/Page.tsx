import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import BookLookup from "./BookLookup";
import "./styles.css";
import type { Book, Reservation, ReserveBookRequest } from "./types";
import { filterBooks } from "./utils";

function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("");

  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [reservationsError, setReservationsError] = useState(false);

  const [bookId, setBookId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loanDays, setLoanDays] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dueDateReminder, setDueDateReminder] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      const res = await fetch("/api/library/books/");
      const data = await res.json();
      setBooks(data);
    }
    loadBooks();
  }, []);

  useEffect(() => {
    async function loadReservations() {
      try {
        const res = await fetch("/api/library/reservation/");
        if (!res.ok) {
          throw new Error("Failed to load reservations");
        }
        const data = await res.json();
        setReservations(data);
      } catch {
        setReservationsError(true);
      }
    }
    loadReservations();
  }, []);

  const filteredBooks = filterBooks(books, query);

  function handleDetails(book: Book) {
    alert(`${book.title} — ${book.desciption.slice(0, 120)}`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: ReserveBookRequest = {
      book_id: Number(bookId),
      studentName: studentName,
      email,
      roll_number: rollNumber,
      phone,
      loan_days: Number(loanDays),
      pickup_location: pickupLocation,
      due_date_reminder: dueDateReminder,
    };

    try {
      const res = await fetch("/api/library/reservations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to reserve book");
      }
      setFormSuccess(true);
      setBookId("");
      setStudentName("");
      setEmail("");
      setRollNumber("");
      setPhone("");
      setLoanDays("");
      setPickupLocation("");
      setDueDateReminder(false);
    } catch {
      setFormError(true);
    }
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        &larr; Back to CampusHub
      </Link>
      <h1>Library Book Search</h1>

      <input
        className="search-input"
        placeholder="Search books by title..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className="layout">
        <div className="main-list">
          {filteredBooks.map((book) => (
            <div className="list-item" key={book.id}>
              <div>
                <strong>{book.title}</strong> by {book.author} —{" "}
                {book.available ? "Available" : "Checked out"}
              </div>
              <button onClick={() => handleDetails(book)}>Details</button>
            </div>
          ))}
        </div>

        <div className="side-panel">
          <h2>Recent reservations</h2>
          {reservationsError && <p>Could not load recent reservations.</p>}
          {!reservationsError && reservations === null && <p>Loading...</p>}
          {!reservationsError && reservations !== null && (
            <ul>
              {reservations.map((reservation) => (
                <li key={reservation.id}>
                  {reservation.student_name} — {reservation.book_title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="reserve-form" onSubmit={handleSubmit}>
        <h2>Reserve a book</h2>
        <select
          value={bookId}
          onChange={(event) => setBookId(event.target.value)}
          required
        >
          <option value="">Choose a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <input
          placeholder="Your name"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          placeholder="Roll number"
          value={rollNumber}
          onChange={(event) => setRollNumber(event.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        <fieldset className="choice-group">
          <legend>Loan period</legend>
          {["7", "14", "21"].map((days) => (
            <label key={days}>
              <input
                type="radio"
                name="loan-days"
                value={days}
                checked={loanDays === days}
                onChange={(event) => setLoanDays(event.target.value)}
                required
              />
              {days} days
            </label>
          ))}
        </fieldset>
        <select
          value={pickupLocation}
          onChange={(event) => setPickupLocation(event.target.value)}
          required
        >
          <option value="">Choose a pickup location</option>
          <option value="main">Main Library</option>
          <option value="engineering">Engineering Library</option>
          <option value="hostel">Hostel Reading Room</option>
        </select>
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={dueDateReminder}
            onChange={(event) => setDueDateReminder(event.target.checked)}
          />
          Email me a reminder before the due date
        </label>
        <button type="submit">Reserve</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Reservation submitted!</p>}
      </form>

      <BookLookup />
    </div>
  );
}

export default LibraryPage;
