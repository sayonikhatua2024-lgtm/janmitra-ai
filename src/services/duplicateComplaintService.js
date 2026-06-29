import { getAllComplaints } from "./firestoreService";

export const checkDuplicateComplaint = async (
  title,
  description
) => {
  console.log("Duplicate service started");

  try {
    const complaints = await getAllComplaints();

    console.log("Fetched complaints:", complaints);

    const newText = (
      title + " " + description
    ).toLowerCase();

    for (const complaint of complaints) {
      const oldText = (
        complaint.title +
        " " +
        complaint.description
      ).toLowerCase();

      if (
        complaint.title.toLowerCase() ===
        title.toLowerCase()
      ) {
        return {
          duplicate: true,
          existingComplaint: complaint,
        };
      }

      if (
        newText.includes(
          complaint.title.toLowerCase()
        ) ||
        oldText.includes(title.toLowerCase())
      ) {
        return {
          duplicate: true,
          existingComplaint: complaint,
        };
      }
    }

    return {
      duplicate: false,
    };
  } catch (error) {
    console.log(error);

    return {
      duplicate: false,
    };
  }
};