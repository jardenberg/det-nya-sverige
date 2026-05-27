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

## Fixes Round 2
- [x] Replace "FRAMÅT, TILLSAMMANS" image (svartvit folkmassan) with illustrated version
- [x] Fix OG image injection — confirmed working in both dev and production builds (was stale deploy)
- [x] Clean up sharing URLs: /punkt/N paths with server-side OG injection + client-side scroll

## Inspiration Credit
- [x] Add inspiration text to ManifestoIntro crediting Troed Troedson's Facebook post
- [x] Include link to Troed's original post
- [x] Add English translation of the inspiration text

## Footer Updates
- [x] Add CC0 license with note about keeping author in the loop
- [x] Update version number to v093b
- [x] Add contact email joakim@jardenberg.com

## About Page (/om)
- [x] Create /om page with license info, field report, and project context
- [x] Register /om route in App.tsx (also /about for English)
- [x] Add link to /om from ManifestoIntro section
- [x] Add English translation support

## Build Report Links
- [x] Add link to full 15p build report (ai.jardenberg.se/15p-build)
- [x] Add link to JJOS build report (ai.jardenberg.se/jjos-build)

## SEO Fixes
- [x] Add meta keywords to the page (14 relevant keywords)
- [x] Adjust title to 42 characters: "Det Nya Sverige – 15 Punkter för Framtiden"

## English URL Routing (/en prefix)
- [x] Add /en route for English homepage
- [x] Add /en/punkt/N routes for English point pages
- [x] Add /en/om route for English about page
- [x] Update server-side OG injection for /en paths (English OG titles and descriptions)
- [x] Update language switcher to navigate between /en/... and /... URL paths
- [x] Update ShareButton, ManifestoIntro, About back-link to use langPrefix

## Standing Rules
- [ ] ALWAYS update the version number in Footer.tsx on every checkpoint/deploy (increment from current version)

## Pending for Next Update
- [x] Update version number in footer (v093b → v093c)

## PDF Download Feature
- [x] Build server-side PDF generation endpoint (/api/pdf/sv and /api/pdf/en)
- [x] Add download links in Footer (with Download icon)
- [x] Add download links on /om page (dedicated section)
- [x] Simple, accessible format (PDFKit, clean typography, CC0 license on title page)
- [x] Update version number to v093c

## Fix Downloads (PDF → Markdown)
- [x] Replace PDF generation with Markdown file generation
- [x] Serve .md files as downloads from /api/download/sv and /api/download/en
- [x] Update Footer download links to /api/download/
- [x] Update About page download links to /api/download/
- [x] Include ALL text content (body, quotes, key figures, metrics) in the Markdown
- [x] Update version number to v093d

## Export & Version Update
- [x] Add about/om text to the beginning of Markdown export (background + how we built it + link to report)
- [x] Update version to v094b (always keep 'b' suffix for beta)

## Partiledardebatt Analysis
- [x] Read and analyze SVT partiledardebatt transcript
- [x] Match debate statements against each of the 15 manifesto points
- [x] Create comprehensive analysis with tables (party-by-party matching)
- [x] Add JJ comments where relevant
- [x] Generate downloadable PDF of the analysis
- [x] Integrate debate analysis as info-box section on the website
- [x] Design for multiple debates (this is the first of several)
- [x] Update version number to v095b

## Debate Analysis Banner on Homepage
- [x] Add visually striking news banner/notis on homepage linking to /debatter
- [x] Place high up on page (after hero, before manifesto intro) so it's immediately visible
- [x] Make it shine (animated, eye-catching)
- [x] Bilingual (sv/en)
- [x] Update version number to v096b

## ETR/AI Sweden Interview Analysis (v097b)
- [x] Read and analyze ETR/AI Sweden interview transcript
- [x] Match interview statements against each of the 15 manifesto points
- [x] Create comprehensive analysis with point-by-point matching (including 2nd/3rd order consequences)
- [x] Add JJ comments where relevant
- [x] Generate downloadable PDF of the analysis
- [x] Add as second card on /debatter page
- [x] Update banner to show latest analysis and total count
- [x] Update page description to cover interviews too
- [x] Write/update tests for new entry
- [x] Update version number to v097b
