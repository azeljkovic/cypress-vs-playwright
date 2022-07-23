import { test, expect, request } from "@playwright/test";


test('should do a login API call', async () => {
    // context that will issue http request
    const context = await request.newContext({
        baseURL: 'http://localhost:3001',
    });

    // send login request
    const rsp = await context.post('/login', {
        data: {
            password: 's3cret',
            username: 'Katharina_Bernier',
        }
    })
    let body = await rsp.json();
    expect(rsp.ok()).toBeTruthy();
    expect(body.user.email).toEqual('Norene39@yahoo.com');
});
