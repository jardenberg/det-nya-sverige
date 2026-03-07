# Visual Notes 8

Text is STILL appearing gray despite using color: #000000. This is very suspicious.

Possible causes:
1. The grain texture overlay (body::after with z-index 9999) might be interfering
2. The motion opacity animation might be reducing it
3. Some CSS inheritance issue

The text appears to be about 40-50% opacity visually. The motion.div has an opacity transform based on scroll. At scrollY=0, opacity should be 1. But maybe there's an initial animation state issue.

Wait - the initial animation: { opacity: 0, y: 40 } -> animate: { opacity: 1, y: 0 }. This should be fine.

Let me check if the grain overlay is the issue - it has z-index 9999 and opacity 0.025. That shouldn't cause this.

Actually, looking more carefully at the screenshot, the text IS darker than before but still looks muted. The warm cream background (#f3ece3) is quite light, so black text should have excellent contrast. 

The issue might be the font itself - Playfair Display at very large sizes might have thin strokes that look lighter. Let me try adding a slight text-shadow to make it bolder.

OR: The image gradient is still bleeding into the text area slightly.
