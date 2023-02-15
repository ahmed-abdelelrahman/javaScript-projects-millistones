import Column from "./Column.js"

export default class kanban{
    constructor(root){
        this.root=root
        kanban.columns().forEach(column=>{
            const columnView=new Column(column.id,column.title)
            this.root.appendChild(columnView.elements.root)
        })
    }
    static columns(){
        return [
            {
                id:1,
                title:'not started',
            },
            {
                id:2,
                title:'progress',
            },
            {
                id:3,
                title:'completed'
            }
        ]
    }
}