import {verifyToken} from "../../../middleware/tokenverify";
const apioperationsUrl = process.env.NEXT_PUBLIC_OPERATIONS_API_URL;

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query

    if (method === 'GET') {
        try {
            verifyToken(req, res, async () => {
                // Handle the request after token verification
                // Fetch Data from the Employee Count Endpoint
                const dataResponse = await fetch(`${apioperationsUrl}/operations/employees/${id}`);
                if (!dataResponse.ok) {
                    return res.status(dataResponse.status).json({ error: 'Failed to fetch employee id data' });
                }
                const data = await dataResponse.json();
                res.status(200).json(data);
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'DELETE') {
        // Handle DELETE request to delete an employee by ID
        try {
            const response = await fetch(`${apioperationsUrl}/operations/employees/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({ error: data.error || 'Error deleting employee' });
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}