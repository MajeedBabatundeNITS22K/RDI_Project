document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const city = document.getElementById('city').value.trim();
    if (!city) {
        document.getElementById('greeting').innerText = "Error: Please enter a city name.";
        return;
    }

    // Fetch weather data
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(geoData => {
            if (geoData.length === 0) {
                throw new Error('City not found');
            }
            const latitude = geoData[0].lat;
            const longitude = geoData[0].lon;
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,precipitation_sum&timezone=auto`;

            return fetch(weatherUrl).then(response => response.json()).then(weatherData => {
                if (!weatherData.daily) throw new Error('Weather data unavailable');
                const dailyWeather = weatherData.daily;
                let forecastHtml = "";
                for (let i = 0; i < dailyWeather.time.length; i++) {
                    forecastHtml += `
                        <div class="forecast-box">
                            <h3>${dailyWeather.time[i]}</h3>
                            <p>Min Temp: ${dailyWeather.temperature_2m_min[i]}&deg;C</p>
                            <p>Max Temp: ${dailyWeather.temperature_2m_max[i]}&deg;C</p>
                            <p>Precipitation: ${dailyWeather.precipitation_sum[i]} mm</p>
                        </div>`;
                }
                document.getElementById('forecast').innerHTML = forecastHtml;
            });
        })
        .catch(error => {
            console.error('Error:', error.message);
        });

    // Fetch city info
    const huggingFaceApiKey = "Key_api";
    const huggingFaceUrl = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
    fetch(huggingFaceUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${huggingFaceApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: `Write two informative sentences about the city of ${city}. Include one cultural fact and one historical fact.`,
            parameters: { max_new_tokens: 50 }
        })
    })
    .then(response => response.json())
    .then(data => {
        const cityInfo = data[0]?.generated_text?.trim();
        document.getElementById('city-description').innerText = cityInfo || `No information found for ${city}.`;
    })
    .catch(() => {
        document.getElementById('city-description').innerText = "Error fetching city information.";
    });
});