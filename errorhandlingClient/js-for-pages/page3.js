import { SERVER } from "../settings.js"
import { handleHttpErrors, makeOptions } from "../fetchUtils.js"

const API_URL = SERVER + "/api/quotes"

export function setUpAddButtonHandler() {
  document.getElementById("btn-add").onclick = addNewQuote;
}

async function addNewQuote() {

  document.getElementById("error").innerText = "" //reset error message field 
  document.getElementById("success").innerText = "" //reset error message field 
  const newQuote = {};
  newQuote.quote = document.getElementById("quote").value
  newQuote.ref = document.getElementById("author").value

  try {
    const options = makeOptions("POST", newQuote)
    const addedQuote = await fetch(API_URL, options)

    .then(res=>handleHttpErrors(res)) //handle errors
    
    //document.getElementById("addedQuote").innerText = JSON.stringify(addedQuote)
    document.getElementById("quote").value = ""; //clear field  
    document.getElementById("author").value = ""; //clear field 
    document.getElementById("success").innerText = "Quote added!"
    } catch(error) {
        document.getElementById("error").innerText = error.message //more error handling
    }

}