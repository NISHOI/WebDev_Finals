const WebSocket = require('ws');

const newsapiKey = '244fb65f098b4611b60f67b272814fc2';
const defaultSearchQuery = 'top new ph';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', async message => {
        let searchQuery = message ? message.toString().trim() : '';
        console.log(`Received search query: ${searchQuery}`);

        try {
            const data = await fetchNews(searchQuery);
            ws.send(JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching news:', error);
            ws.send(JSON.stringify({ error: error.message }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

async function fetchNews(search) {
    const url = `https://newsapi.org/v2/everything?q=${search}&apiKey=${newsapiKey}`;

    try {
        const response = await fetch(url);
        if (response.status === 400) {
            throw new Error('Bad Request: Invalid parameters');
        }

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }
        const data = await response.json();
        return data.articles;
    } catch (error) {
        throw error;
    }
}

console.log('WebSocket server is running on ws://localhost:8080');
