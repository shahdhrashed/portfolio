import type {
  WorkItem,
  Category,
  Profile,
  PhotoStory,
  VideoWork,
  Article,
} from "./types";

/**
 * Bundled demo content. Used automatically whenever no Sanity project is
 * configured, so the site is fully browseable in development and as a live
 * demo. Replaced transparently by real CMS data once Shahd connects Sanity.
 */

const img = (seed: string, w = 1200, h = 800) => ({
  url: `https://picsum.photos/seed/${seed}/${w}/${h}`,
  alt: "",
});

export const sampleCategories: Category[] = [
  { _id: "c1", title: "News reports", slug: "news-reports" },
  { _id: "c2", title: "Documentary", slug: "documentary" },
  { _id: "c3", title: "Interviews", slug: "interviews" },
  { _id: "c4", title: "Opinion", slug: "opinion" },
  { _id: "c5", title: "Photojournalism", slug: "photojournalism" },
];

const videos: VideoWork[] = [
  {
    _id: "v1",
    type: "video",
    title: "Inside the city's night markets: a documentary",
    slug: "night-markets-documentary",
    excerpt:
      "A 19-minute documentary following the vendors who keep the old quarter alive after dark.",
    category: sampleCategories[1],
    date: "2026-05-02",
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    duration: "18:42",
    description:
      "Shot over six weeks, this short documentary follows three families whose livelihoods depend on the night markets, capturing a side of the city most residents never see.",
    coverImage: img("nightmarket"),
  },
  {
    _id: "v2",
    type: "video",
    title: "On the ground: covering the spring floods",
    slug: "spring-floods-report",
    excerpt: "A field report from the riverside districts during the worst flooding in a decade.",
    category: sampleCategories[0],
    date: "2026-03-18",
    featured: false,
    videoUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    duration: "06:11",
    description:
      "A breaking-news package produced on a 24-hour turnaround, combining on-scene reporting with interviews from emergency services.",
    coverImage: img("floods"),
  },
  {
    _id: "v3",
    type: "video",
    title: "In conversation with a war correspondent",
    slug: "war-correspondent-interview",
    excerpt: "A long-form interview on ethics, fear, and telling the truth under fire.",
    category: sampleCategories[2],
    date: "2026-01-27",
    featured: true,
    videoUrl: "https://www.youtube.com/watch?v=BHACKCNDMW8",
    duration: "32:05",
    description:
      "A studio interview exploring the craft and the cost of front-line reporting.",
    coverImage: img("interview"),
  },
];

const articles: Article[] = [
  {
    _id: "a1",
    type: "article",
    title: "Why local radio still matters in 2026",
    slug: "local-radio-2026",
    excerpt:
      "Streaming was supposed to kill the radio star. In small communities, the opposite happened.",
    category: sampleCategories[3],
    date: "2026-04-21",
    featured: true,
    coverImage: img("radio"),
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "When the last music shop on the high street closed, everyone assumed local radio would follow. It didn't. Across the region, small stations are reporting their highest listener numbers in years.",
            marks: [],
          },
        ],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "b2",
        style: "h2",
        children: [{ _type: "span", _key: "s2", text: "The trust dividend", marks: [] }],
        markDefs: [],
      },
      {
        _type: "block",
        _key: "b3",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s3",
            text: "In an era of algorithmic feeds, a familiar human voice reading the morning headlines turns out to be a feature, not a relic.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _id: "a2",
    type: "article",
    title: "Field notes: a week reporting from the border",
    slug: "field-notes-border",
    excerpt: "What the wire stories leave out — the waiting, the weather, and the people.",
    category: sampleCategories[0],
    date: "2026-02-09",
    featured: false,
    coverImage: img("border"),
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "s1",
            text: "The first thing nobody tells you about reporting from a border crossing is how much of the job is simply waiting, and watching, and earning the right to ask a question.",
            marks: [],
          },
        ],
        markDefs: [],
      },
    ],
  },
];

const photoStories: PhotoStory[] = [
  {
    _id: "p1",
    type: "photo",
    title: "Faces of the harvest",
    slug: "faces-of-the-harvest",
    excerpt: "Twelve portraits from a season spent with the families who bring in the crop.",
    category: sampleCategories[4],
    date: "2026-04-05",
    featured: true,
    coverImage: img("harvest1"),
    description:
      "A photo essay documenting the people behind the autumn harvest, shot across three farms over two months.",
    gallery: [
      { ...img("harvest1"), caption: "Dawn, before the first row." },
      { ...img("harvest2"), caption: "Hands that have done this for forty years." },
      { ...img("harvest3"), caption: "The midday break." },
      { ...img("harvest4"), caption: "Loading the last truck." },
    ],
  },
  {
    _id: "p2",
    type: "photo",
    title: "The commute",
    slug: "the-commute",
    excerpt: "A morning on the city's oldest tram line, in black and white.",
    category: sampleCategories[4],
    date: "2026-01-12",
    featured: false,
    coverImage: img("commute1"),
    description: "An early-morning study of the rhythms of public transport.",
    gallery: [
      { ...img("commute1"), caption: "6:04 — the first departure." },
      { ...img("commute2"), caption: "Standing room only." },
      { ...img("commute3"), caption: "The end of the line." },
    ],
  },
];

export const sampleWork: WorkItem[] = [...videos, ...articles, ...photoStories].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);

export const sampleProfile: Profile = {
  name: "Shahd",
  headline: "Mass communication · journalism & media",
  shortBio:
    "I'm a mass communication student telling stories in video, words, and image — from field reports and documentaries to long-form writing and photojournalism.",
  bio: "I'm a mass communication student focused on journalism and media production. My work spans video reporting, documentary, written features, and photojournalism. This site is a living archive of what I make — the published pieces, the experiments, and everything in between.",
  headshot: img("portrait", 600, 600),
  email: "hello@example.com",
  cvUrl: undefined,
  socials: [
    { platform: "instagram", url: "https://instagram.com" },
    { platform: "linkedin", url: "https://linkedin.com" },
    { platform: "youtube", url: "https://youtube.com" },
  ],
};
