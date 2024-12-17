document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('greeting').innerText = "Error: Please enter a city name.";
        return;
    }

    // Fetch latitude and longitude using Nominatim API
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length === 0) {
                throw new Error('City not found');
            }

            const latitude = geoData[0].lat;
            const longitude = geoData[0].lon;

            // Fetch 5-day weather forecast from Open-Meteo API
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum,weathercode&timezone=auto`;

            return fetch(weatherUrl).then(response => response.json()).then(weatherData => {
                if (!weatherData.daily) {
                    throw new Error('Unable to fetch weather data');
                }

                // Update the 5-day weather forecast
                const dailyWeather = weatherData.daily;
                let forecastHtml = "<h3>5-Day Forecast:</h3>";
                for (let i = 0; i < dailyWeather.time.length; i++) {
                    forecastHtml += `
                        <div>
                            <p><strong>Date:</strong> ${dailyWeather.time[i]}</p>
                            <p><strong>Min Temp:</strong> ${dailyWeather.temperature_2m_min[i]}°C</p>
                            <p><strong>Max Temp:</strong> ${dailyWeather.temperature_2m_max[i]}°C</p>
                            <p><strong>Precipitation:</strong> ${dailyWeather.precipitation_sum[i]} mm</p>
                        </div>
                        <hr>
                    `;
                }
                document.getElementById('forecast').innerHTML = forecastHtml;

                // Call OpenAI API for city description
                const openaiApiKey = "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"; // Replace with your API key
                const openaiUrl = "https://api.openai.com/v1/chat/completions";

                return fetch(openaiUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${openaiApiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: "text-davinci-003",
                        prompt: `Write a short welcoming paragraph about the city of ${city}.`,
                        max_tokens: 50,
                        temperature: 0.7
                    })
                });
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch city info: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const cityInfo = data.choices[0].text.trim();
            document.getElementById('greeting').innerText = `Hello, ${city}!`;
            document.getElementById('city-description').innerText = `City Info: ${cityInfo}`;
        })
        .catch(error => {
            console.error('Error:', error.message);
            document.getElementById('greeting').innerText = "Error: Unable to fetch data. Please try again.";
            document.getElementById('forecast').innerHTML = "";
            document.getElementById('city-description').innerText = "";
        });
});
