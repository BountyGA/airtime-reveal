import { db } from "./firebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// SAVE sender info
export async function saveReveal(data) {
  await addDoc(collection(db, "reveals"), data);
  return true;
}

// LOOKUP who sent airtime to a number
export async function checkAirtime(number) {
  const q = query(collection(db, "reveals"), where("receiver", "==", number));
  const snapshot = await getDocs(q);

  let results = [];
  snapshot.forEach(doc => results.push(doc.data()));
  return results; // returns array of matches
}

