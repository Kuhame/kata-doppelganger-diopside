const { SendMailRequest, MailSender } = require('../mail-sender');

test('send v1', () => {
  // ###### PARt 1 ######

  // const mockHttpClient = {
  //   post: jest.fn(),
  // };
  //
  // const mailSender = new MailSender(mockHttpClient);
  //
  // const user = { name: 'Noah', email: 'noah@example.com' };
  // const message = 'Hello Noah!';
  // mailSender.sendV1(user, message);
  //
  // expect(mockHttpClient.post).toHaveBeenCalledWith(
  //   'https://api.mailsender.com/v3/',
  //   new SendMailRequest('noah@example.com', 'New notification', 'Hello Noah!')
  // );


    // ###### PART 2 ######

  const mockHttpClient = { post: jest.fn() };
  const mailSender = new MailSender(mockHttpClient);
  const user = { name: 'Noah', email: 'noah@example.com' };
  const message = 'Hello Noah!';

  mailSender.sendV1(user, message);

  // The expected recipient should be the user's email
  expect(mockHttpClient.post).toHaveBeenCalledWith(
      'https://api.mailsender.com/v3/',
      new SendMailRequest(user.email, 'New notification', message)
  );
})

test('send v2', () => {
  // ###### PART 1 ######

  // const mockHttpClient = {
  //   post: jest
  //     .fn()
  //     .mockReturnValueOnce({ code: 503 })  // First call => { code: 503 }
  //     .mockReturnValueOnce({ code: 200 }), // Second call => { code: 200 }
  // };
  //
  // const mailSender = new MailSender(mockHttpClient);
  //
  // const user = { name: 'Bob', email: 'bob@example.com' };
  // const message = 'Hello Bob!';
  // mailSender.sendV2(user, message);
  //
  // expect(mockHttpClient.post).toHaveBeenNthCalledWith(
  //   1,
  //   'https://api.mailsender.com/v3/',
  //   new SendMailRequest('bob@example.com', 'New notification', 'Hello Bob!')
  // );
  //
  // expect(mockHttpClient.post).toHaveBeenNthCalledWith(
  //   2,
  //   'https://api.mailsender.com/v3/',
  //   new SendMailRequest('bob@example.com', 'New notification', 'Hello Bob!')
  // );


    // ###### PART 2 ######

    const mockHttpClient = {
        post: jest
            .fn()
            .mockReturnValueOnce({ code: 503 })  // First call => { code: 503 }
            .mockReturnValueOnce({ code: 200 }), // Second call => { code: 200 }
    }

    const mailSender = new MailSender(mockHttpClient)
    const user = { name: 'Bob', email: 'bob@exemple' }
    const message = 'Hello Bob!'

    mailSender.sendV2(user, message)

    expect(mockHttpClient.post).toHaveBeenNthCalledWith(
        1,
        'https://api.mailsender.com/v3/',
        new SendMailRequest(user.email, 'New notification', message)
    )

    expect(mockHttpClient.post).toHaveBeenNthCalledWith(
        2,
        'https://api.mailsender.com/v3/',
        new SendMailRequest(user.email, 'New notification', message)
    )
})
