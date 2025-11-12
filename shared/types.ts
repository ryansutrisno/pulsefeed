export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// PulseFeed Comment Type
export interface Comment {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  createdAt: string; // ISO 8601 string
}
// PulseFeed Post Type
export interface Post {
  id: string;
  platform: 'instagram' | 'threads';
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  mediaUrl?: string;
  mediaAspectRatio?: number; // e.g., 1 for square, 1.91 for landscape, 0.8 for portrait
  likes: number;
  comments: number;
  shares?: number; // Threads has shares/reposts
  createdAt: string; // ISO 8601 string
  mockComments?: Comment[];
}