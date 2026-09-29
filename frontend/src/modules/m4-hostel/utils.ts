export function validateComplaint(input: {
  room: string;
  description: string;
}): string[] {
  const errors: string[] = [];
  if (input.room === "") {
    errors.push("Room is required.");
  }
  if (input.room === "") {
    errors.push("Description is required.");
  }
  return errors;
}
