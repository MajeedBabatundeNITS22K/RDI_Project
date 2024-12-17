# Weather Forecast and City Information App

This project is a web application that provides users with **5-day weather forecasts** and **informative descriptions** about any city in the world. The app fetches real-time weather data and generates city descriptions using APIs.

## Features

- **Search Bar**: Enter a city name to fetch relevant weather and city information.
- **5-Day Weather Forecast**: Displays minimum temperature, maximum temperature, and precipitation.
- **City Information**: Provides cultural and historical facts about the city using the Hugging Face API.
- **Responsive UI**: Clean, modern design with a background image and interactive weather cards.

## Technologies Used

- **HTML/CSS**: For the structure and styling of the user interface.
- **JavaScript**: For interactivity and data fetching.
- **APIs**:
  - **Open-Meteo API**: Fetches weather data.
  - **Nominatim OpenStreetMap API**: Converts city names to geographical coordinates (latitude/longitude).
  - **Hugging Face API**: Generates city descriptions using the `facebook/bart-large-cnn` model.

## Project Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```
2. Open the `index.html` file in any modern web browser.

## How It Works

1. **Enter a City**: Use the search bar to input a city name and submit.
2. **Fetch Weather**: The app retrieves latitude and longitude using the Nominatim API and queries the Open-Meteo API for a 5-day forecast.
3. **Fetch City Info**: Sends a request to the Hugging Face API to generate cultural and historical facts.
4. **Display Results**:
   - Weather data appears in cards with dates, temperatures, and precipitation info.
   - The city description appears below the weather information.

## Screenshots

### Main UI
![Main UI](https://github.com/MajeedBabatundeNITS22K/RDI_Project/blob/main/pexels-szaboviktor-3227984.jpg?raw=true)

### Weather Icon
![Weather Icon](https://github.com/MajeedBabatundeNITS22K/RDI_Project/blob/main/istockphoto-477110708-612x612.jpg?raw=true)

## API Keys

- Replace the placeholder `Hugging Face API key` with your own key to fetch city information.
- Get a free API key from Hugging Face if you don’t already have one.

```javascript
const huggingFaceApiKey = "YOUR_HUGGINGFACE_API_KEY";
```

## Future Improvements

- Add support for more detailed weather visuals (e.g., icons for weather conditions).
- Implement error handling for rate limits and API downtime.
- Add additional APIs for richer city and weather data.

## License

This project is licensed under the MIT License.

---

**Contributors**: 
- Majeed Babatunde
