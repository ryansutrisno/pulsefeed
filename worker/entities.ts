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