const DiscountApplier  = require('../discount-applier');

test('apply v1', () => {
  let notifyCount = 0
  const notifier = {
    notify: (user, message) => notifyCount++
  }
  const discountApplier = new DiscountApplier(notifier)
  discountApplier.applyV1(10, ['user1', 'user2', 'user3'])  
  expect(notifyCount).toBe(3);

})

test('apply v2', () => {
  let notifyName = []
  const notifier = {
    notify: (user, message) => notifyName.push(user)
  }
  const discountApplier = new DiscountApplier(notifier)
  discountApplier.applyV2(10, ['user1', 'user2', 'user3'])
  expect(notifyName).toEqual(['user1', 'user2', 'user3']);
})
