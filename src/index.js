// Code here

const beerDetails = document.querySelector(".beer-details")
const descForm = document.querySelector(".description")

function displayFirstBeer (beer) {
    let beerH2 = document.querySelector(".beer-details h2")
        beerH2.textContent = beer.name
    let beerImg = document.querySelector(".beer-details img")
        beerImg.src = beer.image_url

    let beerDesc = document.querySelector(".beer-details textarea")
        beerDesc.textContent = beer.description

    beer.reviews.forEach(review => {
        let beerReviews = document.querySelector(".reviews")
        let li = document.createElement("li")
            li.textContent = review
        beerReviews.append(li)
    })
        
}

function fetchFirstBeer () {
    fetch("http://localhost:3000/beers/1")
        .then(response => response.json())
        .then(beer => {
            console.log(beer)
            displayFirstBeer(beer)
        })
}

// Event Listeners

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