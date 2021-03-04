console.log('Client file');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pathToMonitor = search.value;

    console.log(location);

    messageOne.textContent = 'loading forcast...'
    messageTwo.textContent = ''

    fetch('/weather?pathToMonitor=' + pathToMonitor).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;    
            } else {
                messageOne.textContent = data.pathToMonitor;    
                // messageTwo.textContent = JSON.stringify(data.forecast);                 
            }        
        })
    })
})

const socket = io()

socket.on('pathToMonitorUpdated', (path) => {
    console.log('The pathToMonitor has been updated! ', path);
})