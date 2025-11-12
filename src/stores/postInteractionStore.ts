import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface PostInteractionState {
  likedPosts: Set<string>;
  toggleLike: (postId: string) => void;
  isLiked: (postId: string) => boolean;
}
// Type for the serialized Set object in localStorage
interface SerializedSet {
  dataType: 'Set';
  value: unknown[];
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
          // Type guard to safely handle rehydration of Set from localStorage
          if (typeof value === 'object' && value !== null) {
            const potentialSet = value as SerializedSet;
            if (potentialSet.dataType === 'Set' && Array.isArray(potentialSet.value)) {
              return new Set(potentialSet.value);
            }
          }
          return value;
        },
      }),
    }
  )
);