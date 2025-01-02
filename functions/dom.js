/**
 * 
 * @param {String} tag 
 * @param {object} attributes 
 * @param {*} children 
 * @returns {HTMLElement}
 */
export function createElelement(tag,attributes={},children=[]){
    const element = document.createElement(tag)
    for(const[attribute, value] of Object.entries(attributes)){
        if(value !== null){
            element.setAttribute(attribute,value)
        }
        
    }
    return element
}