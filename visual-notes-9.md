# Visual Notes 9

The text is STILL gray. I've tried #000000 with text-shadow and it's still appearing as light gray.

This MUST be the body::after grain overlay with z-index: 9999 and opacity: 0.03. Even though it's subtle, it sits on top of everything and could be washing out the text visually.

But wait - the overlay has opacity 0.03 which is nearly invisible. It shouldn't cause this much lightening.

Actually, looking at the screenshot more carefully, the "Det Nya" text IS darker than before - it's now a dark gray rather than light gray. But it's still not the crisp black I'd expect.

The real issue: The Playfair Display font at this size has thin serifs and the contrast between thick/thin strokes makes it look lighter overall. The warm cream background also reduces perceived contrast.

Let me try a completely different approach: use a dark background panel behind the text, or switch to a bolder sans-serif for the heading.

Actually - let me just try removing the grain overlay first to see if that helps.
