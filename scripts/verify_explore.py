"""Current-task verification. Runs against the restored local project, no production writes."""
from playwright.sync_api import sync_playwright, expect
import json

BASE = "http://localhost:3000"
with sync_playwright() as pw:
    browser = pw.chromium.launch(headless=True, executable_path="/usr/bin/chromium")
    context = browser.new_context(viewport={"width": 1280, "height": 900}, permissions=["clipboard-read", "clipboard-write"], reduced_motion="reduce")
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    requests = []
    page.on("request", lambda r: requests.append(r.url) if "explore.search" in r.url else None)
    page.goto(BASE + "/utforska", wait_until="networkidle")
    expect(page.get_by_role("heading", name="Utforska vad som hänger ihop.")).to_be_visible()
    assert len(requests) == 0
    language = page.get_by_role("button", name="11 ingångar Språk som infrastruktur", exact=False)
    language.focus(); page.keyboard.press("Enter")
    page.wait_for_url("**theme=language")
    expect(page.get_by_role("heading", name="Förstå och delta")).to_be_visible()
    assert page.locator("#theme-detail-title").inner_text() == "Språk som infrastruktur"
    assert page.locator('main a[href*="/punkt/"]').count() == 11
    assert len(requests) == 0
    page.get_by_label("Sökfråga").fill('"kontrakt på sitt språk"')
    assert len(requests) == 0
    page.get_by_role("button", name="Sök", exact=True).focus(); page.keyboard.press("Enter")
    expect(page.locator("#results article")).to_have_count(1)
    expect(page.locator("#results a").first).to_have_attribute("href", "/punkt/8")
    count = len(requests)
    page.get_by_label("Sökfråga").fill("edited but not submitted")
    page.wait_for_timeout(400)
    assert len(requests) == count, "Typing triggered search"
    page.get_by_role("button", name="Switch to English").click()
    page.wait_for_url("**/en/explore?**")
    assert "theme=language" in page.url and "kontrakt" in page.url
    expect(page.locator("#results article")).to_have_count(1)
    expect(page.get_by_text("Original Swedish excerpt", exact=True)).to_be_visible()
    page.get_by_role("button", name="Copy link", exact=True).focus(); page.keyboard.press("Enter")
    expect(page.get_by_role("button", name="Link copied", exact=True)).to_be_visible()
    clipboard = page.evaluate("navigator.clipboard.readText()")
    assert "theme=language" in clipboard and "q=" in clipboard
    page.goto(BASE + "/en/explore?q=language&mode=lexical", wait_until="networkidle")
    expect(page.locator("#results article")).to_have_count(20)
    page.get_by_role("button", name="Show more results").click()
    expect(page.locator("#results article")).to_have_count(40)
    page.get_by_role("button", name="Clear search").click()
    expect(page.locator("#results article")).to_have_count(0)
    assert "q=" not in page.url
    page.goto(BASE + "/utforska?q=ingenmatchquux&mode=lexical", wait_until="networkidle")
    expect(page.get_by_role("heading", name="Inga träffar i de här källorna")).to_be_visible()
    page.goto(BASE + "/utforska?theme=rights", wait_until="networkidle")
    page.locator('button').filter(has_text="Språk").first.click()
    assert "theme=language" in page.url
    page.go_back(wait_until="networkidle")
    expect(page.locator("#theme-detail-title")).to_have_text("Makt, rättigheter och ansvar")
    # Live model call through browser/tRPC, cross-language conceptual retrieval.
    page.goto(BASE + "/en/explore", wait_until="networkidle")
    page.get_by_role("button", name="Meaning", exact=True).click()
    page.get_by_label("Source type").select_option("manifesto")
    page.get_by_label("Search query").fill("How can parents follow school without speaking Swedish?")
    page.get_by_role("button", name="Search", exact=True).click()
    expect(page.locator("#results article").first).to_be_visible(timeout=55000)
    assert any("/punkt/7" in href for href in page.locator("#results a").evaluate_all("els => els.map(a => a.href)"))
    expect(page.get_by_text("AI relevance explanation", exact=False).first).to_be_visible()
    # Failure is explicit; only one attempt, then a deliberate lexical switch.
    failpage = context.new_page()
    attempts = []
    def unavailable(route):
        attempts.append(1)
        route.fulfill(status=503, content_type="application/json", body=json.dumps({"error": {"json": {"message": "Unavailable", "code": -32603, "data": {"code": "SERVICE_UNAVAILABLE", "httpStatus": 503}}}}))
    failpage.route("**/api/trpc/explore.search*", unavailable)
    failpage.goto(BASE + "/utforska?q=svenska&mode=semantic", wait_until="networkidle")
    expect(failpage.get_by_role("heading", name="Sökningen gick inte att genomföra")).to_be_visible()
    assert len(attempts) == 1, "Semantic failure retried automatically"
    failpage.unroute("**/api/trpc/explore.search*")
    failpage.get_by_role("button", name="Byt till exakta ord").click()
    expect(failpage.locator("#results article").first).to_be_visible()
    # Open exact source section and a row anchor, not merely the card top.
    page.goto(BASE + "/debatter/ai-sweden-etr-2026-05?section=0#ai-sweden-etr-2026-05-section-0", wait_until="networkidle")
    expect(page.locator("#ai-sweden-etr-2026-05-section-0 button")).to_have_attribute("aria-expanded", "true")
    expect(page.locator("#ai-sweden-etr-2026-05-section-0-content")).to_be_visible()
    page.goto(BASE + "/debatter/ai-sweden-etr-2026-05#ai-sweden-etr-2026-05-match-3", wait_until="networkidle")
    expect(page.locator("#ai-sweden-etr-2026-05-match-3")).to_be_visible()
    ids = page.locator("[id]").evaluate_all("els => els.map(e => e.id)")
    assert len(ids) == len(set(ids)), "Duplicate source IDs"
    mobile = browser.new_context(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
    mp = mobile.new_page()
    for path in ["/utforska", "/utforska?theme=language", "/en/explore?q=language&mode=lexical"]:
        mp.goto(BASE + path, wait_until="networkidle")
        assert mp.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), "Mobile horizontal overflow"
    assert not errors, errors
    print("Explore browser verification passed: submit-only, semantic API, lexical phrases, 11 language links, pagination, bilingual state, back/forward, clipboard, explicit error/fallback, unique deep links and 390px layout.")
    browser.close()
