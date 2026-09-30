import { useState, type FormEvent } from "react";

function CourseLookup() {
  const [lookupId, setLookupId] = useState("");
  const [result, setResult] = useState("");
  const [notFound, setNotFound] = useState(false);

  async function handleFind(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult("");
    setNotFound(false);

    try {
      const res = await fetch(`/api/gpa/courses/${lookupId}/`);
      const data = await res.json();
      setResult(`${data.code}: ${data.title}`);
    } catch {
      setNotFound(true);
    }
  }

  return (
    <form className="lookup-form" onSubmit={handleFind}>
      <h2>Find a course by ID</h2>
      <input
        placeholder="Course ID"
        value={lookupId}
        onChange={(e) => setLookupId(e.target.value)}
        required
      />
      <button type="submit">Find</button>
      {result && <p className="lookup-result">{result}</p>}
      {notFound && <p className="error">No course found with that ID.</p>}
    </form>
  );
}

export default CourseLookup;
