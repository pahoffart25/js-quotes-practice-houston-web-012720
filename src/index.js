BASE_URL = "http://localhost:3000/quotes?_embed=likes"
const quotelist = document.querySelector("ul#quote-list")
const form = document.querySelector("#new-quote-form")


fetch(BASE_URL)
.then(resp => resp.json())
.then(quotes => {
    quotes.forEach(quote => {
        showQuote(quote)
    });
})

function showQuote(quote){

const li = document.createElement("li")
li.className = "quote-card"

const blockquote = document.createElement("blockquote")
blockquote.className = "blockquote"

const p = document.createElement("p")
p.className = "mb-0"
p.innerText = quote.quote

const footer = document.createElement("footer")
footer.className = "blockquote-footer"
footer.innerText = quote.author

const br = document.createElement("br")

likeBtn = document.createElement("button")
likeBtn.className = "btn-success"
likeBtn.innerText = "Likes:" 

const span = document.createElement("span")
    if (!!quote.likes){
      span.innerText = quote.likes.length
    }
    else{
      span.innerText = 0
    }
    likeBtn.append(span)

    likeBtn.addEventListener("click", () => {
        fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          quoteId: quote.id,
          createdAt: Date.now()
        })
      })
        .then(span.innerText++)
    })


deleteBtn = document.createElement ("button")
deleteBtn.className = "btn-danger"
deleteBtn.innerText = "delete"

deleteBtn.addEventListener("click", () =>{
    fetch("http://localhost:3000/quotes/" + quote.id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(deletedQuote => {li.remove()})
})

editBtn = document.createElement("button")
editBtn.innerText = "edit"

blockquote.append(p, footer, br, likeBtn, deleteBtn, editBtn)
li.append(blockquote)
quotelist.append(li)

}



form.addEventListener("submit", () => {
    event.preventDefault()

    let quote = event.target[0].value
    let author = event.target[1].value

    fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quote: quote,
            author: author,
            likes: 0
        })
    })
    .then(res => res.json())
    .then(newQuote => {showQuote(newQuote)})

})

// vidhis solution

// const ul = document.querySelector("#quote-list")
// const form = document.querySelector("#new-quote-form")

// fetch("http://localhost:3000/quotes?_embed=likes")
// .then(res => res.json())
// .then(quotes => {
//     quotes.forEach(quote => makeQuote(quote))
// })

// function makeQuote(quote){

// {/* <li class='quote-card'>
// <blockquote class="blockquote">
//   <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//   <footer class="blockquote-footer">Someone famous</footer>
//   <br>
//   <button class='btn-success'>Likes: <span>0</span></button>
//   <button class='btn-danger'>Delete</button>
// </blockquote>
// </li> */}

// const li = document.createElement('li')
// li.className = "quote-card"

// const bq = document.createElement('blockquote')
// bq.className = "blockquote"

// const p = document.createElement("p")
// p.className="mb-0"
// p.innerText = quote.quote

// const footer = document.createElement("footer")
// footer.className = "blockquote-footer"
// footer.innerText = quote.author

// const br = document.createElement('br')

// const likeBtn = document.createElement('button')
// likeBtn.className = "btn-success"
// likeBtn.innerHTML = `Likes: <span>${quote.likes.length}</span>`

// likeBtn.addEventListener("click", () => {
//     fetch("http://localhost:3000/likes", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             quoteId: quote.id
//         })
//     })
//     .then(res => res.json())
//     .then(newlike => {
//         // console.log(newlike)
//         quote.likes.push(newlike)
//         likeBtn.innerHTML = `Likes: <span>${quote.likes.length}</span>`
//     })
// })

// const delBtn = document.createElement('button')
// delBtn.className = "btn-danger"
// delBtn.innerText = "Delete"

// delBtn.addEventListener("click", () => {

//     fetch("http://localhost:3000/quotes/"+quote.id, {
//         method: "DELETE"
//     })
//     .then(res => res.json())
//     .then(noNeed => {
//         li.remove()
//     })
// })

// bq.append(p,footer,br,likeBtn,delBtn)

// li.append(bq)

// ul.append(li)
// }


// form.addEventListener("submit", () => {
//     event.preventDefault()

//     fetch("http://localhost:3000/quotes", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             quote: event.target[0].value, //form[0].value
//             author: event.target[1].value //form[1].value
//         })
//     })
//     .then(res => res.json())
//     .then(newQuote => {
//         newQuote.likes = [] //so that it can display likes for new quotes
//         makeQuote(newQuote)
//     })
// })

