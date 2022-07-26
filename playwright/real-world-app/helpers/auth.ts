// auth.ts

/*
NOTE:
In this particular app (Cypress real-world app) data exported to storageState.json
will not be enough for authentication, this is for the demonstration purpose only!
 */

import { request } from '@playwright/test';

async function authAPI() {
    const requestContext = await request.newContext();

    await requestContext.post('http://localhost:3001/login', {
        data: {
            password: 's3cret',
            username: 'Katharina_Bernier',
        }
    });

    // Save signed-in state to 'storageState.json'.
    await requestContext.storageState({ path: 'storageState.json' });
    await requestContext.dispose();
}

export default authAPI;
