
document.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    
    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            document.title = "&Elections • " + section.getAttribute("data-title");
        }
    });
});

function detectMobileDevice() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|ipod/i.test(userAgent)) {
        document.body.classList.add("mobile-device");
        console.log("Mobile device detected!");
        document.querySelectorAll('a.titlebarlink').forEach(link => {
            link.addEventListener('click', function  (e) {
                e.preventDefault();
            });
        })
    }
}

window.addEventListener("load", (event) => {
  detectMobileDevice();
});

