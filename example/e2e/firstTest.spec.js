describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have "Basic Form" section', async () => {
    await expect(element(by.text('Basic Form'))).toBeVisible();
  });

  it('should have the first input visible', async () => {
    await element(by.id('input')).typeText('john@example.com');
    await element(by.id('input')).tapReturnKey();
  });
});
