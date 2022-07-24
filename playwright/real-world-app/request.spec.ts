import { test, expect, request } from "@playwright/test";


test('should do a login API call', async ({ request }) => {
    // send login request
    const rsp = await request.post('http://localhost:3001/login', {
        data: {
            password: 's3cret',
            username: 'Katharina_Bernier',
        }
    })
    let body = await rsp.json();
    expect(rsp.ok()).toBeTruthy();
    expect(body.user.email).toEqual('Norene39@yahoo.com');
});
