from playwright.sync_api import sync_playwright


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, executable_path="/usr/bin/chromium")
    context = browser.new_context(permissions=["clipboard-read", "clipboard-write"])
    page = context.new_page()

    page.goto("http://localhost:3000/retorik?parti=C", wait_until="networkidle")

    liberal_button = page.get_by_role("button", name="L", exact=True)
    liberal_button.focus()
    page.keyboard.press("Enter")
    page.wait_for_url("**parti=L")
    assert liberal_button.get_attribute("aria-pressed") == "true"

    ai_button = page.get_by_role("button", name="AI", exact=True)
    ai_button.focus()
    page.keyboard.press("Space")
    assert ai_button.get_attribute("aria-pressed") == "false"

    first_timeline_button = page.locator("button").filter(has_text="SVT Partiledardebatt").first
    first_timeline_button.focus()
    page.keyboard.press("Enter")
    page.get_by_role("link", name="Öppna källanalysen").wait_for()

    copy_button = page.get_by_role("button", name="Länka direkt till L")
    copy_button.focus()
    page.keyboard.press("Enter")
    page.get_by_role("button", name="Länk kopierad").wait_for()

    print("Keyboard verification passed: party filter, metric toggle, timeline selection, and copy link.")
    browser.close()
