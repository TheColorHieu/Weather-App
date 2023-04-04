//creating a button 
const button = document.getElementById('output')

button.addEventListener('click',function (event){
    event.preventDefault();
    console.log('testing')

})

//creating the fetch function 
function fetchData(url){
return fetch(url)
.then(response => response.json())
.then(data => {

    return data;
})
.catch(error => console.error(error));

}


