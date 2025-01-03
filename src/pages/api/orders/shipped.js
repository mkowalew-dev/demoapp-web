// pages/api/data.js
const apiauthUrl = process.env.NEXT_PUBLIC_AUTH_API_URL;
const apilogisticsUrl = process.env.NEXT_PUBLIC_LOGISTICS_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default async function handler(req, res) {
    const {method} = req;

    if (method === 'GET') {
        try {
            // Step 1: Authenticate with the Express Auth Service
            const authResponse = await fetch(`${apiauthUrl}/auth/verify`, {
                headers: { 'x-api-key': apiKey }
            });
            console.log(authResponse);

            if (!authResponse.ok) {
                return res.status(authResponse.status).json({ error: 'Authentication failed' });
            }

            // Step 2: Fetch Data from the Orders Canceled Endpoint
            const dataResponse = await fetch(`${apilogisticsUrl}/orders/shipped`);

            if (!dataResponse.ok) {
                return res.status(dataResponse.status).json({ error: 'Failed to fetch sales data' });
            }

            const data = await dataResponse.json();
            res.status(200).json(data);

        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}