import { fetchJSON } from "./functions/api.js"
import { createElelement } from "./functions/dom.js"
import { MessageList } from "./Components/MessageList.js"

try{
    const messages = await fetchJSON("http://localhost:3000/api/get-message")
    const list = new MessageList(messages)
    list.appendTo(document.querySelector('#messagelist'))
} catch (error){
    console.log(error)
    const alertElement = createElelement("div",
        {
        class: "alert alert-danger m-2",
        role: "alert"
        })
    alertElement.innerText = "Impossible de charger les todos"
    document.body.prepend(alertElement)
}

