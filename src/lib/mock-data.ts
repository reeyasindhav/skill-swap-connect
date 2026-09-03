export type SkillCategory = "Design" | "Technology" | "Creative" | "Languages" | "Lifestyle";

export type Person = {
  id: string;
  name: string;
  initials: string;
  headline: string;
  location: string;
  rating: number;
  reviewCount: number;
  match: number;
  teaches: string[];
  learns: string[];
  categories: SkillCategory[];
  bio: string;
  availability: string;
  swaps: number;
  joined: string;
  tone: "mint" | "honey" | "forest";
};

export const currentUser = {
  name: "Alex Lee",
  initials: "AL",
  headline: "Writer, gardener & weekend baker",
  location: "Brooklyn, NY",
  rating: 4.9,
  reviewCount: 21,
  swapsCompleted: 4,
  openConversations: 2,
  teaches: ["Writing & editing", "Notion", "Gardening"],
  learns: ["Sourdough baking", "Conversational French", "Watercolor"],
  bio: "I write for a living and garden for my sanity. Happy to trade clear-writing sessions for anything that gets flour or paint on my hands.",
};

export const people: Person[] = [
  {
    id: "maya-chen",
    name: "Maya Chen",
    initials: "MC",
    headline: "UX designer & curious maker",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviewCount: 18,
    match: 96,
    teaches: ["Figma", "UX Research", "Prototyping"],
    learns: ["Ceramics", "Spanish"],
    categories: ["Design", "Technology"],
    bio: "Ten years designing products, still a beginner at everything else. I run casual Figma jams and love teaching research fundamentals to people outside of tech.",
    availability: "Weekday evenings",
    swaps: 18,
    joined: "March 2024",
    tone: "forest",
  },
  {
    id: "jordan-williams",
    name: "Jordan Williams",
    initials: "JW",
    headline: "Product photographer",
    location: "Austin, TX",
    rating: 5.0,
    reviewCount: 24,
    match: 88,
    teaches: ["Photography", "Lightroom", "Branding"],
    learns: ["Copywriting", "Cooking"],
    categories: ["Creative", "Design"],
    bio: "I shoot small-brand product work out of a garage studio. Teaching light and composition is the fastest way I know to make someone's work look twice as good.",
    availability: "Weekends",
    swaps: 24,
    joined: "January 2024",
    tone: "honey",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    headline: "Frontend developer & illustrator",
    location: "Toronto, CA",
    rating: 4.8,
    reviewCount: 12,
    match: 84,
    teaches: ["React", "Illustration", "HTML & CSS"],
    learns: ["Public Speaking", "Piano"],
    categories: ["Technology", "Creative"],
    bio: "I build interfaces by day and draw stubborn cats by night. Patient with total beginners — we start from what you actually want to build.",
    availability: "Tue & Thu evenings",
    swaps: 12,
    joined: "June 2024",
    tone: "mint",
  },
  {
    id: "sofia-marino",
    name: "Sofia Marino",
    initials: "SM",
    headline: "Pastry chef & sourdough obsessive",
    location: "Chicago, IL",
    rating: 4.9,
    reviewCount: 31,
    match: 92,
    teaches: ["Sourdough baking", "Pastry", "Italian"],
    learns: ["Writing & editing", "Notion"],
    categories: ["Lifestyle", "Languages"],
    bio: "Fifteen years in professional kitchens. My starter is older than my cat. I teach bread the slow, unhurried way — one loaf, start to finish.",
    availability: "Sunday mornings",
    swaps: 31,
    joined: "November 2023",
    tone: "honey",
  },
  {
    id: "tomas-ferreira",
    name: "Tomás Ferreira",
    initials: "TF",
    headline: "Language coach & podcast host",
    location: "Lisbon, PT",
    rating: 4.7,
    reviewCount: 15,
    match: 81,
    teaches: ["Conversational French", "Portuguese", "Public Speaking"],
    learns: ["Gardening", "React"],
    categories: ["Languages"],
    bio: "Conversation first, grammar later. Twenty minutes of real talking beats an hour of drills, and I will happily be the person you embarrass yourself in front of.",
    availability: "Flexible",
    swaps: 15,
    joined: "August 2024",
    tone: "mint",
  },
  {
    id: "aisha-bello",
    name: "Aisha Bello",
    initials: "AB",
    headline: "Watercolorist & art teacher",
    location: "London, UK",
    rating: 5.0,
    reviewCount: 27,
    match: 89,
    teaches: ["Watercolor", "Sketching", "Color theory"],
    learns: ["Notion", "Photography"],
    categories: ["Creative"],
    bio: "I taught secondary-school art for nine years. Nobody is bad at drawing — most people are just impatient. We fix that with tiny daily studies.",
    availability: "Weekday afternoons",
    swaps: 27,
    joined: "February 2024",
    tone: "forest",
  },
  {
    id: "leo-kaufman",
    name: "Leo Kaufman",
    initials: "LK",
    headline: "Ceramicist & studio tinkerer",
    location: "Portland, OR",
    rating: 4.6,
    reviewCount: 9,
    match: 76,
    teaches: ["Ceramics", "Woodworking"],
    learns: ["Branding", "Figma"],
    categories: ["Creative", "Lifestyle"],
    bio: "Shared studio, two wheels, one very forgiving kiln. Wheel-throwing basics in an afternoon, then it's just repetition and mud.",
    availability: "Saturdays",
    swaps: 9,
    joined: "May 2024",
    tone: "mint",
  },
  {
    id: "hana-sato",
    name: "Hana Sato",
    initials: "HS",
    headline: "Pianist & music tutor",
    location: "Seattle, WA",
    rating: 4.8,
    reviewCount: 22,
    match: 79,
    teaches: ["Piano", "Music theory", "Japanese"],
    learns: ["Illustration", "Gardening"],
    categories: ["Creative", "Languages"],
    bio: "Classically trained, casually inclined. If you have a keyboard and thirty minutes a day, you'll be playing something you like within a month.",
    availability: "Weekday mornings",
    swaps: 22,
    joined: "December 2023",
    tone: "honey",
  },
];

