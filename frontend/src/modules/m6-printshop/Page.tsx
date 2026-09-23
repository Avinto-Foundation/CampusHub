import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import type { PriceListEntry, PrintJob, PrintJobRequest } from "./types";
import { calculatePrintCost } from "./utils";

function PrintPage() {
  const [jobs, setJobs] = useState<PrintJob[]>([]);

  const [prices, setPrices] = useState<PriceListEntry[] | null>(null);
  const [pricesError, setPricesError] = useState(false);

  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState("");
  const [copies, setCopies] = useState("1");
  const [color, setColor] = useState(false);
  const [hostel, setHostel] = useState("");
  const [room, setRoom] = useState("");
  const [formError, setFormError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadJobs() {
      const res = await fetch("/api/print/jobs/");
      const data = await res.json();
      setJobs(data);
    }
    loadJobs();
  }, []);

  useEffect(() => {
    async function loadPrices() {
      try {
        const res = await fetch("/api/print/price-list/");
        if (!res.ok) {
          throw new Error("Failed to load prices");
        }
        const data = await res.json();
        setPrices(data);
      } catch {
        setPricesError(true);
      }
    }
    loadPrices();
  }, []);

  function handleDetails(job: PrintJob) {
    alert(`${job.file_name} — ${job.descripiton.slice(0, 120)}`);
  }

  const costPreview = calculatePrintCost(
    Number(pages) || 0,
    Number(copies) || 0,
    color,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const body: PrintJobRequest = {
      file_name: fileName,
      pages: Number(pages),
      copies: Number(copies),
      color,
      delivery_address: `${hostel}, Room ${room}`,
    };

    try {
      const res = await fetch("/api/print/jobs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to submit print job");
      }
      setFormSuccess(true);
      setFileName("");
      setPages("");
      setCopies("1");
      setColor(false);
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
      <h1>Print Shop</h1>

      <div className="layout">
        <div className="main-list">
          {jobs.map((job) => (
            <div className="list-item" key={job.id}>
              <div>
                <strong>{job.file_name}</strong> — {job.pages} pages x{" "}
                {job.copies} copies {job.color ? "(color)" : "(b/w)"} — cost:{" "}
                {job.cost}
              </div>
              <button onClick={() => handleDetails(job)}>Details</button>
            </div>
          ))}
        </div>

        <div className="side-panel">
          <h2>Price list</h2>
          {pricesError && <p>Could not load price list.</p>}
          {!pricesError && prices === null && <p>Loading...</p>}
          {!pricesError && prices !== null && (
            <ul>
              {prices.map((price) => (
                <li key={price.id}>
                  {price.category}: {price.price_per_page} / page
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <form className="print-form" onSubmit={handleSubmit}>
        <h2>Submit a print job</h2>
        <input
          placeholder="File name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
        <input
          type="number"
          min={1}
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <input
          type="number"
          min={1}
          placeholder="Copies"
          value={copies}
          onChange={(e) => setCopies(e.target.value)}
          required
        />
        <div className="color-field">
          <input
            id="color-checkbox"
            type="checkbox"
            checked={color}
            onChange={(e) => setColor(e.target.checked)}
          />
          <label htmlFor="color-checkbox">Color printing</label>
        </div>
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
        <p className="cost-preview">Estimated cost: {costPreview}</p>
        <button type="submit">Submit</button>
        {formError && (
          <p className="error">Something went wrong. Please try again.</p>
        )}
        {formSuccess && <p className="success">Print job submitted!</p>}
      </form>
    </div>
  );
}

export default PrintPage;
