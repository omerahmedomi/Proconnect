"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Post from "@/components/post";
import { fetchPostsAction } from "@/app/actions/post";
import { LineWave } from "react-loader-spinner";
import { usePathname } from "next/navigation";

export default function FeedList({ initialPosts, userProfile }: { initialPosts: any[], userProfile: any }) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialPosts.length === 10);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  const handleRemovePost = (postId: string) => {
    if (pathname === "/saved") {
      setPosts(prev => prev.filter(p => p._id.toString() !== postId));
    }
  };

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      const nextPosts = await fetchPostsAction(page, 10);
      if (nextPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => {
          // simple deduplication based on _id to prevent double inserts
          const existingIds = new Set(prev.map(p => p._id.toString()));
          const newPosts = nextPosts.filter((p: any) => !existingIds.has(p._id.toString()));
          return [...prev, ...newPosts];
        });
        setPage(prev => prev + 1);
        if (nextPosts.length < 10) setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
        No posts yet. Start a conversation!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;
        return (
          <div 
            key={post._id} 
            ref={isLast ? lastPostElementRef : null} 
            className="w-full"
          >
            <Post post={post} userProfile={userProfile} onRemovePost={() => handleRemovePost(post._id.toString())} />
          </div>
        );
      })}
      
      {loading && (
        <div className="flex justify-center py-4 bg-white rounded-xl shadow-sm border border-gray-200">
          <LineWave height="50" width="50" color="#06b6d4" />
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-6 text-sm text-gray-400">
          You've caught up with all posts.
        </div>
      )}
    </div>
  );
}
