import { firebaseAuth } from './index';
import { User, onAuthStateChanged } from 'firebase/auth';

export const getUser = () => {
  return new Promise<User | null>((resolve) => onAuthStateChanged(firebaseAuth, resolve));
};
