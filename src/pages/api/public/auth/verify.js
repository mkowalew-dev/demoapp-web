import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { headers } = req;
    const apiKey = headers['x-api-key'];

    // Verify API key
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }

    // Generate JWT token
    const token = jwt.sign({ session: true }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
}