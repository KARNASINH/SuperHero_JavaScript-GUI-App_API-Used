//Stored Table element into to variable.
const tableBody = document.querySelector('#tableBody');

//When page load first time keep searchText variable blank.
let searchText = ""; 

//This variable is used to store JSON object's into Array format.
let resultArray;

//This variable is used to store single Superhero JSON object once user clicked from a table list.
let superHerodetails;

//Stored button element into variable.
let buttonClicked = document.querySelector('#buttonClicked');

//These variables used to store nested JSON object of clicked superhero.
let powerstats = document.querySelector('#powerstats');
let appearance = document.querySelector('#appearance');

//Stored image element into variable.
let superHeroImage = document.querySelector('#superHeroImage');

//This annonymus function is called once user enter word into seach section and click search button.
buttonClicked.addEventListener('click', function(){
    //Grabbing a text entered by user to built API string.
    searchText = document.querySelector('#searchText').value;

    //This is function is called from here.
    apiRequest();
});


//This is Asynchronous fucntion called from about function once user click on search button. 
async function apiRequest()
{
    //This is try block which calls API.
    try
    {
        //Every time user search superhero this makes table empty.
        tableBody.innerHTML = "";

        //Every time user search superhero this clear out old searched superhero JSON object.
        resultArray = "";

        //This is a API string which takes search word and calls API
        let apiString = "https://www.superheroapi.com/api.php/1310202806140671/search/" + searchText;

        //Wait till API response is received.
        const res = await fetch(apiString)

        //Check response status, if not okay then throws error.
        if(!res.ok)
        {
            throw Error(res.statusText)
        }

        //Wait till API reponse received and conver response body into JSON object.
        const data = await res.json()

        //Storing API Response JSON object into Array.
        resultArray = data.results;

        //This is serial number sequence for table indexing in 1st column.
        let serialNumber = 1;

        //Running For-Each loop and iterate through all JSON key-pair value.
        resultArray.forEach(element => {

            //Creats TR element.
            let tr1 = document.createElement('tr');
        
            //Creats TH heading element.
            let th1 = document.createElement('th');
            //Setting up scope attribute.
            th1.setAttribute('scope', 'row');
            //Setting up innner text.
            th1.innerText = serialNumber;
    
            //Creats TD elements.
            let td1 = document.createElement('td');
            td1.innerText = element.id ;

            let td2 = document.createElement('td');
            td2.innerText = element.name ;        
    
            //Appending TR and TD element to display a table form.
            tr1.appendChild(th1);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
    
            tableBody.appendChild(tr1);

            //Everytime do single inceament into serailNumebr variable.
            serialNumber++;
        });
    }
    //If API doesn't respond it print error message.
    catch(error)
    {
        console.log(error)
    }
}
//Once user click on any Superhero from the table it calls this function.
const clickedText = (event) => {
    
    //Grabs ID or Name of the superhero clicked from the table.
    let clickedSuperHeroValue = event.target.innerText;

    superHerodetails = "";

    //Creats variable to store nested JSON object.
    let powerstatsArray;
    let appearanceArray;

    //Iterating through all JSON object and checkig it's match with USER clicked sueprhero details or not.
    resultArray.forEach(element => {
        
        //Goes into code if user has selected sueprhero from the table.
        if(clickedSuperHeroValue === element.id || clickedSuperHeroValue === element.name)
        {
            //Iterating throuhg all child element until it deleted all child elements.
            while (powerstats.firstChild) 
            {
                powerstats.removeChild(powerstats.firstChild);
            }

            //Iterating throuhg all child element until it deleted all child elements.
            while (appearance.firstChild) 
            {
                appearance.removeChild(appearance.firstChild);
            }

            //Storing JSON object of single sueprhero clicked by user.
            superHerodetails = element;

            //Sotring selected superhero details into variable/
            powerstatsArray = superHerodetails.powerstats;
            appearanceArray = superHerodetails.appearance;

            //Displaying image of selected superhero.
            superHeroImage.setAttribute('src',superHerodetails.image.url);

            //Iterating through all the key-value pair of the Power Statics JSON object and printing them as a LI element on the screen.
            for (const [key, value] of Object.entries(powerstatsArray)) 
            {
                //Creating new LI element each time.                
                let newLi1 = document.createElement("li");
                //Setting up class attribute.
                newLi1.setAttribute('class', 'mt-3')
                //Making first letter of LI element capital and rest are small.
                newLi1.textContent = key[0].toUpperCase() + key.slice(1).toLowerCase() + " : " + value;
                powerstats.appendChild(newLi1);
            }

            //Iterating through all the key-value pair of the Appearance JSON object and printing them as a LI element on the screen.
            for (const [key, value] of Object.entries(appearanceArray)) 
            {                
                let newLi2 = document.createElement("li");
                newLi2.setAttribute('class', 'mt-3')
                newLi2.textContent = key[0].toUpperCase() + key.slice(1).toLowerCase() + " : " + value;
                appearance.appendChild(newLi2);
            }
        }

    });

    //Clear out old values if user click on another super hero.
    powerstatsArray = "";
    appearanceArray = "";
  }

//Listen if user click on any element reside in the populated table.
tableBody.addEventListener('click', clickedText);
  