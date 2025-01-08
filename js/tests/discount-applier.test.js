const DiscountApplier  = require('../discount-applier');

const mockNotifier = {
  notify: jest.fn(),
};

test('apply v1', () => {
  // ####### PART 1 #######

  // let notifyCount = 0
  // const notifier = {
  //   notify: (user, message) => notifyCount++
  // }
  // const discountApplier = new DiscountApplier(notifier)
  // discountApplier.applyV1(10, ['user1', 'user2', 'user3'])
  // expect(notifyCount).toBe(3);


  // ####### PART 2 ########

  const discountApplier = new DiscountApplier(mockNotifier);
  discountApplier.applyV1(10, ['user1', 'user2', 'user3']);
  expect(mockNotifier.notify).toHaveBeenCalledTimes(3);
})

test('apply v2', () => {
    // ####### PART 1 #######

  // let notifyName = []
  // const notifier = {
  //   notify: (user, message) => notifyName.push(user)
  // }
  // const discountApplier = new DiscountApplier(notifier)
  // discountApplier.applyV2(10, ['user1', 'user2', 'user3'])
  // expect(notifyName).toEqual(['user1', 'user2', 'user3']);


  // ####### PART 2 ########

  const mockNotifier = { notify: jest.fn() };
  const discountApplier = new DiscountApplier(mockNotifier);
  const users = ['user1', 'user2', 'user3']; // Array of users


  discountApplier.applyV2(10, users);

  // Correct assertions: Check if each user was notified AT LEAST ONCE
  expect(mockNotifier.notify).toHaveBeenCalledWith(users[0], expect.any(String));
  expect(mockNotifier.notify).toHaveBeenCalledWith(users[1], expect.any(String));
  expect(mockNotifier.notify).toHaveBeenCalledWith(users[2], expect.any(String));
})
