import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";


import { db } from "../firebase";

// Save Complaint
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

// Save Emergency Request
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

// Save Feedback
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

// Save Chat History
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

// Save Scheme Recommendation
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

// Fetch All Complaints for Admin Dashboard
export const getAllComplaints = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, "complaints")
    );

    const complaints = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return complaints;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateComplaintStatus = async (id, newStatus) => {
  try {
    const complaintRef = doc(db, "complaints", id);

    await updateDoc(complaintRef, {
      status: newStatus,
    });

    return true;
  } catch (error) {
    console.error("Error updating complaint:", error);
    return false;
  }
};