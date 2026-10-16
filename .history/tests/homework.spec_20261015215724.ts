import { test, expect} from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Home page is opened and Welcome message is displayed', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
});

test("Update pet type", async ({ page }) => {
    

    await page.getByRole('link', { name: 'Pet Types' }).click();
    await expect(page.getByRole("heading", { name: 'Pet Types' })).toBeVisible();
    await page.locator("#pettypes tr").nth(1).getByRole("button", { name: "Edit" }).click()
    await expect(page.getByRole("heading", { name: 'Edit Pet Type' })).toBeVisible();
    await expect(page.locator("#name")).toHaveValue("cat");
    await page.locator("#name").fill("rabbit")
    await page.getByRole("button", { name: "Update" }).click()
    await expect(page.locator('input[name="pettype_name"]').first()).toHaveValue("rabbit")

    await page.locator("#pettypes tr").nth(1).getByRole("button", { name: "Edit" }).click()
    await expect(page.locator("#name")).toHaveValue("rabbit");
    await page.locator("#name").fill("cat")
    await page.getByRole("button", { name: "Update" }).click()
    await expect(page.locator('input[name="pettype_name"]').first()).toHaveValue("cat")
    
})
    
test("Cancel pet type update", async ({page}) => {
    await page.getByRole('link', { name: 'Pet Types' }).click();
    await expect(page.getByRole("heading", { name: 'Pet Types' })).toBeVisible();
    await page.locator("#pettypes tr").nth(2).getByRole("button", { name: 'Edit' }).click()
    await expect(page.locator("#name")).toHaveValue("dog");
    await page.locator("#name").fill("moose")
    await expect(page.locator("#name")).toHaveValue("moose");
    await page.getByRole("button", { name: "cancel" }).click()
    await expect(page.locator('input[name="pettype_name"]').nth(1)).toHaveValue("dog")
    
})


test("Validation of Pet type name is required", async ({page}) => {
    await page.getByRole('link', { name: 'Pet Types' }).click();
    await expect(page.getByRole("heading", { name: 'Pet Types' })).toBeVisible();
    await page.locator("#pettypes tr").nth(3).getByRole("button", { name: 'Edit' }).click()
    await expect(page.locator("#name")).toHaveValue("dog");
    await page.locator("#name").clear()
    await expect(page.locator(".help-block")).toHaveText("Name is required")
    await page.getByRole("button", { name: "update" }).click()
    await expect(page.locator('input[name="pettype_name"]').nth(1)).toHaveValue("dog")
    
})
