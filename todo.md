# Commenting & Voting System Todo

## Phase 1: Backend Upgrade
- [x] Run webdev_add_feature for web-db-user
- [x] Review upgrade README and migration steps

## Phase 2: Database & API
- [x] Create database schema: comments table, votes table
- [x] Run migrations
- [x] Create API routes: POST/GET comments, POST/DELETE votes, GET vote counts
- [x] Add rate limiting and basic validation (Zod validation on all inputs)

## Phase 3: Frontend Components
- [x] Build VoteButton component (upvote per point, toggle on/off)
- [x] Build CommentSection component (list + form)
- [x] Build CommentCard component (individual comment display, inline in CommentSection)
- [x] Integrate VoteButton and CommentSection into PolicyCard
- [x] Add language support (sv/en) for all new UI strings
- [x] Style consistently with warm light theme

## Phase 4: Test & Polish
- [x] Test voting flow (login, vote, unvote) - API calls confirmed working
- [x] Test commenting flow (login, post, display) - API calls confirmed working
- [x] Test language switching with new components
- [x] Verify mobile responsiveness

## Content Rewrite (Walk & Talk)
- [x] Rewrite all 15 points in points.ts with new content, AI-integrated approach, new tone
- [x] Rewrite all 15 points in points-en.ts with English translations
- [x] Update ManifestoIntro with new framing (design problem, platform thinking)
- [x] Update ClosingSection with new closing text
- [x] Update TotalCounter metrics to match new data
- [x] Update i18n strings for any changed UI text
- [x] Update categories to match new structure
- [x] Test and verify everything compiles and renders (15 tests passing, no TS errors)
- [x] Save checkpoint

## UX Fixes
- [x] Expand body text by default (removed "Läs mer" toggle, text always visible)
- [x] Align action buttons (Dela, Stöd, Diskussion) on one row with flex-wrap for comment panel
- [x] Fix keyboard nav: J = up/back, L = down/forward
- [x] Fix first arrow-down: goes to point 1 when entering points section for the first time

## Sharing Links & OG Images
- [x] Fix hash navigation (#punkt-3) so it scrolls to correct point on page load
- [x] Generate 15 retro-illustrated genre images (warm vintage style, NOT round)
- [x] Upload images to CDN
- [x] Integrate per-point OG images for social sharing
- [x] Replace closing section images with illustrated style (city, together, future)
- [x] Update meta tags for dynamic OG per point (server-side injection via ?punkt=N)
- [x] Add illustrated images as visual elements in PolicyCard
- [x] Test sharing links work correctly (23 tests passing)
- [x] Fix ?punkt=N → #punkt-N client-side redirect for social sharing URLs
