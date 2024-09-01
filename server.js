const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/weatherapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const searchHistorySchema = new mongoose.Schema({
  query: String,
  date: { type: Date, default: Date.now },
  weatherData: Object,
  forecastData: Array,
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// API endpoint to get weather data and store search history
app.post('/api/weather', async (req, res) => {
  const { query } = req.body;
  const apiKey = 'b03a640e5ef6980o4da35b006t5f2942';
  const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
  const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;

  try {
    // Check if we have cached data for this query
    const cachedData = await SearchHistory.findOne({ query }).sort({ date: -1 });

    if (cachedData && (new Date() - cachedData.date) < 30 * 60 * 1000) { // 30 minutes cache
      console.log('Returning cached data for:', query);
      return res.json({ query, weatherData: cachedData.weatherData, forecastData: cachedData.forecastData });
    }

    // If no cached data or it's expired, fetch new data
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get(currentUrl),
      axios.get(forecastUrl)
    ]);

    const weatherData = currentResponse.data;
    const forecastData = forecastResponse.data.daily;

    // Log the search query and weather data to the console
    console.log('Search Query:', query);
    console.log('Weather Data:', weatherData);
    console.log('Forecast Data:', forecastData);

    // Save the search query and result in the database
    const searchEntry = new SearchHistory({ query, weatherData, forecastData });
    await searchEntry.save();

    res.json({ query, weatherData, forecastData });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Unable to fetch weather data' });
  }
});

// API endpoint to get search history
app.get('/api/history', async (req, res) => {
  try {
    const history = await SearchHistory.find().sort({ date: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    console.error('Error retrieving history:', error);
    res.status(500).json({ error: 'Unable to retrieve history' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));