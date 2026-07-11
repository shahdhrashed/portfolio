"use client";

import { useRef, useEffect, useState } from "react";
import { uploadImage } from "./uploadImage";

type Cmd = { label: string; title: string; command: string; arg?: string };

const cmds: Cmd[] = [
  { label: "B", title: "Bold", command: "bold" },
  { label: "i", title: "Italic", command: "italic" },
  { label: "H2", title: "Heading", command: "formatBlock", arg: "h2" },
  { label: "H3", title: "Subheading", command: "formatBlock", arg: "h3" },
  { label: "\"", title: "Quote", command: "formatBlock", arg: "blockquote" },
  { label: "*", title: "Bulleted list", command: "insertUnorderedList" },
  { label: "P", title: "Paragraph", command: "formatBlock", arg: "p" },
  { label: "Link", title: "Link", command: "createLink" },
];

export default function RichTextEditor({
  value,
  onChange,
  label = "Body",
}: {
  value?: string;
  onChange: (html: string) => void;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Seed the editable area once; afterwards it is uncontrolled so the caret
  // doesn't jump on every keystroke.
  useEffect(() => {
    if (ref.current && value !== undefined) ref.current.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emit() {
    onChange(ref.current?.innerHTML ?? "");
  }

  function exec(command: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  }

  function addLink() {
    const url = prompt("Link URL:");
    if (url) exec("createLink", url);
  }

  function runCommand(cmd: Cmd) {
    if (cmd.command === "createLink") {
      addLink();
      return;
    }
    exec(cmd.command, cmd.arg);
  }

  async function insertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadImage(file);
      ref.current?.focus();
      document.execCommand("insertHTML", false, `<img src="${url}" alt="" />`);
      emit();
    } catch {
      alert("Image upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="rounded-md border border-line bg-white">
        <div className="flex flex-wrap items-center gap-1 border-b border-line p-1.5">
          {cmds.map((c) => (
            <button
              key={c.title}
              type="button"
              title={c.title}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => runCommand(c)}
              className="min-w-8 rounded px-2 py-1 text-sm hover:bg-paper-dim"
            >
              {c.label}
            </button>
          ))}
          <button
            type="button"
            title="Insert image"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="rounded px-2 py-1 text-sm hover:bg-paper-dim disabled:opacity-60"
          >
            {uploading ? "..." : "Image"}
          </button>
        </div>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={emit}
          className="prose-body min-h-48 px-4 py-3 outline-none"
          style={{ fontSize: "1rem" }}
        />
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={insertImage}
        className="hidden"
      />
    </div>
  );
}
