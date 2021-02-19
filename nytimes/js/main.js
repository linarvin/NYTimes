//console.log("I am here.")

// --------- DOM Element ---------
// for menu btn 
const menuBtn = document.getElementById("menuBtn");
const overlayMenu = document.getElementById("overlayMenu");
const closeMenuBtn = document.getElementById("closeMenu");

// for search btn
const searchBtn = document.getElementById("searchBtn");
const overlaySeach = document.getElementById("overlaySearch");
const closeSearchBtn = document.getElementById("closeSearch");

// for showcase video & playBtn
const playBtn = document.getElementById("playBtn");
const playBtn2 = document.getElementById("playBtn2");
const showcaseVideoBtn = document.getElementById("showcaseVideoBtn");
const videoOverlay = document.getElementById("videoOverlay");
const closeVideoBtn = document.getElementById("closeVideoBtn");


// ------- Event Listener ---------
// when menu btn is clicked 
if(menuBtn){
    menuBtn.addEventListener("click", function(){
        overlayMenu.classList.add("show");
    });
}


// when the close menu btn is clicked
if(closeMenuBtn){
    closeMenuBtn.addEventListener("click", function(){
        overlayMenu.classList.remove("show");
    });
}


// when the search btn is clicked
if(searchBtn){
    searchBtn.addEventListener("click", function(){
        overlaySearch.classList.add("show");
    });
}


// when the close seach btn is clicked
if(closeSearchBtn){
    closeSearchBtn.addEventListener("click", function(){
        overlaySearch.classList.remove("show");
    });
}

// when the showcaseVideo btn is clicked
if(playBtn){
    playBtn.addEventListener("click", function(){
        videoOverlay.classList.add("show");
     });
}

// when the showcaseVideo btn is clicked
if(playBtn2){
    playBtn2.addEventListener("click", function(){
        videoOverlay.classList.add("show");
     });
}


// when the close showcaseVideo btn is clicked
if(closeVideoBtn){
    closeVideoBtn.addEventListener("click", function(){
        videoOverlay.classList.remove("show");
     });
}






// ----- Interactive Map --------------

const states = document.getElementsByClassName("state");
const flyoutPanel = document.getElementById("flyoutPanel");
const flyoutPanelCloseBtn = document.getElementById("flyoutPanelCloseBtn");
const stateName = document.getElementById("stateName");
const totalCases = document.getElementById("totalCases");
const totalDeaths = document.getElementById("totalDeaths");
const average14daySpan = document.getElementById("average14days");
const casesToday = document.getElementById("casesToday");
const percentageDifference = document.getElementById("percentageDifference");

// setting covidData to null
let covidData = null;

//1. fetch covid data api: put the data in covidData
fetch ('https://api.covidtracking.com/v1/states/current.json')
    .then(response => response.json())
    .then(data => covidData = data);

//2. loop through all of the items in the states & attach click event
for (let state of states ){
    // when you click on the state 
    state.addEventListener("click", function(){

        // get the state name 
        const clickedStateName = this.getAttribute("data-name");

        // get the current state abbreviation such as NY
        const stateAbbreviation = this.id;

        // if the matched covid data is found then return it
        const matchedCovidDataState = covidData.find(function(covidDataState){
            return stateAbbreviation == covidDataState.state;
        });
        //console.log(matchedCovidDataState);

        let historicalStateData = null;

        // Average of cases within the last 14 days 
        let accumlatedCases = 0;

        function calculate14DayAverage(data){
            for(let i = 0; i<14; i++){
                accumlatedCases += data[i].positiveIncrease;
            }
            let average14days = Math.round(accumlatedCases/14);
            

            // Case difference & case difference %
            let todayCases = data[0].positiveIncrease;

            let caseDifference = todayCases - average14days; 

            let caseDifferencePercentage = Math.round((caseDifference*100)/average14days);


            // ------ output values -------
            average14daySpan.innerText = average14days;

            casesToday.innerText = todayCases;

            percentageDifference.innerText = caseDifferencePercentage;
        }
        
        // fetch 14 day average api : present data for the current state
        // using ` ` : dynamic string which would allow you to use ${}
        fetch (`https://api.covidtracking.com/v1/states/${stateAbbreviation.toLowerCase()}/daily.json`)
            .then(response => response.json())
            .then(function(data) {
                historicalStateData = data;
                calculate14DayAverage(historicalStateData);
            });

        // if the (this) current selected state is active then 
        // remove the active function 
        if(this.classList.contains("active")){
            this.classList.remove("active");
        }

        // else reset all the states
        // and add active class when the state is selected
        else {
            // quick reset 
            for (let state of states){
                state.classList.remove("active");
            }// end of reset for loop

            // add the active class of the state 
            this.classList.add("active");

            // trigger the flyout panel 
            flyoutPanel.classList.add("show");

            //---------- Output Data Values -------------

            // h3 inner text will change to the state name 
            stateName.innerText = clickedStateName;

            // get the total cases of the matched states
            // and on web it show the cases
            totalCases.innerText = matchedCovidDataState.positive;
            
            // get the total death cases of the matched states
            // and on web it show the cases
            totalDeaths.innerText = matchedCovidDataState.death;


        }
    }); // click event end
}; // loop end

// flyout panel close btn listener
// if it is holding something true then use it 
// else false : won't do anything
if (flyoutPanelCloseBtn){
    flyoutPanelCloseBtn.addEventListener("click", function(){
        flyoutPanel.classList.remove("show");
    
        // quick reset 
        for (let state of states){
            state.classList.remove("active");
        }// end of reset for loop
    });
}

// ------- Author names ---------------

const author1 = document.getElementById("author1");
const author2 = document.getElementById("author2");
const author3 = document.getElementById("author3");
const author4 = document.getElementById("author4");
const author5 = document.getElementById("author5");

let name1 = "Mark Mazzetti";
author1.innerText = name1;
let name2 = "Helene Cooper";
author2.innerText = name2;
let name3 = "Jennifer Steinhauer";
author3.innerText = name3;
let name4 = "Zolan Kanno-Youngs";
author4.innerText = name4;
let name5 = "Luke Broadwater";
author5.innerText = name5;



