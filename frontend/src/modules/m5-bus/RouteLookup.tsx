import { useState, type FormEvent } from "react";

function RouteLookup() {
  const [lookupId, setLookupId] = useState("");
  const [result, setResult] = useState("");
  const [notFound, setNotFound] = useState(false);

  async function handleFind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");
    setNotFound(false);

    try {
      const res = await fetch(`/api/bus/routes/${lookupId}/`);
      const data = await res.json();
      setResult(`Route ${data.id}: ${data.name}`);
    } catch {
      setNotFound(true);
    }
  }

  return (
    <form className="lookup-form" onSubmit={handleFind}>
      <h2>Find a route by ID</h2>
      <input
        placeholder="Route ID"
        value={lookupId}
        onChange={(e) => setLookupId(e.target.value)}
        required
      />
      <button type="submit">Find</button>
      {result && <p className="lookup-result">{result}</p>}
      {notFound && <p className="error">No route found with that ID.</p>}
    </form>
  );
}

export default RouteLookup;
