import kanbanApi from "../api/kanbanApi.js";
import DropZone from "./DropZone.js";

export default class Item{
    constructor(id,content){
        const bottomZropZone=DropZone.createDropZone();

        this.elements={};
        this.elements.root=Item.createRoot();
        this.elements.input=this.elements.root.querySelector('.kanban__item-input')

        this.elements.root.appendChild(bottomZropZone)

        this.content=content
        this.elements.root.dataset.id=id
        this.elements.input.textContent=content

        const onBlur=()=>{
            const newContent=this.elements.input.textContent.trim()
            if (newContent == this.content){
                return
            }
            this.content=newContent;
            kanbanApi.updateItem(id,{
                content:this.content
            });
        }
        this.elements.input.addEventListener("blur",onBlur)
        this.elements.root.addEventListener('dblclick',()=>{
            const check=confirm('are sure to delete your item')
            if(check){
                kanbanApi.deleteItem(id)
                this.elements.input.removeEventListener('blur',onBlur)
                this.elements.root.parentElement.removeChild(this.elements.root)
            }
        })
        this.elements.root.addEventListener('dragstart',e=>{
            e.dataTransfer.setData('text/plain',id)
        })
        this.elements.root.addEventListener('drop',e=>{
            e.preventDefault()
        })

    }
    static createRoot(){
        const range=document.createRange()
        range.selectNode(document.body)
        return range.createContextualFragment(`
         <div class='kanban__item' draggable='true'> 
            <div class='kanban__item-input' contenteditable></div>
         </div>  
        `).children[0]
    }
}