import { createElelement } from "../functions/dom.js"

/**
 * @typedef {object} Message
 * @property {number} id
 * @property {string}  title
 */


export class MessageList {
    /**
     * @type {Message[]}
     */
    #messages = []

    /**
     * @type {HTMLUListElement}
     */
    #listElement = []

    /**
     * 
     * @param {Message[]} messages 
     */
    constructor(messages){
        this.#messages = messages
    }
    /**
     * 
     * @param {HTMLElement} element 
     */
    appendTo (element){
        element.innerHTML = `
        <div class="text-center">
            <h1> DIGITAL MESSAGE WALL </h1>
            <p>Laisse ton message ici et partagez le lien pour que les autres puissent lire et écrire des messages également.</p>
        </div>
        <form class="d-flex pb-4">
            
            <input required="" class="form-control mx-2" type="text" placeholder="Bonne annee a toi..." name="text" data-com.bitwarden.browser.user-edited="yes">
            <button class="btn btn-primary">Ajouter</button>
        </form>
        <main>

            <ul class="list-group">
                            
            </ul>
        </main>`
        this.#listElement = element.querySelector(".list-group")
        for(let message of this.#messages){
            const item = new MessageListItem(message)
            this.#listElement.append(item.element)
        }
        element.querySelector("form").addEventListener("submit", e => this.#onSubmit(e))
    }

    /**
     * @param {SubmitEvent} e
     */
    #onSubmit (e){
        e.preventDefault()
        const form = e.currentTarget
        const text = new FormData(form).get("text").toString().trim()
        if(text === ''){
            return
        }   
        const message = {
            id: Date.now(),
            text: text
        }


        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.2.0'},
            body: `{"text":"${text}"}`
          };
          
          fetch('http://localhost:3000/api/add-message', options)
            .then(response => response.json())
            .then(response => {
                const item = new MessageListItem(message)
                this.#listElement.prepend(item.element)
                form.reset()
                console.log(response)
            })
            .catch(err => console.error(err));



        
        
    }

}

class MessageListItem {
    #element
    /**
     * @type {Message}
     */
    constructor (message){
        const id = message.id
        const li = createElelement("li",{
            class: "message list-group-item d-flex align-items-center"
        })

        this.#element = li  
        
        const label = createElelement("label",{
            class: "ms-2 form-check-label",
            for: id
        })
        label.innerText = message.text
        
        li.append(label)

          
        
        
       
    }

    /**
     * 
     * @return {HTMLElement} element 
     */

    get element (){
        return this.#element
    }   
}