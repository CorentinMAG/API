export function example(){
    const ratio=.6;
    let observer=null;
    const spies=document.querySelectorAll('section[data-spy]');

    const activate=function(elem){
        const id=elem.getAttribute('id');
        const anchor = document.querySelector("a[href='#"+id+"']");
        if(anchor===null){
            return null
        }
        let active_element = document.querySelectorAll('.active');
        active_element.forEach(elem=> elem.classList.remove('active'));
        anchor.classList.add('active');
    };

    const callback =function(entries,observer){
        entries.forEach(entry=>{
            if(entry.intersectionRatio >0){
                activate(entry.target)
            }
        })
    };

    const observe =function(elems) {
        if (observer !== null) {
            elems.forEach(elem => observer.unobserve(elem))
        }
        const y = Math.round(window.innerHeight * ratio);
        observer = new IntersectionObserver(callback, {
            //top right bottom left
            rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
        });
        elems.forEach(elem =>observer.observe(elem))
    };

    if (spies.length > 0) {
        observe(spies);
        window.addEventListener('resize', ()=> observe(spies))
    }
}