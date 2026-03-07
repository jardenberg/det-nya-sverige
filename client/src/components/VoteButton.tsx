/**
 * VoteButton – Upvote/support button for each policy point
 * Warm light theme, integrates with tRPC backend
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getLoginUrl } from "@/const";

interface VoteButtonProps {
  pointId: number;
  layout?: "left" | "right" | "center";
}

export default function VoteButton({ pointId, layout = "left" }: VoteButtonProps) {
  const { lang } = useLang();
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  // Get vote counts and user's votes
  const { data: voteCounts } = trpc.votes.counts.useQuery();
  const { data: myVotes } = trpc.votes.myVotes.useQuery();

  const hasVoted = myVotes?.includes(pointId) ?? false;
  const count = voteCounts?.[pointId] ?? 0;

  const [animating, setAnimating] = useState(false);

  const toggleMutation = trpc.votes.toggle.useMutation({
    onMutate: async () => {
      // Optimistic update
      await utils.votes.counts.cancel();
      await utils.votes.myVotes.cancel();

      const prevCounts = utils.votes.counts.getData();
      const prevMyVotes = utils.votes.myVotes.getData();

      // Update counts optimistically
      utils.votes.counts.setData(undefined, (old) => {
        if (!old) return old;
        const newCounts = { ...old };
        newCounts[pointId] = (newCounts[pointId] ?? 0) + (hasVoted ? -1 : 1);
        return newCounts;
      });

      // Update myVotes optimistically
      utils.votes.myVotes.setData(undefined, (old) => {
        if (!old) return old;
        if (hasVoted) {
          return old.filter((id) => id !== pointId);
        }
        return [...old, pointId];
      });

      return { prevCounts, prevMyVotes };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevCounts) utils.votes.counts.setData(undefined, context.prevCounts);
      if (context?.prevMyVotes) utils.votes.myVotes.setData(undefined, context.prevMyVotes);
    },
    onSettled: () => {
      utils.votes.counts.invalidate();
      utils.votes.myVotes.invalidate();
    },
  });

  const handleVote = useCallback(() => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setAnimating(true);
    toggleMutation.mutate({ pointId });
    setTimeout(() => setAnimating(false), 600);
  }, [isAuthenticated, pointId, toggleMutation]);

  return (
    <motion.button
      onClick={handleVote}
      className={`group flex items-center gap-2.5 py-2 px-4 rounded-full transition-all duration-300 cursor-pointer ${
        hasVoted
          ? "shadow-sm"
          : "hover:shadow-sm"
      }`}
      style={{
        backgroundColor: hasVoted ? 'oklch(0.92 0.06 55)' : 'oklch(0.95 0.02 75 / 0.6)',
        border: hasVoted ? '1.5px solid oklch(0.68 0.14 65 / 0.5)' : '1.5px solid oklch(0.85 0.04 75)',
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={hasVoted ? t("voteButtonVoted", lang) : t("voteButton", lang)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={hasVoted ? "voted" : "not-voted"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${hasVoted ? "fill-current" : ""}`}
            style={{ color: hasVoted ? '#9B6B1A' : '#8a7a6a' }}
            strokeWidth={hasVoted ? 0 : 1.5}
          />
        </motion.div>
      </AnimatePresence>

      {/* Burst animation on vote */}
      <AnimatePresence>
        {animating && !hasVoted && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{ backgroundColor: '#9B6B1A' }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                  opacity: [1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <span
        className="font-body text-xs tracking-wider uppercase"
        style={{ color: hasVoted ? '#9B6B1A' : '#8a7a6a' }}
      >
        {hasVoted ? t("voteButtonVoted", lang) : t("voteButton", lang)}
      </span>

      <motion.span
        className="font-mono-display text-sm font-bold"
        style={{ color: hasVoted ? '#9B6B1A' : '#6a5a4a' }}
        key={count}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {count}
      </motion.span>
    </motion.button>
  );
}
