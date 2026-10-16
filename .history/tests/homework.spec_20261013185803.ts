import { test, expect} from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Home page is opened and Welcome message is displayed', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
});

test.only("Update pet type", async ({ page }) => {
    await page.getByRole('link', { name: 'Pet Types' }).click();
    await expect(page.getByRole("heading", { name: 'Pet Types' })).toBeVisible();
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.getByRole("heading", { name: 'Edit Pet Type' })).toBeVisible();
    await page.locator("#name").clear()
    await page.locator("#name").fill("rabbit")
    await page.getByRole("button", { name: "Update" }).click()
    await expect(page.locator('input[name:"pettype_name"]').first()).to
    

    



})
    

