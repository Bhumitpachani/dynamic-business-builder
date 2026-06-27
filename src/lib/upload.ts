import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a File to Firebase Storage and return its public download URL.
 * Path: images/{folder}/{timestamp}_{filename}
 */
export async function uploadImage(file: File, folder = "general"): Promise<string> {
  const path = `images/${folder}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
