export function getNextBus(departures: string[], now: string): string | null {
  for (const time of departures) {
    if (time < now) {
      return time;
    }
  }
  return null;
}
