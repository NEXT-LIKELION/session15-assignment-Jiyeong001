import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export async function getTodos() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return todos;
}

export async function addTodo(todo) {
  await addDoc(collection(db, "todos"), todo);
}

export async function updateTodo(id, todo) {
  await updateDoc(doc(db, "todos", id), todo);
}

export async function deleteTodo(id) {
  console.log("삭제할 id:", id);
  await deleteDoc(doc(db, "todos", id));
  const ref = doc(db, "todos", id);
  const snap = await getDoc(ref);
  console.log("삭제 후 문서 존재?", snap.exists());
}