export const skillFilters = [
  "All skills",
  "Design",
  "Technology",
  "Creative",
  "Languages",
  "Lifestyle",
] as const;

export type Swap = {
  id: string;
  personId: string;
  youTeach: string;
  youLearn: string;
  status: "pending" | "active" | "completed" | "declined";
  nextSession: string;
  progress: number;
  note: string;
};

export const swaps: Swap[] = [
  {
    id: "swp-1042",
    personId: "sofia-marino",
    youTeach: "Writing & editing",
    youLearn: "Sourdough baking",
    status: "active",
    nextSession: "Sun, Sep 6 · 10:00 AM",
    progress: 60,
    note: "Session 3 of 5 — shaping and scoring.",
  },
  {
    id: "swp-1039",
    personId: "tomas-ferreira",
    youTeach: "Gardening",
    youLearn: "Conversational French",
    status: "active",
    nextSession: "Thu, Sep 4 · 7:30 PM",
    progress: 35,
    note: "Weekly 30-minute conversation swap.",
  },
  {
    id: "swp-1051",
    personId: "aisha-bello",
    youTeach: "Notion",
    youLearn: "Watercolor",
    status: "pending",
    nextSession: "Awaiting response",
    progress: 0,
    note: "You proposed a 4-session trade.",
  },
  {
    id: "swp-0994",
    personId: "maya-chen",
    youTeach: "Writing & editing",
    youLearn: "Figma",
    status: "completed",
    nextSession: "Finished Aug 12",
    progress: 100,
    note: "5 sessions · reviewed both ways.",
  },
  {
    id: "swp-0977",
    personId: "jordan-williams",
    youTeach: "Writing & editing",
    youLearn: "Photography",
    status: "completed",
    nextSession: "Finished Jul 28",
    progress: 100,
    note: "3 sessions · portfolio shoot day.",
  },
  {
    id: "swp-0961",
    personId: "hana-sato",
    youTeach: "Gardening",
    youLearn: "Piano",
    status: "declined",
    nextSession: "Declined Jul 2",
    progress: 0,
    note: "Schedules didn't line up this season.",
  },
];

export type Review = {
  id: string;
  authorId: string;
  targetId: string;
  rating: number;
  skill: string;
  date: string;
  body: string;
};

export const reviews: Review[] = [
  {
    id: "rv-1",
    authorId: "maya-chen",
    targetId: "me",
    rating: 5,
    skill: "Writing & editing",
    date: "Aug 14, 2026",
    body: "Alex rewrote my portfolio intro live on a call and explained every cut. I've reused that structure four times since.",
  },
  {
    id: "rv-2",
    authorId: "jordan-williams",
    targetId: "me",
    rating: 5,
    skill: "Writing & editing",
    date: "Jul 30, 2026",
    body: "Generous with time, direct with feedback. Showed up prepared every single session.",
  },
  {
    id: "rv-3",
    authorId: "sofia-marino",
    targetId: "me",
    rating: 5,
    skill: "Notion",
    date: "Jun 19, 2026",
    body: "Built me a recipe-testing system I actually use. No jargon, just useful.",
  },
  {
    id: "rv-4",
    authorId: "priya-nair",
    targetId: "maya-chen",
    rating: 5,
    skill: "UX Research",
    date: "Aug 2, 2026",
    body: "Maya turned a vague idea into a real interview script in one hour. Best swap I've done here.",
  },
  {
    id: "rv-5",
    authorId: "aisha-bello",
    targetId: "jordan-williams",
    rating: 5,
    skill: "Photography",
    date: "Jul 11, 2026",
    body: "Two hours with Jordan fixed lighting problems I'd had for a year.",
  },
  {
    id: "rv-6",
    authorId: "leo-kaufman",
    targetId: "priya-nair",
    rating: 4,
    skill: "React",
    date: "Jun 28, 2026",
    body: "Patient and clear. We shipped my studio site by session three.",
  },
];

