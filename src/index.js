// Code here

// Global Variables
const beerDetails = document.querySelector(".beer-details")
const descForm = document.querySelector(".description")
const reviewForm = document.querySelector(".review-form")
let beerReviews = document.querySelector(".reviews")
const beerList = document.querySelector("#beer-list")
let beersGlobalArray = []

// This was displayFirstBeer (core deliv), changed for adv deliv
function displayBeer (beerId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(response => response.json())
        .then(beer => {
            let beerH2 = document.querySelector(".beer-details h2")
                beerH2.textContent = beer.name
            let beerImg = document.querySelector(".beer-details img")
                beerImg.src = beer.image_url

            let beerDesc = document.querySelector(".beer-details textarea")
            beerDesc.textContent = ''
            beerDesc.textContent = beer.description

            beerReviews.innerHTML = ''
            beer.reviews.forEach(review => {
                let li = document.createElement("li")
                    li.textContent = review
                beerReviews.append(li)
            })  
        })       
}

// not used in adv deliv, core deliv
function fetchFirstBeer () {
    fetch("http://localhost:3000/beers/1")
        .then(response => response.json())
        .then(beer => {
            //console.log(beer)
            displayFirstBeer(beer)
        })
}

// initial fetch all beer for nav bar
function fetchBeers () {
    fetch("http://localhost:3000/beers")
        .then(response => response.json())
        .then(beers => {
            console.log(beers)
            beersGlobalArray = beers
            displayBeersNav(beers)

            // So first beer shows, set = to first in array, maybe id 1 is gone
            let initialId = beers[0].id
            reviewForm.dataset.id = beers[0].id
            descForm.dataset.id = beers[0].id
            displayBeer(initialId)
        })
}

// render beer nav bar
function displayBeersNav(beersArray) {
    beerList.innerHTML = ''
    beersArray.forEach(beer => {
        let li = document.createElement("li")
            li.textContent = beer.name
            li.dataset.id = beer.id

        beerList.append(li)
    })
}


// Event Listeners

beerList.addEventListener("click", event => {
    beerId = event.target.dataset.id
    //console.log(beerId)
    reviewForm.dataset.id = beerId
    descForm.dataset.id = beerId
    displayBeer(beerId)
})

// Persist reviews
reviewForm.addEventListener("submit", event => {
    event.preventDefault()
    let id = reviewForm.dataset.id
    let newReview = document.querySelector(".review-form textarea").value
    
    let reviewArray = beersGlobalArray.find(beer =>  beer.id === parseInt(id)).reviews
    reviewArray.push(newReview)
    
    fetch(`http://localhost:3000/beers/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reviews : reviewArray
        })
    })
    .then(response => response.json())
    .then(newObj => {
        //console.log(newObj)
        displayBeer(newObj.id)
    })
})


descForm.addEventListener("submit", event => {
    event.preventDefault()

    let newDescription = document.querySelector(".beer-details textarea").value

    newBeerObj = {
        description : newDescription,
    }

    //console.log(newBeerObj)
    
    fetch("http://localhost:3000/beers/1", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBeerObj)
    })
    .then(response => response.json())
    .then(updBeerObj => {
        console.log(updBeerObj)
        displayBeer(updBeerObj.id)
    })
})

beerReviews.addEventListener("click", event => {
    
})

//fetchFirstBeer()
fetchBeers()