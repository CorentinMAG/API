export  function example (){
    let File = document.querySelector("#AcceptFile");
    let spanName=document.querySelector("#name");
    let spanLastModified=document.querySelector("#lastModified");
    let spanSize=document.querySelector("#size");
    let spanType=document.querySelector("#type");
    let ZoneReader=document.querySelector("#ZoneReader");
    let body=document.querySelector('body');

    File.onchange = (e)=>{
        let element = e.target;
        let fichier = element.files[0];
        let name = fichier.name;
        spanName.textContent=name.split('.')[0];
        let lastModified = fichier.lastModified;
        let newDate = new Date(lastModified);
        spanLastModified.textContent=newDate.toLocaleDateString()+' '+newDate.toLocaleTimeString();
        let size = fichier.size; //bytes 1byte = 1 octet  1Mo = 1 048 576 octet
        let Mo = (size / 1048576);
        let MoVisible = Number(Mo).toPrecision(2);
        if(MoVisible <1){
            let KoVisible = MoVisible * 1000;
            spanSize.textContent=KoVisible+' Ko';
        }else{
            spanSize.textContent=MoVisible+' Mo';
        }
        let type = fichier.type;
        spanType.textContent=type;

        let image_available=document.querySelector('img');
        if(image_available){
            body.removeChild(image_available);
        }

        let regex= /^image/i;
        if (regex.test(type)===false){
            if(type==='text/plain'){
                let reader=new FileReader();
                reader.onload = (e)=>{
                    ZoneReader.textContent = reader.result;
                };
                reader.readAsText(fichier);
            }
            else{
                ZoneReader.textContent='Can\'t overview a file from an application'
            }
        }else{
            let img=document.createElement('img');
            ZoneReader.textContent="";
            img.classList.add('AddImg');
            img.src = window.URL.createObjectURL(fichier);
            body.appendChild(img);

        }
    }
}

