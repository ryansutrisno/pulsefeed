/**
 * Minimal real-world demo: One Durable Object instance per entity (User, ChatBoard), with Indexes for listing.
 */
import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Post } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS } from "@shared/mock-data";
// USER ENTITY: one DO instance per user
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
// CHAT BOARD ENTITY: one DO instance per chat board, stores its own messages
export type ChatBoardState = Chat & { messages: ChatMessage[] };
const SEED_CHAT_BOARDS: ChatBoardState[] = MOCK_CHATS.map(c => ({
  ...c,
  messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
}));
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = SEED_CHAT_BOARDS;
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
// MOCK POSTS DATA
const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    platform: 'instagram',
    authorName: 'Cloudflare',
    authorHandle: 'cloudflare',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1737129883262955520/y_X3_d-g_400x400.jpg',
    content: 'The future of the internet is being built on Cloudflare. We\'re excited to see what you build next. #internet #security #performance',
    mediaUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2574&auto=format&fit=crop',
    mediaAspectRatio: 1.91 / 1,
    likes: 12034,
    comments: 489,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    mockComments: [
      { id: 'c1-1', authorName: 'DevRel', authorHandle: 'devrel', authorAvatar: 'https://i.pravatar.cc/150?u=devrel', content: 'Workers is a game changer!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() },
      { id: 'c1-2', authorName: 'Startup Founder', authorHandle: 'founder123', authorAvatar: 'https://i.pravatar.cc/150?u=founder123', content: 'We built our entire stack on Cloudflare. Never been faster.', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    ]
  },
  {
    id: 'p2',
    platform: 'threads',
    authorName: 'Michelle Obama',
    authorHandle: 'michelleobama',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1805601833732820992/5l2E22y__400x400.jpg',
    content: 'Just finished a great book! What is everyone reading right now? Looking for recommendations. 📚',
    likes: 56000,
    comments: 3200,
    shares: 4500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    mockComments: [
      { id: 'c2-1', authorName: 'Book Worm', authorHandle: 'booklover', authorAvatar: 'https://i.pravatar.cc/150?u=booklover', content: '"The Midnight Library" by Matt Haig is a fantastic read!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
      { id: 'c2-2', authorName: 'Reader Digest', authorHandle: 'reader', authorAvatar: 'https://i.pravatar.cc/150?u=reader', content: 'Just started "Project Hail Mary", can\'t put it down!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
      { id: 'c2-3', authorName: 'Sarah J.', authorHandle: 'sarahj', authorAvatar: 'https://i.pravatar.cc/150?u=sarahj', content: 'Highly recommend "Becoming" 😉', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    ]
  },
  {
    id: 'p3',
    platform: 'instagram',
    authorName: 'Nat Geo',
    authorHandle: 'natgeo',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1773322499315593216/iC-2_hwn_400x400.jpg',
    content: 'A stunning view of the aurora borealis from Iceland. Photo by @photographer',
    mediaUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 0.8 / 1,
    likes: 250000,
    comments: 1200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    mockComments: [
        { id: 'c3-1', authorName: 'Traveler', authorHandle: 'globetrotter', authorAvatar: 'https://i.pravatar.cc/150?u=globetrotter', content: 'Bucket list item right there!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString() },
    ]
  },
  {
    id: 'p4',
    platform: 'threads',
    authorName: 'Mark Zuckerberg',
    authorHandle: 'zuck',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1679530217988571136/3uDR1v2l_400x400.jpg',
    content: 'Threads is growing faster than we expected. Thanks to everyone for the feedback and support!',
    likes: 125000,
    comments: 8000,
    shares: 15000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'p5',
    platform: 'instagram',
    authorName: 'Gordon Ramsay',
    authorHandle: 'gordongram',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1783518935679397888/P5y4q89d_400x400.jpg',
    content: 'This is what I call a perfect steak! Absolutely beautiful. #food #steak #chef',
    mediaUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f67b?q=80&w=2574&auto=format&fit=crop',
    mediaAspectRatio: 1,
    likes: 89000,
    comments: 4200,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'p6',
    platform: 'threads',
    authorName: 'Adam Mosseri',
    authorHandle: 'mosseri',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1676623254923345920/2Y9m232a_400x400.jpg',
    content: 'We are working on adding a chronological feed option to Threads. Stay tuned for updates!',
    likes: 78000,
    comments: 6500,
    shares: 9200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'p7',
    platform: 'instagram',
    authorName: 'NASA',
    authorHandle: 'nasa',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1321163587679784960/0ZxKlEKB_400x400.jpg',
    content: 'A new image from the James Webb Space Telescope reveals stunning details of a distant galaxy.',
    mediaUrl: 'https://images.unsplash.com/photo-1614726347312-3842c457a652?q=80&w=2574&auto=format&fit=crop',
    mediaAspectRatio: 1,
    likes: 1200000,
    comments: 8000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'p8',
    platform: 'threads',
    authorName: 'Gary Vaynerchuk',
    authorHandle: 'garyvee',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1786065113258123264/239OQR2k_400x400.jpg',
    content: 'Stop complaining, start doing. Your actions define you, not your words.',
    likes: 42000,
    comments: 2100,
    shares: 11000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: 'p9',
    platform: 'instagram',
    authorName: 'Apple',
    authorHandle: 'apple',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1788222287633371136/MM92p37V_400x400.png',
    content: 'Designed to be loved. #iPhone',
    mediaUrl: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 1,
    likes: 980000,
    comments: 15000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: 'p10',
    platform: 'threads',
    authorName: 'Hono',
    authorHandle: 'honojs',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1647435160990318592/y23X9z3C_400x400.jpg',
    content: 'Hono is now faster than ever. Build your next web application on the edge with us!',
    likes: 9800,
    comments: 300,
    shares: 1200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'p11',
    platform: 'instagram',
    authorName: 'The Economist',
    authorHandle: 'theeconomist',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1744633807259275264/rS2c0pI4_400x400.jpg',
    content: 'A look at the global economy in 2024. Our latest issue is out now.',
    mediaUrl: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 1.91 / 1,
    likes: 45000,
    comments: 800,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'p12',
    platform: 'threads',
    authorName: 'React',
    authorHandle: 'reactjs',
    authorAvatar: 'https://pbs.twimg.com/profile_images/446356636710363136/KpdzmV8a_400x400.jpeg',
    content: 'React 19 is here! With the new compiler, your apps will be faster than ever. Check out the docs to learn more.',
    likes: 67000,
    comments: 2300,
    shares: 18000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'p13',
    platform: 'instagram',
    authorName: 'Taylor Swift',
    authorHandle: 'taylorswift',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1786833096595771392/iI-2C2pL_400x400.jpg',
    content: 'THE TORTURED POETS DEPARTMENT. An anthology of new works that reflect events, opinions and sentiments from a fleeting and fatalistic moment in time - one that was both sensational and sorrowful in equal measure. This period of the author’s life is now over, the chapter closed and boarded up. There is nothing to avenge, no scores to settle once wounds have healed. And upon further reflection, a good number of them turned out to be self-inflicted. This writer is of the firm belief that our tears become holy in the form of ink on a page. Once we have spoken our saddest story, we can be free of it.\n\nAnd then all that’s left is the tortured poetry.',
    mediaUrl: 'https://images.unsplash.com/photo-1504805572947-34fad45a4932?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 1,
    likes: 13_200_000,
    comments: 450_000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: 'p14',
    platform: 'threads',
    authorName: 'Vercel',
    authorHandle: 'vercel',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1790074503924199424/A2oX8a-S_400x400.jpg',
    content: 'v0: a new generative UI system from Vercel. Generate UI from text prompts and images. Copy to clipboard, or download the code. Now in public beta.',
    likes: 22000,
    comments: 980,
    shares: 5400,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 'p15',
    platform: 'instagram',
    authorName: 'Patagonia',
    authorHandle: 'patagonia',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1570164324893290496/V__2x3tL_400x400.jpg',
    content: 'The Earth is now our only shareholder. #activism #environment',
    mediaUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2674&auto=format&fit=crop',
    mediaAspectRatio: 1.91 / 1,
    likes: 345000,
    comments: 7600,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: 'p16',
    platform: 'threads',
    authorName: 'Elon Musk',
    authorHandle: 'elonmusk',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg',
    content: 'Starship is ready for launch.',
    likes: 2_100_000,
    comments: 150_000,
    shares: 350_000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'p17',
    platform: 'instagram',
    authorName: 'Lofi Girl',
    authorHandle: 'lofigirl',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1646147438959271937/C278_2EH_400x400.jpg',
    content: 'New beats to relax/study to are now live on YouTube. 🎶',
    mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 16 / 9,
    likes: 150000,
    comments: 3200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    id: 'p18',
    platform: 'threads',
    authorName: 'Figma',
    authorHandle: 'figma',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1767560353935978496/235kM3_h_400x400.jpg',
    content: 'Introducing variables in Figma. A new way to build and scale design systems.',
    likes: 45000,
    comments: 1200,
    shares: 8900,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: 'p19',
    platform: 'instagram',
    authorName: 'GoPro',
    authorHandle: 'gopro',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1701657034142957568/Y-8gCarni_400x400.jpg',
    content: 'Chasing waterfalls with the new #GoProHERO12 Black.',
    mediaUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2574&auto=format&fit=crop',
    mediaAspectRatio: 0.8 / 1,
    likes: 230000,
    comments: 4500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
  },
  {
    id: 'p20',
    platform: 'threads',
    authorName: 'Tailwind CSS',
    authorHandle: 'tailwindcss',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1730334391501488129/G0R0sjHH_400x400.jpg',
    content: 'We just released Tailwind CSS v4.0! It’s faster, simpler, and more powerful than ever before. Check out the release notes for all the details.',
    likes: 32000,
    comments: 800,
    shares: 7600,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
  },
  {
    id: 'p21',
    platform: 'instagram',
    authorName: 'Airbnb',
    authorHandle: 'airbnb',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1658582364428865536/Jp0v4qjA_400x400.jpg',
    content: 'Find your home away from home. Where are you traveling next?',
    mediaUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 1,
    likes: 450000,
    comments: 9800,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: 'p22',
    platform: 'threads',
    authorName: 'GitHub',
    authorHandle: 'github',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg',
    content: 'Copilot Workspace: The AI-native developer environment. From idea to code, all in natural language.',
    likes: 55000,
    comments: 2100,
    shares: 12000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    id: 'p23',
    platform: 'instagram',
    authorName: 'Lego',
    authorHandle: 'lego',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1532023249998688256/iJ3-d-iB_400x400.jpg',
    content: 'Building dreams, one brick at a time. What will you create?',
    mediaUrl: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=2670&auto=format&fit=crop',
    mediaAspectRatio: 1.91 / 1,
    likes: 670000,
    comments: 12000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString(),
  },
  {
    id: 'p24',
    platform: 'threads',
    authorName: 'Naval',
    authorHandle: 'naval',
    authorAvatar: 'https://pbs.twimg.com/profile_images/1256841238298333184/7a4p1e5b_400x400.jpg',
    content: 'The measure of wealth is freedom. The measure of health is lightness. The measure of intellect is judgment. The measure of wisdom is silence. The measure of love is peace.',
    likes: 98000,
    comments: 3400,
    shares: 45000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  }
];
// POST ENTITY
export class PostEntity extends IndexedEntity<Post> {
  static readonly entityName = "post";
  static readonly indexName = "posts";
  static readonly initialState: Post = {
    id: '',
    platform: 'instagram',
    authorName: '',
    authorHandle: '',
    authorAvatar: '',
    content: '',
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
  };
  static seedData = MOCK_POSTS;
}