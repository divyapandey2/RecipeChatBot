const WebSocket = require('ws');
const axios = require('axios');

const apiKey = '72aa38298bd743debc60064344b3045a';


const fetchRecipes = async () => {
  const url = `https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

const startWebSocketServer = (port) => {
  try {
    const wss = new WebSocket.Server({ port });
    console.log(`WebSocket server started on port ${port}`);

    wss.on('connection', (ws) => {
      console.log('Client connected');

      const sendTrendingRecipes = async () => {
        const recipes = await fetchRecipes();
        if (recipes.length > 0) {
          ws.send(JSON.stringify(recipes));
        }
      };

      
      sendTrendingRecipes();

      
      const interval = setInterval(sendTrendingRecipes, 40000);

      ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
      });
    });

  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use. Trying another port...`);
      startWebSocketServer(port + 1); // Try next available port
    } else {
      console.error('WebSocket server error:', error);
    }
  }
};

// Start server on port 8090 and fallback if needed
startWebSocketServer(8090);

