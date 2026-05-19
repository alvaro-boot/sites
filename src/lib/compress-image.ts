const MAX_EDGE = 1920;
const JPEG_QUALITY = 0.88;
/** Por debajo de 1 MB evita el límite del proxy de Next en rutas /api/backend. */
const COMPRESS_ABOVE_BYTES = 900 * 1024;

/** Reduce capturas PNG/JPEG grandes antes de subir (mantiene buena calidad). */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith('image/') || file.size <= COMPRESS_ABOVE_BYTES) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY);
  });
  if (!blob) return file;

  const base = file.name.replace(/\.[^.]+$/, '') || 'imagen';
  return new File([blob], `${base}.jpg`, { type: 'image/jpeg' });
}
