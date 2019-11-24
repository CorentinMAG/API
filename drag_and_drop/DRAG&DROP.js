export class Drag{
    constructor(...droppers){
        this._droppers=droppers;
        this._elem=[];
        this._currentDrag='';
        this._currentDropper='';
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
        this._elem.forEach((element)=>{
            element.draggable=true;
            element.style.cursor='grab';
            element.addEventListener('dragstart',(e)=>{
                e.dataTransfer.setData('text/plain','');
                this._currentDrag = e.currentTarget;
                this._currentDropper=e.currentTarget.parentElement;
            });
        });

        this._droppers.forEach((dropper)=>{
            dropper.classList.add('Dropper');
            dropper.addEventListener('dragover',(e)=>{
                e.preventDefault();
                e.currentTarget.classList.add('over');
            });
            dropper.addEventListener('dragleave',(e)=>{
                e.currentTarget.classList.remove('over');
            });
            dropper.addEventListener('drop',(e)=>{
                e.preventDefault();
                if(e.dataTransfer.files.length >0){
                    this._Upload(e.dataTransfer.files[0],e.currentTarget)
                }else{
                    if(e.currentTarget !== this._currentDropper){
                        e.currentTarget.appendChild(this._currentDrag);
                    }
                    e.currentTarget.classList.remove('over');
                }
            });
        });
    };
    _Upload(file,area){
        let img = document.createElement('img');
        img.classList.add('img_drop');
        if(file.name.split('.')[1]==='pdf'){
            img.src='./pdf.jpg'
        }else{
            img.src = window.URL.createObjectURL(file);
        }
        img.draggable=true;
        img.style.cursor='grab';
        area.appendChild(img);

        img.addEventListener('dragstart',(e)=>{
            e.dataTransfer.setData('text/plain','');
            this._currentDrag = e.currentTarget;
            this._currentDropper=e.currentTarget.parentElement;
        });
        area.classList.remove('over');
    }

}