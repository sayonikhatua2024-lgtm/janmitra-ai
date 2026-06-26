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
export const saveEmergency = async (emergencyData) => {
  try {
    const docRef = await addDoc(
      collection(db, "emergency_requests"),
      {
        ...emergencyData,
        createdAt: serverTimestamp()
      }
    );

    return docRef.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const saveFeedback = async (feedbackData) => {
  try {
    const docRef = await addDoc(
      collection(db, "feedback"),
      {
        ...feedbackData,
        createdAt: serverTimestamp()
      }
    );

    return docRef.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const saveChatHistory = async (chatData) => {
  try {
    const docRef = await addDoc(
      collection(db, "chat_history"),
      {
        ...chatData,
        createdAt: serverTimestamp()
      }
    );

    return docRef.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const saveSchemeRecommendation = async (schemeData) => {
  try {
    const docRef = await addDoc(
      collection(db, "scheme_recommendations"),
      {
        ...schemeData,
        createdAt: serverTimestamp()
      }
    );

    return docRef.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};