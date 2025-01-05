import {verifyToken} from "../../../middleware/tokenverify";
const apioperationsUrl = process.env.NEXT_PUBLIC_OPERATIONS_API_URL;

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        try {
            verifyToken(req, res, async () => {
                // Handle the request after token verification
                // Fetch Data from the Employee Count Endpoint
                const dataResponse = await fetch(`${apioperationsUrl}/operations/employees/count`);
                if (!dataResponse.ok) {
                    return res.status(dataResponse.status).json({ error: 'Failed to fetch employee count data' });
                }
                const data = await dataResponse.json();
                res.status(200).json(data);
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}