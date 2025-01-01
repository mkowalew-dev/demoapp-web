// pages/api/data.js
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        try {
            const response = await fetch(`${apiUrl}/orders/shipped/monthly`, {headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                }});
            const data = await response.json();

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}