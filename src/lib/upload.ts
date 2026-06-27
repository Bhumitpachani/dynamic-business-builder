import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Compress an image using the canvas API.
 * - Resizes so the longest side is at most `maxPx` (default 1200px)
 * - Outputs WebP at `quality` (default 0.82 ≈ 82%)
 * - Maintains aspect ratio, never upscales
 */
async function compressImage(file: File, maxPx = 1200, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const { naturalWidth: w, naturalHeight: h } = img;
      const scale = Math.min(1, maxPx / Math.max(w, h));
      const cw = Math.round(w * scale);
      const ch = Math.round(h * scale);

      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not available"));

      // Use better image smoothing for downscaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, cw, ch);

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
        "image/webp",
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image load failed"));
    };

    img.src = objectUrl;
  });
}

/**
 * Compress then upload a File to Firebase Storage.
 * Returns the public download URL.
 * Path: images/{folder}/{timestamp}_{filename}.webp
 */
export async function uploadImage(file: File, folder = "general"): Promise<string> {
  const compressed = await compressImage(file);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.[^.]+$/, "");
  const path = `images/${folder}/${Date.now()}_${safeName}.webp`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, compressed, { contentType: "image/webp" });
  return getDownloadURL(storageRef);
}
