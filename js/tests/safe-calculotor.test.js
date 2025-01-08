const SafeCalculator  = require('../safe-calculator');

test('should not throw when authorized', () => {

  const authorizer = {
    authorize: () => true
  }
  const calculator = new SafeCalculator(authorizer)
    calculator.add(1, 2)
})
