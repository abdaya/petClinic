import { test, expect} from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Home page is opened and Welcome message is displayed', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
});

test.only("Update pet type", async ({ page }) => {
    const updateResponse = page.waitForResponse(response =>
  /\/pettypes\/\d+$/.test(new URL(response.url()).pathname) &&
  response.request().method() === 'PUT' &&
  response.ok()
);

    await page.getByRole('link', { name: 'Pet Types' }).click();
    await expect(page.getByRole("heading", { name: 'Pet Types' })).toBeVisible();
    await page.locator("#pettypes tr").nth(1).getByRole("button",{name:"Edit"}).click()
    await expect(page.getByRole("heading", { name: 'Edit Pet Type' })).toBeVisible();
    await page.locator("#name").clear()
    await page.locator("#name").fill("rabbit")
    await page.getByRole("button", { name: "Update" }).click()
    await updateResponse
    await page.reload();
    await expect(page.locator('input[name="pettype_name"]').first()).toHaveValue("rabbit")

    await page.locator("#pettypes tr").nth(1).getByRole("button", { name: "Edit" }).click()
    await page.locator("#name").clear()
    await page.locator("#name").fill("cat")
    await page.getByRole("button", { name: "Update" }).click()
    await expect(page.locator('input[name="pettype_name"]').first()).toHaveValue("cat")
    
    

    



})
    

