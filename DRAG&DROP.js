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
        let currentDropper='';
        this._elem.forEach((element)=>{
            element.draggable=true;
            element.addEventListener('dragstart',(e)=>{
                e.dataTransfer.setData('text/plain','');
                currentDrag = e.currentTarget;
                currentDropper=e.currentTarget.parentElement;
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
                e.preventDefault();
                if(e.dataTransfer.files.length >0){
                    //mettre en place des contrôles pour type de fichier,size ....
                    Upload(e.dataTransfer.files[0],e.currentTarget)
                }else{
                    if(e.currentTarget !== currentDropper){
                        e.currentTarget.appendChild(currentDrag);
                    }
                    e.currentTarget.classList.remove('over');
                }
            });
        });
        function Upload(file,area){
            let img = document.createElement('div');
            img.style.width='60px';
            img.style.height='60px';
            img.style.background = 'url('+window.URL.createObjectURL(file)+')';
            img.style.backgroundSize='cover';
            img.draggable=true;
            area.appendChild(img);

            img.addEventListener('dragstart',(e)=>{
                e.dataTransfer.setData('text/plain','');
                currentDrag = e.currentTarget;
                currentDropper=e.currentTarget.parentElement;
            });
            area.classList.remove('over');
            //fetch pour mettre le fichier sur le serveur
        }
    }
}