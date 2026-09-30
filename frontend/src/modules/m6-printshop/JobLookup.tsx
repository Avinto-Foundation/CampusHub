import { useState, type FormEvent } from "react";

function JobLookup() {
  const [lookupId, setLookupId] = useState("");
  const [result, setResult] = useState("");
  const [notFound, setNotFound] = useState(false);

  async function handleCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");
    setNotFound(false);

    try {
      const res = await fetch(`/api/print/jobs/${lookupId}/`);
      const data = await res.json();
      setResult(`${data.file_name} costs ${data.price}`);
    } catch {
      setNotFound(true);
    }
  }

  return (
    <form className="lookup-form" onSubmit={handleCheck}>
      <h2>Check a print job by ID</h2>
      <input
        placeholder="Job ID"
        value={lookupId}
        onChange={(e) => setLookupId(e.target.value)}
        required
      />
      <button type="submit">Check</button>
      {result && <p className="lookup-result">{result}</p>}
      {notFound && <p className="error">No print job found with that ID.</p>}
    </form>
  );
}

export default JobLookup;
