// This is temporary
// TODO: replace with zod types
interface Launch {
  name: string;
  success: boolean | null;
  date_utc: string;
  rocket: string;
  launchpad: string;
  details: string | null;
  id: string;
}
