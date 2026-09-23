export function getNextBus(departures: string[], now: string): string | null {
  return departures.find((time) => time < now) ?? null;
}
