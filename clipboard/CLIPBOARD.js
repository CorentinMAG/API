export function example(){
    let button=document.querySelector('button');
    let wrapper = document.querySelector('#wrapper');
    let wrapper2 = document.querySelector('#wrapper2');
    let txtArea=document.querySelectorAll('textarea')[1];
    let p =document.querySelector('p');
    p.addEventListener('copy',(e)=>{
        const text = document.getSelection();
        e.clipboardData.setData('text/plain',text.toString().toUpperCase());
        e.preventDefault();
    });
    txtArea.addEventListener('paste',(e)=>{
        let paste='data pasted\n';
        e.target.value+=paste;
        e.preventDefault();
    });
    p.addEventListener('cut',(e)=>{
        let text = 'data cut';
        e.clipboardData.setData('text',text);
        e.preventDefault();

    });
    button.addEventListener('mouseover',e=>{
        wrapper.style.visibility='visible';
    });
    button.addEventListener('mouseout',e=>{
        wrapper.style.visibility='hidden';
    });
    button.addEventListener('click', e => {
        wrapper.style.visibility='hidden';
        wrapper2.style.visibility='visible';
        setTimeout(()=>{
            wrapper2.style.visibility='hidden'
        },1000);
        wrapper2.style.visibility='visible';
        if (!navigator.clipboard) {
            console.error('The clipboard API isn\'t available');
            return
        }
        const text = p.innerText;
        try {
            navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy!', err)
        }
    });

}