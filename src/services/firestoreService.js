import { db } from "../firebase";

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

export const saveComplaint = async (complaintData) => {
  try {
    const docRef = await addDoc(
      collection(db, "complaints"),
      {
        ...complaintData,
        createdAt: serverTimestamp()
      }
    );

    return docRef.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};