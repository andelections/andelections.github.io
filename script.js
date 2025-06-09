document.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    
    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            document.title = "&Elections • " + section.getAttribute("data-title");
        }
    });
});