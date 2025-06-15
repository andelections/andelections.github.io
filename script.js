
document.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    
    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            document.title = "&Elections • " + section.getAttribute("data-title");
        }
    });
});

function socialslink(link,sameWindow) {
    if (sameWindow == 0) {
        window.open(link, "_blank", "width=500, height=850")
    } else {
        window.open(link, "_blnak")
    }
}

var pollsdisplaying = 'Nationwide';

function pollselectionbuttons(button) {
    button.style.backgroundColor = "rgba(233,37,37,0.85)";
    button.style.boxShadow = "0px 2px 4px 0px rgba(0,0,0,0.6)";
    button.style.fontWeight = "400";
    button.style.cursor = "default";
    button.style.pointerEvents = "none";
}

function pollsselection(region) {
    let regiontohide = pollsdisplaying;
    pollsdisplaying = region;
    let button = document.getElementById('pollsbutton' + region);
    pollselectionbuttons(button);
    document.getElementById('polls' + region).style.display = 'block';
    document.getElementById('polls' + regiontohide).style.display = 'none';
    let oldbutton = document.getElementById('pollsbutton' + regiontohide);
    oldbutton.removeAttribute("style");
}

function displayMobileMenu() {
    document.body.classList.toggle("mobile-menu-active");
    let button = document.getElementById('mobiletitlesbutton');
    button.innerHTML = document.body.classList.contains("mobile-menu-active") ? "Close" : "• • •";
}

function detectMobileDevice() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod/i.test(userAgent)) {
        document.body.classList.add("mobile-device");
        console.log("Mobile device detected!");
        document.querySelectorAll('a.titlebarlink').forEach(link => {
            link.addEventListener('click', function  (e) {
                e.preventDefault();
            });
        });
    }
}

function detectiPad() {
    let userAgent = navigator.userAgent.toLowerCase();
    let isIpad = /ipad/i.test(userAgent) ||
                 (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 0);

    if (isIpad) {
        document.body.classList.remove("mobile-device")
        document.body.classList.add("ipad-device");
        console.log("iPad detected!");
        document.querySelectorAll('a.titlebarlink').forEach(link => {
            link.addEventListener('click', function (e) {5
                e.preventDefault();
            });
        });
    }
}

function refreshIframe() {
    let iframes = document.querySelectorAll("iframe");
    iframes.forEach(iframe => {
        if (iframe.classList.contains("excel-embed")) {
            iframe.src = iframe.src;
        }
    });
    alert("To avoid timing out due to inactivity, some elements on this page have been refreshed.");
}

let inactivityTime = function() {
    let time;

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(refreshIframe, 600000);
    }

    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
    document.onclick = resetTimer;
    document.onscroll = resetTimer;
}

inactivityTime();

window.addEventListener("load", (event) => {
  detectMobileDevice();
  detectiPad();
  let nationwidebutton = document.getElementById('pollsbuttonNationwide');
  pollselectionbuttons(nationwidebutton);

});

