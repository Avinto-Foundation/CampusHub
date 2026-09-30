import { useState, type FormEvent } from "react";

function SubjectLookup() {
  const [lookupId, setLookupId] = useState("");
  const [result, setResult] = useState("");
  const [notFound, setNotFound] = useState(false);

  async function handleFind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");
    setNotFound(false);

    try {
      const res = await fetch(`/api/attendance/subjects/${lookupId}/`);
      const data = await res.json();
      setResult(`${data.subject}: ${data.attended_count} of ${data.total} classes attended`);
    } catch {
      setNotFound(true);
    }
  }

  return (
    <form className="lookup-form" onSubmit={handleFind}>
      <h2>Find a subject by ID</h2>
      <input
        placeholder="Subject ID"
        value={lookupId}
        onChange={(e) => setLookupId(e.target.value)}
        required
      />
      <button type="submit">Find</button>
      {result && <p className="lookup-result">{result}</p>}
      {notFound && <p className="error">No subject found with that ID.</p>}
    </form>
  );
}

export default SubjectLookup;
