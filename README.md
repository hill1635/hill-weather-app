# hill-weather-app

For this assignment, we were tasked to create a weather app with the Open Weather API.  Based on the given screenshot, I broke the page up into the header "Weather Dashboard", the aside with search input and button and suggested cities, and the main portion that included the current weather and 5-day forecast.  The header was the first, easy step to tackle.  After that, I worked on the aside where input and button elements were added and a list of cities was populated with a for loop based on an array.

Next, I added functionality to the search with an onclick event that grabbed text (.val) from the input.  An ajax promise was created in a function to run when the button was clicked so that the text from the input was added to an API URL.  From there, coordinates were logged in lat and long variables as those variables were required to gather weather data with the API URL I was using.  Initially, I used the current weather and 5-day/3-hour forecast calls, but realized quickly it would be easier in the long run with the One Call API call.

Once the weather was retrieved, specific weather data was gathered in the objects returned from the promise by traversing the objects and collecting the data into variables.  Then, the five day forecast was created by producing a function that appended divs representing the next five days.  MomentJS was used to get the current date and a for loop was created to add the index of the div + 1 (as the indexes started at 0) to produce dates for the next five days.  Header and paragraph elements were appended in the for loop correlating to date, temp, and humidity.

Next, functionality was added to the li elements for suggested cities with onclick events so that the API info was updated with the li text instead of the input search val.  The landing page left much to be desired as the five day forecast populated only when a city was searched, so I used Salt Lake City as the default to give the page cohesion from the get-go.

Text for the specific elements was linked to dynamically updated variables based on the info gathered from the API as well as descriptor text ("Temperature: ") and symbols (°F, %, etc.).  CSS was polished up a little bit once functionality was established, but not something to write home about.  Definitely an area to be improved upon.

Click <a href="https://hill1635.github.io/hill-weather-app/">here</a> to check it out!

Home page:
<img width="1440" alt="Screen Shot 2020-10-24 at 11 05 07 PM" src="https://user-images.githubusercontent.com/68754392/97099410-39540580-164e-11eb-9a9a-0673a7884b1f.png">
Results based on suggested:
<img width="1440" alt="Screen Shot 2020-10-24 at 11 05 20 PM" src="https://user-images.githubusercontent.com/68754392/97099412-3c4ef600-164e-11eb-8dec-4855b0acb712.png">
Results based on search:
<img width="1440" alt="Screen Shot 2020-10-24 at 11 05 46 PM" src="https://user-images.githubusercontent.com/68754392/97099413-3ce78c80-164e-11eb-80e8-8e286ba14783.png">
