const SafeCalculator  = require('../safe-calculator');

test('should not throw when authorized', () => {
  // ####### PART 1 #######

  // const authorizer = {
  //   authorize: () => true
  // }
  // const calculator = new SafeCalculator(authorizer)
  //   calculator.add(1, 2)


  // ####### PART 2 #######

  const mockAuthorizer = { authorize: jest.fn(() => true) };
  const calculator = new SafeCalculator(mockAuthorizer);
  expect(() => calculator.add(1, 2)).not.toThrow();
})
