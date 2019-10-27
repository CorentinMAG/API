export class Drag{
    constructor(...droppers){
        this.droppers=droppers;
        this._elem=[];
        if(droppers.length <2){
            throw new Error('Add at least 2 droppers !')
        }
        for(let dropper of droppers){
            for(let element of dropper.children){
                this._elem.push(element);
            }
        }
    }
    AllowDragDrop(){
        let currentDrag='';
        this._elem.forEach((element)=>{
            element.draggable=true;
            element.addEventListener('dragstart',(e)=>{
                e.dataTransfer.setData('text/plain','');
                currentDrag = e.currentTarget;
            });
        });

        this.droppers.forEach((dropper)=>{
            dropper.addEventListener('dragover',(e)=>{
                e.preventDefault();
                e.currentTarget.classList.add('over');
            });
            dropper.addEventListener('dragleave',(e)=>{
                e.currentTarget.classList.remove('over');
            });
            dropper.addEventListener('drop',(e)=>{
                let otherDropper = this.droppers.find((x)=>{ return x !==e.currentTarget});
                e.currentTarget.appendChild(currentDrag);
                e.currentTarget.classList.remove('over');
            });
        })
    }
}