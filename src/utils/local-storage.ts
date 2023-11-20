// Function to get an item from local storage
export async function getFromLS(key: string): Promise<any | null> {
  try {
    const serializedItem = localStorage.getItem(key);
    if (!serializedItem) return null;

    return JSON.parse(serializedItem);
  } catch (error) {
    console.error(`Error getting item from local storage, KEY: ${key}, ERROR: ${error}`);
    return null;
  }
}

// Function to set an item in local storage
export async function setLS(key: string, value: any): Promise<void> {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item in local storage: ${error}`);
  }
}
