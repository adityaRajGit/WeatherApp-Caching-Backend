# WeatherApp Backend

## Project Overview
The WeatherApp Backend provides a RESTful API for fetching current weather data and 5-day forecasts for cities. It supports caching of recent search results to improve performance and reduce API usage. Additionally, it allows retrieval of recent search history.

The backend uses Express.js for the server, Mongoose for MongoDB interactions, and Axios for making API requests to the SheCodes Weather API.

## Instructions to Set Up and Run the Project Locally

### Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.0 or higher)

### Setup Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/adityaRajGit/WeatherApp-Catching-Backend.git
   cd WeatherApp-Backend

2. **Install dependencies**:
   ```bash
   npm install

3. **Start MongoDB Compass**:
   
4. **Run the Application**
    ```bash
    npm start

### API Usage Details

## Endpoints

 *** POST /api/weather ***

*** Description: Fetches current weather data and 5-day forecast for a city. Caches results to optimize performance ***

### Request Body:
```
{
  "query": "City Name"
}
```

### Response:
```
{
  "query": "City Name",
  "weatherData": { /* Current weather data */ },
  "forecastData": [ /* 5-day forecast data */ ]
}
```

*** GET /api/history ***

*** Description: Retrieves recent search history.***
### Response:
```
[
  {
    "query": "City Name",
    "date": "YYYY-MM-DDTHH:MM:SSZ",
    "weatherData": { /* Cached weather data */ },
    "forecastData": [ /* Cached 5-day forecast data */ ]
  },
]
```

## Approach
### The WeatherApp Backend is designed to efficiently handle weather data requests with caching mechanisms to minimize API calls to the SheCodes Weather API. Key features include: ###

1. *** Caching Stores recent search results to reduce the frequency of API requests and improve response times.*** 
2. *** Search History Provides access to recent searches, helping users view past queries and results.*** 
3. *** Error Handling Includes robust error handling for failed API requests and database operations.*** 
