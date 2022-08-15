import { test, expect } from '@playwright/test';

test('basic API request', async ({ request }) => {
  // send login request
  await request.post('http://localhost:3001/login', {
    data: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  });
});


test('API login test', async ({ request }) => {
  // send login request
  const response = await request.post('http://localhost:3001/login', {
    data: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  });
  const body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(body.user.email).toEqual(process.env.EMAIL);
});

