export function example(){
    const ratio=0.6;
    let observer=null;
    const activate=function(entry){
        const id=entry.getAttribute('id');
        const anchor = document.querySelector("a[href='#"+id+"']");
        if(anchor===null){
            return null
        }
        let active_element = document.querySelectorAll('.active');
        active_element.forEach(function(elem){
            elem.classList.remove('active')
        });
        anchor.classList.add('active');
    };

    const callback =function(entries,observer){
        entries.forEach(function(entry){
            if(entry.intersectionRatio >0){
                activate(entry.target)
            }
        })
    };

    const observe =function(elems){
        if(observer !=null){
            elems.forEach(function(elem){
                observer.unobserve(elem)
            })
        }
        const y=Math.round(window.innerHeight*ratio);
        observer=new IntersectionObserver(callback,{
            //top right bottom left
            rootMargin:`-${window.innerHeight-y-1}px 0px -${y}px 0px`
        });
        spies.forEach(function(elem){
            observer.observe(elem);
        });
    };

    const spies=document.querySelectorAll('section[data-spy]');
    if(spies.length>0){
        observe(spies);
        window.addEventListener('resize',function(){
            observe(spies);
        })
    }
}