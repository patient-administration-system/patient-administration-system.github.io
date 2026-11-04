import status from "./status.json";

export const retrievedOn = new Date(status.retrievedOn).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** A measure from spec/14-implementation-status.md. A renamed measure fails the build rather than showing nothing. */
export function measure(name: string): number {
  const value = (status.measures as Record<string, number>)[name];
  if (value === undefined) throw new Error(`status.json has no measure called "${name}"`);
  return value;
}

export const allMeasures = Object.entries(status.measures as Record<string, number>);
