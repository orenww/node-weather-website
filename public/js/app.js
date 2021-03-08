console.log('Client file');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

const messageOne1 = document.querySelector('#message-11')
const messageTwo1 = document.querySelector('#message-22')
const messageThree1 = document.querySelector('#message-33')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;

    console.log(location);

    messageOne.textContent = 'loading price...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log('======================================================');
            console.log(data);
            console.log('======================================================');
            if(data.error){
                messageOne.textContent = data.error;    
            } else {
                console.log(JSON.stringify(data));
                messageOne.textContent = JSON.stringify(data.country[0]) + ' ' +  JSON.stringify(data.itemId[0]);    
                messageTwo.textContent = JSON.stringify(data.title[0]);                 
                messageThree.textContent = JSON.stringify(data.price[0]);                 

                messageOne1.textContent = JSON.stringify(data.country[1]) + ' ' +  JSON.stringify(data.itemId[1]);    
                messageTwo1.textContent = JSON.stringify(data.title[1]);                 
                messageThree1.textContent = JSON.stringify(data.price[1]);                 
            }        
        })
    })
})