export type Conversation = {
  id: string;
  personId: string;
  unread: number;
  lastAt: string;
  messages: { from: "me" | "them"; text: string; at: string }[];
};

export const conversations: Conversation[] = [
  {
    id: "cnv-1",
    personId: "sofia-marino",
    unread: 2,
    lastAt: "12 min ago",
    messages: [
      {
        from: "them",
        text: "Feed your starter tonight and we'll shape tomorrow morning!",
        at: "9:02 AM",
      },
      {
        from: "me",
        text: "Done — it doubled in five hours, which feels aggressive?",
        at: "9:20 AM",
      },
      { from: "them", text: "That's a happy starter. Bring it to the call.", at: "9:24 AM" },
      { from: "them", text: "Also I read your editing notes. Ruthless. Loved it.", at: "9:25 AM" },
    ],
  },
  {
    id: "cnv-2",
    personId: "tomas-ferreira",
    unread: 1,
    lastAt: "2 hours ago",
    messages: [
      { from: "me", text: "Thursday still good for our 30 minutes?", at: "7:40 AM" },
      {
        from: "them",
        text: "Oui. Bring three questions about your garden — all in French.",
        at: "10:15 AM",
      },
    ],
  },
  {
    id: "cnv-3",
    personId: "aisha-bello",
    unread: 0,
    lastAt: "Yesterday",
    messages: [
      {
        from: "me",
        text: "Sent over a swap proposal — Notion setup for watercolor basics.",
        at: "4:12 PM",
      },
      {
        from: "them",
        text: "Looking at it tonight. Sounds like a fair trade to me.",
        at: "6:48 PM",
      },
    ],
  },
  {
    id: "cnv-4",
    personId: "maya-chen",
    unread: 0,
    lastAt: "Aug 14",
    messages: [
      {
        from: "them",
        text: "Left you a review. Thanks again for the portfolio surgery.",
        at: "1:05 PM",
      },
      { from: "me", text: "Any time. Ping me when the case study is live.", at: "1:31 PM" },
    ],
  },
];

export type CommunityCircle = {
  id: string;
  name: string;
  members: number;
  blurb: string;
  tone: "mint" | "honey" | "forest";
  tags: string[];
};

export type CommunityEvent = {
  id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  seats: number;
};

export const communityCircles: CommunityCircle[] = [
  {
    id: "makers",
    name: "Weekend Makers",
    members: 1284,
    blurb:
      "Ceramics, woodwork, printmaking — anyone who makes things with their hands on Saturdays.",
    tone: "mint" as const,
    tags: ["Ceramics", "Woodworking", "Printmaking"],
  },
  {
    id: "language-table",
    name: "The Language Table",
    members: 2610,
    blurb: "Thirty-minute conversation swaps in nine languages. No grammar drills allowed.",
    tone: "honey" as const,
    tags: ["Spanish", "French", "Japanese"],
  },
  {
    id: "ship-it",
    name: "Ship It Club",
    members: 942,
    blurb: "Developers and designers trading code review for design critique, every other Tuesday.",
    tone: "forest" as const,
    tags: ["React", "Figma", "UX Research"],
  },
  {
    id: "slow-kitchen",
    name: "Slow Kitchen",
    members: 1733,
    blurb: "Bread, ferments, and the kind of cooking that takes all afternoon.",
    tone: "honey" as const,
    tags: ["Sourdough baking", "Pastry", "Cooking"],
  },
];

export const communityEvents: CommunityEvent[] = [
  {
    id: "ev-1",
    title: "Figma jam for non-designers",
    host: "Maya Chen",
    date: "Thu, Sep 4",
    time: "7:00 PM",
    seats: 8,
  },
  {
    id: "ev-2",
    title: "Starter clinic: fixing sluggish dough",
    host: "Sofia Marino",
    date: "Sun, Sep 7",
    time: "10:00 AM",
    seats: 12,
  },
  {
    id: "ev-3",
    title: "Speak-only-French hour",
    host: "Tomás Ferreira",
    date: "Tue, Sep 9",
    time: "6:30 PM",
    seats: 6,
  },
  {
    id: "ev-4",
    title: "Watercolor: one wash, one hour",
    host: "Aisha Bello",
    date: "Sat, Sep 13",
    time: "2:00 PM",
    seats: 10,
  },
];

export const platformStats = [
  { label: "Skills traded", value: "42,180" },
  { label: "Active members", value: "18,400" },
  { label: "Average rating", value: "4.87" },
  { label: "Cost to swap", value: "$0" },
];

export const allSkills = Array.from(
  new Set(
    people
      .flatMap((p) => [...p.teaches, ...p.learns])
      .concat(currentUser.teaches, currentUser.learns),
  ),
).sort();

export function getPerson(id: string) {
  return people.find((p) => p.id === id);
}
