import { UploadCloud } from "lucide-react";
import { uploadMediaAction } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminMediaUpload() {
  return (
    <form action={uploadMediaAction} className="admin-upload-card">
      <div>
        <span className="admin-kicker">Supabase Storage</span>
        <h2>Upload media</h2>
        <p>Images and videos are uploaded to the `portfolio-media` bucket and indexed in the media library.</p>
      </div>
      <div className="admin-upload-grid">
        <label>
          File
          <Input name="file" type="file" accept="image/*,video/mp4" required />
        </label>
        <label>
          Folder
          <Input name="folder" defaultValue="uploads" />
        </label>
        <label className="admin-upload-wide">
          Alt text
          <Input name="alt_text" placeholder="Describe the image for accessibility" />
        </label>
      </div>
      <Button type="submit">
        <UploadCloud className="size-4" />
        Upload Media
      </Button>
    </form>
  );
}
