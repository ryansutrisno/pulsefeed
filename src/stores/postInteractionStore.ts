import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface PostInteractionState {
  likedPosts: Set<string>;
  toggleLike: (postId: string) => void;
  isLiked: (postId: string) => boolean;
}
export const usePostInteractionStore = create<PostInteractionState>()(
  persist(
    (set, get) => ({
      likedPosts: new Set(),
      toggleLike: (postId: string) => set((state) => {
        const newLikedPosts = new Set(state.likedPosts);
        if (newLikedPosts.has(postId)) {
          newLikedPosts.delete(postId);
        } else {
          newLikedPosts.add(postId);
        }
        return { likedPosts: newLikedPosts };
      }),
      isLiked: (postId: string) => get().likedPosts.has(postId),
    }),
    {
      name: 'pulsefeed-post-interaction-storage',
      storage: createJSONStorage(() => localStorage, {
        replacer: (key, value) => {
          if (value instanceof Set) {
            return {
              dataType: 'Set',
              value: Array.from(value),
            };
          }
          return value;
        },
        reviver: (key, value) => {
          if (typeof value === 'object' && value !== null && value.dataType === 'Set') {
            return new Set(value.value);
          }
          return value;
        },
      }),
    }
  )
);