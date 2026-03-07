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
