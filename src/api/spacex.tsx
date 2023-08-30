import axios from 'axios';
import { launchSchema, launchArrSchema, Launch } from '../types/spacexapi';

export const getAllLaunches = async (): Promise<Launch[]> => {
  const res = await axios.get<Launch[]>('https://api.spacexdata.com/v4/launches');
  const allLaunches = launchArrSchema.parse(res.data);
  return allLaunches;
};

export const getLaunchById = async (id: string): Promise<Launch> => {
  const res = await axios.get<Launch>(`https://api.spacexdata.com/v4/launches/${id}`);
  const launch = launchSchema.parse(res.data);
  return launch;
};
