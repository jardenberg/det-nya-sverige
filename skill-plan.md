# Skill Plan: Manifesto Website Builder

## Workflow We Used (Distilled)

1. **Content Development** – User provides a thesis/position. Agent develops N structured policy points, each with: title, subtitle, category, description, quote, detailed body text, and data metrics (investment, affected people, upside, timeline, actors).
2. **Design Brainstorm** – Write 3 distinct design ideas in ideas.md, select one, commit fully.
3. **Image Generation** – Generate 3-5 hero/section images tailored to the design philosophy.
4. **Website Build** – Scaffold components: Hero, ManifestoIntro, PolicyCard (with data dashboard), ProgressNav, ClosingSection, Footer, MobileNav. Each policy point rendered as a full-section card with alternating layouts.
5. **Visual QA & Iteration** – Check contrast, readability, spacing. Fix issues. Iterate on theme.
6. **Checkpoint & Delivery** – Save checkpoint, present to user with actionable next steps.

## Reusable Resources

| Resource Type | Content | Purpose |
|---|---|---|
| `references/content-structure.md` | Data schema for policy points with metrics | Ensures consistent, rich content per point |
| `references/design-patterns.md` | Proven layout patterns for manifesto sites | Avoid reinventing the wheel |
| `templates/points-template.ts` | TypeScript data structure template | Quick scaffolding of content data |

## Key Learnings to Encode

- Always develop content BEFORE design (content drives layout)
- Each point needs quantitative data metrics, not just prose
- Alternate card layouts (left/right/center) to avoid monotony
- Progress navigation is essential for long-form scrolling sites
- Hero section needs strong text/image contrast – split layouts work best for light themes
- Mobile navigation overlay is critical for 10+ section sites
- Generate images early and in parallel
- Use warm, human typography (serif display + clean body) for manifesto tone
