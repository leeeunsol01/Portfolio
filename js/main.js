document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.set('.circle', { xPercent: -50 });
    gsap.to('.circle', {
        rotation: -360, 
        ease: "none",
        force3D: true,
        scrollTrigger: {
            trigger: "body",   
            start: "top top",   
            end: "bottom bottom", 
            scrub: 2,    
        }
    });

    const downArrow = document.querySelector('.down_arrow');

    if(downArrow){
        downArrow.addEventListener('click', function() {
            gsap.to(window,{
                duration: 1,
                scrollTo: '#profile',
            });
        })
    }

    const sections = document.querySelectorAll('section');
    const gnbs = document.querySelectorAll('.gnb a');
    const point = document.querySelector('.navPoint');
    const quick = document.querySelector('.quickMenu');

    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top 30%',
            end: 'bottom 50%',
            onToggle: self => {
                if(self.isActive){
                    if(index > 0){
                        const NavLink = gnbs[index - 1];
                        gsap.fromTo(point, 
                        {scale: 0},
                        {
                            scale: 1,
                            x: NavLink.offsetLeft + NavLink.offsetWidth,
                            duration: 0.5
                        });

                        quick.classList.add('quickActive');
                    }else{
                        quick.classList.remove('quickActive');
                        gsap.to(point, {scale: 0, duration: 0.3});
                    }
                }
            }
        })
    })

    gnbs.forEach(gnb => {
        gnb.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
            });
        });
    });

    quick.addEventListener('click', ()=> {
        gsap.to(window, {
            duration: 1.2,
            scrollTo: 0
        });
    });
})