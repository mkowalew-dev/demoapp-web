import {verifyToken} from "../../../middleware/tokenverify";
const apioperationsUrl = process.env.NEXT_PUBLIC_OPERATIONS_API_URL;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    try {
        verifyToken(req, res, async () => {
            // Send POST request to Express API
            const response = await fetch(`${apioperationsUrl}/operations/employees/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body), // Forward the request body
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({error: data.error || 'Error creating employee'});
            }

            // Return the response from the Express API
            res.status(201).json(data);
        })
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
}