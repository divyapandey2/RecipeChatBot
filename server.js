const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 8090});

// Spoonacular API details
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

wss.on('connection', (ws) => {
  console.log('Client connected');

  const sendTrendingRecipes = async () => {
    const recipes = await fetchRecipes();
    if (recipes.length > 0) {
      ws.send(JSON.stringify(recipes));
    }
  };

  // Send initial recipes when connected
  sendTrendingRecipes();

  // Send updates every 30 seconds
  const interval = setInterval(sendTrendingRecipes, 30000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});
