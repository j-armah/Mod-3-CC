// Code here

const beerDetails = document.querySelector(".beer-details")
const descForm = document.querySelector(".description")
const reviewForm = document.querySelector(".review-form")
let beerReviews = document.querySelector(".reviews")
const beerList = document.querySelector("#beer-list")

function displayBeer (beerId) {

    fetch(`http://localhost:3000/beers/${beerId}`)
        .then(response => response.json())
        .then(beer => {
            let beerH2 = document.querySelector(".beer-details h2")
                beerH2.textContent = beer.name
            let beerImg = document.querySelector(".beer-details img")
                beerImg.src = beer.image_url

            let beerDesc = document.querySelector(".beer-details textarea")
            beerDesc.textContent = beer.description

            beerReviews.innerHTML = ''
            beer.reviews.forEach(review => {
                let li = document.createElement("li")
                    li.textContent = review
                beerReviews.append(li)
            })  
        })       
}

function fetchFirstBeer () {
    fetch("http://localhost:3000/beers/1")
        .then(response => response.json())
        .then(beer => {
            //console.log(beer)
            displayFirstBeer(beer)
        })
}

function fetchBeers () {
    fetch("http://localhost:3000/beers")
        .then(response => response.json())
        .then(beers => {
            console.log(beers)
            displayBeersNav(beers)
        })
}

function displayBeersNav(beersArray) {
    beerList.innerHTML = ''
    beersArray.forEach(beer => {
        let li = document.createElement("li")
            li.textContent = beer.name
            li.dataset.id = beer.id

        beerList.append(li)
    })
}

// function addReview(beerObj) {

// }

// Event Listeners

beerList.addEventListener("click", event => {
    beerId = event.target.dataset.id
    //console.log(beerId)
    displayBeer(beerId)
})

reviewForm.addEventListener("submit", event => {
    event.preventDefault()
    let newReview = document.querySelector(".review-form textarea").value
    console.log(newReview)
    let li = document.createElement("li")
        li.textContent = newReview

    beerReviews.append(li)
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
        displayFirstBeer(updBeerObj)
    })
})

fetchFirstBeer()
fetchBeers()