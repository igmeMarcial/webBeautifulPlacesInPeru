
document.addEventListener("DOMContentLoaded", function() {
   class Slide { 
     DOM = {
        el: null,
        inner: null,
        img: null,
        imgInner: null,
        content: null,
        contentImg: null,
        contentTexts: null
    };
    constructor(e) {
        this.DOM.el = e,
        this.DOM.inner = this.DOM.el.querySelector(".slide__inner"),
        this.DOM.img = this.DOM.el.querySelector(".slide__img"),
        this.DOM.imgInner = this.DOM.el.querySelector(".slide__img-inner")
        
    }
    
    }

// data
    
    const dataAll = [
        { id: 1, title: "Machu Picchu", src: "./assets/img1.jpg", place: "lugar1" },
        { id: 2, title: "Moray", src: "./assets/img2.jpg", place: "lugar2" },
        { id: 3, title: "Costa verde", src: "./assets/img3.jpg", place: "lugar3" },
        { id: 4, title: "Sacsayhuamán", src: "./assets/img4.jpg", place: "lugar4" },
        { id: 5, title: "Montaña de Siete Colores", src: "./assets/img5.jpg", place: "lugar5" },
        { id: 6, title: "Valle de Colca", src: "./assets/img6.jpg", place: "lugar5" },
        { id: 7, title: "Plaza de Armas Lima", src: "./assets/img7.jpg", place: "lugar5" },
        { id: 8, title: "Qori Kancha", src: "./assets/img8.jpg", place: "lugar5" },
        { id: 9, title: "Salar de Maras", src: "./assets/img9.jpg", place: "lugar5" },
        { id: 10, title: "Laguna Humantay", src: "./assets/img10.jpg", place: "lugar5" },
        { id: 11, title: "Plaza de Armas Arequipa", src: "./assets/img11.jpg", place: "lugar5" },
        { id: 12, title: "Plaza de Armas Cusco", src: "./assets/img12.jpg", place: "lugar5" },
        { id: 13, title: "Lago Titicaca", src: "./assets/img13.jpg", place: "lugar5" },
        
]

    function loadData() {
        let container = document.querySelector(".pr-slides");
        let navName = document.querySelector(".pr-frame__nav");
        let navHtml = "";
        let html = "";       
        dataAll.forEach((item, index) => {
             navHtml += `
                <a href="#" class="btn magnet frame__nav-button ${item.id==1?"frame__nav-button--current":""}">
                <span class="btn-content"><span class="btn-anchor">${item.title}</span></span>
            </a>
            `
             html += `
            <div class="pr-slide">
                <a href="#" class="slide__inner link-on-img">
                    <h2>${item.title}</h2>
                    <div class="slide__img">
                        <div class="img-holder slide__img-inner">
                            <img
                                data-src="${item.src}"                             
                                alt="${item.title}"
                                class="lazyloaded"
                                src="${item.src}"
                            />
                        </div>
                    </div>
                </a>
            </div>
            `
           
            // console.log(item)
        })
        navName.innerHTML = navHtml;
         container.innerHTML = html;
    }
    loadData();





    gsap.registerPlugin(Observer);
    const DOM = {
    slides: [...document.querySelectorAll(".pr-slide")],
    navigationItems: document.querySelectorAll(".pr-frame__nav > .frame__nav-button")
    }
    
    // console.log(DOM.navigationItems)
    const totalSlides = DOM.slides.length;
    let slidesArr = [];
    DOM.slides.forEach((e) => {
        slidesArr.push(new Slide(e))
    })
    // console.log(slidesArr);

    let current = -1
        , isAnimating = !1;
    
    const setCurrentSlide = e=>{
    -1 !== current && slidesArr[current].DOM.el.classList.remove("slide--current"),
    current = e,
    slidesArr[current].DOM.el.classList.add("slide--current"),
            DOM.navigationItems[current].classList.add(".pr-frame__nav-button--current")//ojito
        
    },
      next = ()=>{
    navigate(current < totalSlides - 1 ? current + 1 : 0)
}
  , prev = ()=>{
    navigate(current > 0 ? current - 1 : totalSlides - 1)
        }
     , navigate = e=>{
    isAnimating = !0,
    DOM.navigationItems[current].classList.remove("frame__nav-button--current"),
    DOM.navigationItems[e].classList.add("frame__nav-button--current");
    const t = current < e ? 0 === current && e === totalSlides - 1 ? "prev" : "next" : current === totalSlides - 1 && 0 === e ? "next" : "prev"
      , n = slidesArr[current];
    current = e;
    const r = slidesArr[current];
    gsap.timeline({
        defaults: {
            duration: 1.6,
            ease: "power3.inOut"
        },
        onComplete: ()=>{
            n.DOM.el.classList.remove("slide--current"),
            n.isOpen && hideContent(n),
            isAnimating = !1
        }
    }).addLabel("start", 0).set([n.DOM.imgInner, r.DOM.imgInner], {
        transformOrigin: "next" === t ? "50% 0%" : "50% 100%"
    }, "start").set(r.DOM.el, {
        yPercent: "next" === t ? 100 : -100
    }, "start").set(r.DOM.inner, {
        yPercent: "next" === t ? -100 : 100
    }, "start").add((()=>{
        r.DOM.el.classList.add("slide--current")
    }
    ), "start").to(n.DOM.el, {
        yPercent: "next" === t ? -100 : 100
    }, "start").to(n.DOM.imgInner, {
        scaleY: 2
    }, "start").to([r.DOM.el, r.DOM.inner], {
        yPercent: 0
    }, "start").to(r.DOM.imgInner, {
        ease: "power2.inOut",
        startAt: {
            scaleY: 2
        },
        scaleY: 1
    }, "start")
}, hideContent = (e,t=!1)=>{
    isAnimating = !0;
    const n = ()=>{
        e.isOpen = !1,
        isAnimating = !1
    }
    ;
    t ? gsap.timeline({
        defaults: {
            duration: 1.6,
            ease: "power3.inOut"
        },
        onComplete: n
    }).addLabel("start", 0).to(e.DOM.img, {
        yPercent: 0
    }, "start").to(e.DOM.imgInner, {
        yPercent: 0,
        scaleY: 1
    }, "start") : (gsap.set(e.DOM.img, {
        yPercent: 0
    }),
    gsap.set(e.DOM.imgInner, {
        yPercent: 0,
        scaleY: 1
    }),
    n())
        },
      initEvents = ()=>{
    [...DOM.navigationItems].forEach(((e,t)=>{
        e.addEventListener("click", (()=>{
            current === t || isAnimating || navigate(t)
        }
        ))
    }
    )),
    Observer.create({
        type: "wheel,touch,pointer",
        onDown: ()=>!isAnimating && void navigate(current > 0 ? current - 1 : totalSlides - 1),
        onUp: ()=>!isAnimating && void navigate(current < totalSlides - 1 ? current + 1 : 0),
        wheelSpeed: -1,
        tolerance: 10
    })
}
;
setCurrentSlide(0),
[...DOM.navigationItems].forEach(((e,t)=>{
    e.addEventListener("click", (()=>{
        current === t || isAnimating || navigate(t)
    }
    ))
}
)),
Observer.create({
    type: "wheel,touch,pointer",
    onDown: ()=>!isAnimating && void navigate(current > 0 ? current - 1 : totalSlides - 1),
    onUp: ()=>!isAnimating && void navigate(current < totalSlides - 1 ? current + 1 : 0),
    wheelSpeed: -1,
    tolerance: 10
});



    
});













