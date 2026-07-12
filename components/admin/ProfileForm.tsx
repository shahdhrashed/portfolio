"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import type { UploadedImage } from "./uploadImage";
import {
  FONT_OPTIONS,
  FONT_STYLE_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  findFontOption,
  findFontStyleOption,
  findFontWeightOption,
} from "@/lib/fonts";

const platforms = ["instagram", "linkedin", "youtube", "x", "email"];

interface Social {
  platform: string;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileForm({ profile }: { profile: any | null }) {
  const router = useRouter();
  const [name, setName] = useState(profile?.name ?? "Shahd");
  const [headline, setHeadline] = useState(profile?.headline ?? "");
  const [shortBio, setShortBio] = useState(profile?.shortBio ?? "");
  const [bioHtml, setBioHtml] = useState(profile?.bioHtml ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [cvUrl, setCvUrl] = useState(profile?.cvUrl ?? "");
  const [headshot, setHeadshot] = useState<UploadedImage | null>(
    profile?.headshot?.assetId ? profile.headshot : null
  );
  const [socials, setSocials] = useState<Social[]>(
    profile?.socials?.length ? profile.socials : [{ platform: "instagram", url: "" }]
  );
  const [navVideo, setNavVideo] = useState(profile?.navVideo ?? true);
  const [navWriting, setNavWriting] = useState(profile?.navWriting ?? true);
  const [navPhoto, setNavPhoto] = useState(profile?.navPhoto ?? true);
  const [bodyFont, setBodyFont] = useState(profile?.bodyFont ?? "");
  const [bodyFontWeight, setBodyFontWeight] = useState(profile?.bodyFontWeight ?? "");
  const [bodyFontStyle, setBodyFontStyle] = useState(profile?.bodyFontStyle ?? "");
  const [titleFont, setTitleFont] = useState(profile?.titleFont ?? "");
  const [titleFontWeight, setTitleFontWeight] = useState(profile?.titleFontWeight ?? "");
  const [titleFontStyle, setTitleFontStyle] = useState(profile?.titleFontStyle ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const selectedBodyFont = findFontOption(bodyFont);
  const selectedTitleFont = findFontOption(titleFont);
  const selectedBodyWeight = findFontWeightOption(bodyFontWeight);
  const selectedTitleWeight = findFontWeightOption(titleFontWeight);
  const selectedBodyStyle = findFontStyleOption(bodyFontStyle);
  const selectedTitleStyle = findFontStyleOption(titleFontStyle);

  const input =
    "w-full rounded-md border border-line bg-white px-3 py-2 outline-none focus:border-accent";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    const res = await fetch("/api/admin/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        headline,
        shortBio,
        bioHtml,
        email,
        cvUrl,
        headshot: headshot
          ? { assetId: headshot.assetId, crop: headshot.crop, hotspot: headshot.hotspot }
          : undefined,
        socials,
        navVideo,
        navWriting,
        navPhoto,
        bodyFont,
        bodyFontWeight,
        bodyFontStyle,
        titleFont,
        titleFontWeight,
        titleFontStyle,
      }),
    });
    if (res.ok) {
      setSaved(true);
      router.refresh();
    } else {
      const { error } = await res.json().catch(() => ({ error: "Save failed." }));
      setError(error || "Save failed.");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input className={input} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Headline</label>
          <input
            className={input}
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>
      </div>

      <ImageUploader value={headshot} onChange={setHeadshot} label="Photo" aspect={3 / 4} />

      <div>
        <label className="mb-1 block text-sm font-medium">
          Short bio (shown on the homepage)
        </label>
        <textarea
          className={input}
          rows={2}
          value={shortBio}
          onChange={(e) => setShortBio(e.target.value)}
        />
      </div>

      <RichTextEditor value={bioHtml} onChange={setBioHtml} label="Full bio (about page)" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Contact email</label>
          <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">CV link (optional)</label>
          <input
            className={input}
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Social links</label>
        <div className="space-y-2">
          {socials.map((s, i) => (
            <div key={i} className="flex gap-2">
              <select
                className="rounded-md border border-line bg-white px-2 py-2 text-sm"
                value={s.platform}
                onChange={(e) =>
                  setSocials((arr) =>
                    arr.map((x, xi) => (xi === i ? { ...x, platform: e.target.value } : x))
                  )
                }
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                className={input}
                placeholder="https://…"
                value={s.url}
                onChange={(e) =>
                  setSocials((arr) =>
                    arr.map((x, xi) => (xi === i ? { ...x, url: e.target.value } : x))
                  )
                }
              />
              <button
                type="button"
                onClick={() => setSocials((arr) => arr.filter((_, xi) => xi !== i))}
                className="shrink-0 text-xs text-muted hover:text-accent"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSocials((arr) => [...arr, { platform: "instagram", url: "" }])}
          className="mt-2 text-sm text-accent hover:underline"
        >
          + Add link
        </button>
      </div>

      <div className="border-t border-line pt-5">
        <label className="mb-2 block text-sm font-medium">Typography</label>
        <p className="mb-3 text-xs text-muted">
          Changes apply live on the site as soon as you save — no rebuild needed.
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="mb-1 block text-xs font-medium text-muted">Body font</label>
            <select
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
              value={bodyFont}
              onChange={(e) => setBodyFont(e.target.value)}
            >
              <option value="">Default (Nunito Sans)</option>
              {FONT_OPTIONS.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Body weight</label>
                <select
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
                  value={bodyFontWeight}
                  onChange={(e) => setBodyFontWeight(e.target.value)}
                >
                  <option value="">Default (Regular)</option>
                  {FONT_WEIGHT_OPTIONS.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Body style</label>
                <select
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
                  value={bodyFontStyle}
                  onChange={(e) => setBodyFontStyle(e.target.value)}
                >
                  <option value="">Default (Normal)</option>
                  {FONT_STYLE_OPTIONS.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p
              className="mt-2 rounded-md border border-line bg-paper-dim p-3 text-sm"
              style={{
                fontFamily: selectedBodyFont ? `var(${selectedBodyFont.variable})` : undefined,
                fontStyle: selectedBodyStyle?.value,
                fontWeight: selectedBodyWeight?.value,
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
          <div className="space-y-3">
            <label className="mb-1 block text-xs font-medium text-muted">Heading font</label>
            <select
              className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
              value={titleFont}
              onChange={(e) => setTitleFont(e.target.value)}
            >
              <option value="">Default (Shick)</option>
              {FONT_OPTIONS.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Heading weight</label>
                <select
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
                  value={titleFontWeight}
                  onChange={(e) => setTitleFontWeight(e.target.value)}
                >
                  <option value="">Default (Regular)</option>
                  {FONT_WEIGHT_OPTIONS.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted">Heading style</label>
                <select
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-accent"
                  value={titleFontStyle}
                  onChange={(e) => setTitleFontStyle(e.target.value)}
                >
                  <option value="">Default (Normal)</option>
                  {FONT_STYLE_OPTIONS.map((f) => (
                    <option key={f.key} value={f.key}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p
              className="mt-2 rounded-md border border-line bg-paper-dim p-3 text-lg text-accent"
              style={{
                fontFamily: selectedTitleFont ? `var(${selectedTitleFont.variable})` : undefined,
                fontStyle: selectedTitleStyle?.value,
                fontWeight: selectedTitleWeight?.value,
              }}
            >
              The quick brown fox
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <label className="mb-2 block text-sm font-medium">Bottom nav</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={navVideo}
              onChange={(e) => setNavVideo(e.target.checked)}
            />
            Video
          </label>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={navWriting}
              onChange={(e) => setNavWriting(e.target.checked)}
            />
            Writing
          </label>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={navPhoto}
              onChange={(e) => setNavPhoto(e.target.checked)}
            />
            Photo
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}
      {saved && <p className="text-sm text-accent">Saved ✓</p>}

      <div className="flex items-center gap-3 border-t border-line pt-5">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-paper hover:bg-accent-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save profile"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="text-sm text-muted hover:text-accent"
        >
          Back
        </button>
      </div>
    </form>
  );
}
