import { ref, set, get, child } from 'firebase/database';
import { firebaseRtdb } from './index';

// Function to get an item from Realtime Database
export async function getFromRtdb(key: string): Promise<any | null> {
  const snapshot = await get(child(ref(firebaseRtdb), key));

  if (snapshot.exists()) {
    const rawValue = snapshot.val();
    return JSON.parse(rawValue); // Parse the value from stringified JSON
  }

  return null;
}

// Function to set an item in Realtime Database
export async function setRtdb(key: string, value: any): Promise<void> {
  const serializedValue = JSON.stringify(value); // Stringify the value
  return set(ref(firebaseRtdb, key), serializedValue);
}
