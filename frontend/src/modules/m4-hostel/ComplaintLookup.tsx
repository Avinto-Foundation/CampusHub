import { useState, type FormEvent } from "react";

function ComplaintLookup() {
  const [lookupId, setLookupId] = useState("");
  const [result, setResult] = useState("");
  const [notFound, setNotFound] = useState(false);

  async function handleCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");
    setNotFound(false);

    try {
      const res = await fetch(`/api/hostel/complaints/${lookupId}/`);
      const data = await res.json();
      setResult(`${data.category}: ${data.state}`);
    } catch {
      setNotFound(true);
    }
  }

  return (
    <form className="lookup-form" onSubmit={handleCheck}>
      <h2>Check a complaint by ID</h2>
      <input
        placeholder="Complaint ID"
        value={lookupId}
        onChange={(e) => setLookupId(e.target.value)}
        required
      />
      <button type="submit">Check</button>
      {result && <p className="lookup-result">{result}</p>}
      {notFound && <p className="error">No complaint found with that ID.</p>}
    </form>
  );
}

export default ComplaintLookup;
