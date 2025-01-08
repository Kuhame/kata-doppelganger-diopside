const { SendMailRequest, MailSender } = require('../mail-sender');

test('send v1', () => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV1

  const mockHttpClient = {
    post: jest.fn(),
  };

  const mailSender = new MailSender(mockHttpClient);

  const user = { name: 'Noah', email: 'noah@example.com' };
  const message = 'Hello Noah!';
  mailSender.sendV1(user, message);

  expect(mockHttpClient.post).toHaveBeenCalledWith(
    'https://api.mailsender.com/v3/',
    new SendMailRequest('noah@example.com', 'New notification', 'Hello Noah!')
  );
})

test('send v2', () => {

  const mockHttpClient = {
    post: jest
      .fn()
      .mockReturnValueOnce({ code: 503 })  // First call => { code: 503 }
      .mockReturnValueOnce({ code: 200 }), // Second call => { code: 200 }
  };

  const mailSender = new MailSender(mockHttpClient);

  // 2. Call sendV2
  const user = { name: 'Bob', email: 'bob@example.com' };
  const message = 'Hello Bob!';
  mailSender.sendV2(user, message);

  // 3. We want TWO calls:
  //    (1) 'https://api.mailsender.com/v3/', new SendMailRequest('bob@example.com', 'New notification', 'Hello Bob!')
  //    (2) 'https://api.mailsender.com/v3/', new SendMailRequest('bob@example.com', 'New notification', 'Hello Bob!')
  // But the buggy code calls the second time with `response` instead of `request`.

  // Let's check what was actually called:
  expect(mockHttpClient.post).toHaveBeenNthCalledWith(
    1,
    'https://api.mailsender.com/v3/',
    new SendMailRequest('bob@example.com', 'New notification', 'Hello Bob!')
  );

  // This assertion fails with the buggy code, because the second call is made with { code: 503 }
  // instead of new SendMailRequest(...).
  expect(mockHttpClient.post).toHaveBeenNthCalledWith(
    2,
    'https://api.mailsender.com/v3/',
    new SendMailRequest('bob@example.com', 'New notification', 'Hello Bob!')
  );
})
