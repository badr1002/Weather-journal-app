/* Global Variables */
// Personal API Key for OpenWeatherMap API
let myKey = 'ec4621b316a64c64fc27916128d8953f';
let myUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', (e) => {
    const zipCode = document.getElementById('zip').value;
    const usrFeelings = document.getElementById('feelings').value;
    getWeatherApi(myUrl, zipCode, myKey).then(data => {
        postData('/api', {
            city: data.name,
            temp: data.main.temp,
            date: newDate,
            usrFeelings: usrFeelings
        });
        updatePage('/all');
    });
});
/* Function to GET Web API Data*/
const getWeatherApi = async(url, zip, key) => {
        const res = await fetch(`${url}${zip}&appid=${key}&units=imperial`);
        try {
            const data = await res.json();
            return data;
        } catch (err) {
            console.error('error')
        }
    }
    /* Function to POST data */
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (err) {
        console.error('error')
    };
};
/* Function to GET Project Data */
const updatePage = async(url = '') => {
    const req = await fetch(url);
    try {
        const allData = await req.json();
        document.getElementById('city').innerHTML = `City is: ${ allData[0].city}`;
        document.getElementById('date').innerHTML = `The date now is: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `The tempreture is: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `Your feeling is: ${ allData[0].usrFeelings}`;
    } catch (err) {
        console.error('error')
    };
};