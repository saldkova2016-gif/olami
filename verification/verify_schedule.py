import os
import time
from playwright.sync_api import sync_playwright

def verify(page):
    cwd = os.getcwd()
    editor_path = f"file://{cwd}/html-service/editor.html"

    print(f"Navigating to {editor_path}")
    page.goto(editor_path)

    # 1. Add a Day
    print("Adding day...")
    page.get_by_text("Добавить новый день").click()

    # 2. Set to 2 Columns
    print("Setting 2 columns...")
    page.get_by_text("В 2 колонки").first.click()

    # 3. Add Lesson to Left Column
    print("Adding left lesson...")
    page.get_by_text("+ Добавить в левую").first.click()

    # 4. Fill Lesson Details (Left)
    print("Filling left lesson...")
    # Time
    page.locator("input[oninput*='time']").nth(0).fill("19:00")
    # Title
    page.locator("input[oninput*='title']").nth(0).fill("Torah Study")
    # Subtitle
    page.locator("input[placeholder='Подзаголовок']").nth(0).fill("Deep Dive")
    # Tag (First select of first lesson)
    page.locator("select").nth(0).select_option("girls")

    # 5. Add Lesson to Right Column
    print("Adding right lesson...")
    page.get_by_text("+ Добавить в правую").first.click()

    # 6. Fill Lesson Details (Right)
    print("Filling right lesson...")
    # Time (2nd lesson)
    page.locator("input[oninput*='time']").nth(1).fill("20:00")
    # Title
    page.locator("input[oninput*='title']").nth(1).fill("Gemara")
    # Tag (First select of second lesson - which is index 2 because first lesson has Tag+Col)
    page.locator("select").nth(2).select_option("boys")

    # 7. Save
    print("Saving...")
    page.get_by_text("Сохранить").first.click()

    # 8. Go to Preview
    print("Going to preview...")
    page.get_by_text("Далее: Предпросмотр").click()

    # 9. Wait for Renderer
    print("Waiting for renderer...")
    page.wait_for_selector("#renderer")

    # Give it a moment to render fonts etc
    time.sleep(1)

    # 10. Screenshot
    print("Taking screenshot...")
    output_path = f"{cwd}/verification/schedule_preview.png"
    page.screenshot(path=output_path, full_page=True)
    print(f"Screenshot saved to {output_path}")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
