export interface UploadedImage {
  assetId: string;
  url: string;
}

export async function uploadImage(file: File): Promise<UploadedImage> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: "Upload failed." }));
    throw new Error(error || "Upload failed.");
  }
  return res.json();
}
