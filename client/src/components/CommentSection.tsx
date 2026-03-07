/**
 * CommentSection – Discussion area for each policy point
 * Warm light theme, integrates with tRPC backend
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Trash2, LogIn, ChevronDown, ChevronUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getLoginUrl } from "@/const";

interface CommentSectionProps {
  pointId: number;
  layout?: "left" | "right" | "center";
}

function timeAgo(date: Date, lang: "sv" | "en"): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return t("commentJustNow", lang);
  if (diffMin < 60) return `${diffMin} ${t("commentMinutesAgo", lang)}`;
  if (diffHrs < 24) return `${diffHrs} ${t("commentHoursAgo", lang)}`;
  return `${diffDays} ${t("commentDaysAgo", lang)}`;
}

export default function CommentSection({ pointId, layout = "left" }: CommentSectionProps) {
  const { lang } = useLang();
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Fetch comments for this point
  const { data: comments, isLoading } = trpc.comments.byPoint.useQuery(
    { pointId },
    { enabled: isOpen }
  );

  // Get comment counts for badge
  const { data: commentCounts } = trpc.comments.counts.useQuery();
  const commentCount = commentCounts?.[pointId] ?? 0;

  // Create comment mutation
  const createMutation = trpc.comments.create.useMutation({
    onSuccess: () => {
      setNewComment("");
      utils.comments.byPoint.invalidate({ pointId });
      utils.comments.counts.invalidate();
    },
  });

  // Delete comment mutation
  const deleteMutation = trpc.comments.delete.useMutation({
    onSuccess: () => {
      utils.comments.byPoint.invalidate({ pointId });
      utils.comments.counts.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;
    createMutation.mutate({ pointId, content: newComment.trim() });
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [newComment]);

  return (
    <div className={`mt-6 ${layout === "center" ? "max-w-xl mx-auto" : ""}`}>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 py-2 px-4 rounded-full transition-all duration-300 cursor-pointer hover:shadow-sm"
        style={{
          backgroundColor: isOpen ? 'oklch(0.92 0.06 55)' : 'oklch(0.95 0.02 75 / 0.6)',
          border: isOpen ? '1.5px solid oklch(0.68 0.14 65 / 0.5)' : '1.5px solid oklch(0.85 0.04 75)',
        }}
      >
        <MessageCircle
          className="w-4 h-4"
          style={{ color: isOpen ? '#9B6B1A' : '#8a7a6a' }}
          strokeWidth={1.5}
        />
        <span
          className="font-body text-xs tracking-wider uppercase"
          style={{ color: isOpen ? '#9B6B1A' : '#8a7a6a' }}
        >
          {t("commentsTitle", lang)}
        </span>
        {commentCount > 0 && (
          <span
            className="font-mono-display text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: 'oklch(0.68 0.14 65 / 0.15)', color: '#9B6B1A' }}
          >
            {commentCount}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 ml-1" style={{ color: '#9B6B1A' }} />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 ml-1" style={{ color: '#8a7a6a' }} />
        )}
      </button>

      {/* Comment panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-4 rounded-lg p-5 md:p-6"
              style={{
                backgroundColor: 'oklch(0.97 0.01 75 / 0.8)',
                border: '1px solid oklch(0.88 0.03 75)',
              }}
            >
              {/* Comment form */}
              {isAuthenticated ? (
                <form onSubmit={handleSubmit} className="mb-5">
                  <div
                    className="flex items-start gap-3 rounded-lg p-3"
                    style={{ backgroundColor: 'oklch(0.99 0.005 75)', border: '1px solid oklch(0.90 0.02 75)' }}
                  >
                    {/* Avatar */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-body text-xs font-bold"
                      style={{ backgroundColor: 'oklch(0.68 0.14 65 / 0.15)', color: '#9B6B1A' }}
                    >
                      {(user?.name || "?")[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <textarea
                        ref={textareaRef}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={t("commentPlaceholder", lang)}
                        className="w-full bg-transparent font-body text-sm resize-none outline-none placeholder:text-[#b0a090] min-h-[2.5rem]"
                        style={{ color: '#3a2a1a' }}
                        rows={1}
                        maxLength={2000}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-body text-[0.6rem]" style={{ color: '#b0a090' }}>
                          {newComment.length}/2000
                        </span>
                        <button
                          type="submit"
                          disabled={!newComment.trim() || createMutation.isPending}
                          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full font-body text-xs tracking-wider uppercase transition-all disabled:opacity-40"
                          style={{
                            backgroundColor: newComment.trim() ? '#9B6B1A' : 'oklch(0.85 0.04 75)',
                            color: newComment.trim() ? '#fff' : '#8a7a6a',
                          }}
                        >
                          <Send className="w-3 h-3" />
                          {t("commentSubmit", lang)}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div
                  className="flex items-center justify-between p-4 rounded-lg mb-5"
                  style={{ backgroundColor: 'oklch(0.93 0.04 55 / 0.3)', border: '1px solid oklch(0.85 0.06 55 / 0.3)' }}
                >
                  <span className="font-body text-sm" style={{ color: '#6a5a4a' }}>
                    {t("commentLoginPrompt", lang)}
                  </span>
                  <a
                    href={getLoginUrl()}
                    className="flex items-center gap-1.5 py-1.5 px-4 rounded-full font-body text-xs tracking-wider uppercase transition-all hover:shadow-sm"
                    style={{ backgroundColor: '#9B6B1A', color: '#fff' }}
                  >
                    <LogIn className="w-3 h-3" />
                    {t("commentLoginButton", lang)}
                  </a>
                </div>
              )}

              {/* Comments list */}
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center py-6">
                    <motion.div
                      className="w-5 h-5 rounded-full border-2"
                      style={{ borderColor: 'oklch(0.68 0.14 65 / 0.3)', borderTopColor: '#9B6B1A' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : comments && comments.length > 0 ? (
                  comments.map((comment, idx) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      {/* Avatar */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-body text-[0.6rem] font-bold"
                        style={{ backgroundColor: 'oklch(0.90 0.04 75)', color: '#6a5a4a' }}
                      >
                        {(comment.authorName || "?")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-body text-xs font-medium" style={{ color: '#3a2a1a' }}>
                            {comment.authorName || "Anonym"}
                          </span>
                          <span className="font-body text-[0.6rem]" style={{ color: '#b0a090' }}>
                            {timeAgo(comment.createdAt, lang)}
                          </span>
                          {user && user.id === comment.userId && (
                            <button
                              onClick={() => deleteMutation.mutate({ commentId: comment.id })}
                              className="ml-auto flex items-center gap-1 font-body text-[0.6rem] transition-colors hover:opacity-70 cursor-pointer"
                              style={{ color: '#c0a090' }}
                              title={t("commentDelete", lang)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <p className="font-body text-sm leading-relaxed" style={{ color: '#5a4a3a' }}>
                          {comment.content}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center py-6 font-body text-sm italic" style={{ color: '#b0a090' }}>
                    {t("noComments", lang)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
