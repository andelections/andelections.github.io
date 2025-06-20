
document.addEventListener("scroll", function () {
    let sections = document.querySelectorAll("section");
    let viewportHeight = window.innerHeight;

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        let sectionTitle = section.getAttribute("data-title");
        let titleNoSpace = sectionTitle.replace(/\s+/g, "");
        let menuBarTitle = document.getElementById(titleNoSpace);
        menuBarTitle.style.fontWeight = "";
        let visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        let sectionHeight = rect.height;

        if (visibleHeight >= viewportHeight / 2) {
            document.title = "&Elections • " + sectionTitle;
            menuBarTitle.style.fontWeight = "900";
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
var timelinedisplaying = 'Nationwide';

function pollselectionbuttons(button) {
    button.style.backgroundColor = "rgba(233,37,37,0.85)";
    button.style.boxShadow = "0px 2px 4px 0px rgba(0,0,0,0.6)";
    button.style.fontWeight = "400";
    button.style.cursor = "default";
    button.style.pointerEvents = "none";
    button.style.textShadow = "none";
}

function pollsselection(region,type) {
    if (type == 1) {
        let regiontohide = pollsdisplaying;
        pollsdisplaying = region;
        let button = document.getElementById('pollsbutton' + region);
        pollselectionbuttons(button);
        document.getElementById('polls' + region).style.display = 'block';
        document.getElementById('polls' + regiontohide).style.display = 'none';
        let oldbutton = document.getElementById('pollsbutton' + regiontohide);
        oldbutton.removeAttribute("style");
    } else {
        let regiontohide = timelinedisplaying;
        timelinedisplaying = region;
        let button = document.getElementById('tlbutton' + region);
        pollselectionbuttons(button);
        document.getElementById('tl' + region).style.display = 'block';
        document.getElementById('tl' + regiontohide).style.display = 'none';
        let oldbutton = document.getElementById('tlbutton' + regiontohide);
        oldbutton.removeAttribute("style");
        let graphtitle;
        if (region == 'Nationwide') {
            graphtitle = 'National Monthly Averages';
        } else {
            graphtitle = region + " GE Voting Intention Polls";
        };
        document.getElementById('graphtitles').innerHTML = graphtitle;
        console.log(grpahtitle);
    }
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
    /*alert("Due to inactivity, this page has timed out. When you continue, it will refresh automatically.");*/
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

function manualrefresh(sheet) {
    let iframetoReload = document.getElementById(sheet);
    if (iframetoReload) {
        iframetoReload.src = iframetoReload.src;
    }
}

/*// Optional: kickstart timers on load
window.onload = resetAllActivityTimers;

const iframesRefresh = document.querySelectorAll('iframe.excel-embed');
const activityMap = new WeakMap();
const inactivityLimit = 60 * 1000; // 10 minutes

iframesRefresh.forEach(iframe => {
    // Mark initial activity time
    activityMap.set(iframe, Date.now());

    // Update activity on interaction
    iframe.addEventListener('mouseenter', () => {
    const lastActive = activityMap.get(iframe) || 0;
    const now = Date.now();

    if (now - lastActive > inactivityLimit) {
        // Trigger refresh
        const src = iframe.getAttribute('src');
        iframe.setAttribute('src', src);
    }

    // Update last active time
    activityMap.set(iframe, now);
    });
});

// Optional: prune map or monitor visibility if you embed/unmount dynamically

/*InactivityTime();*/

window.addEventListener("load", (event) => {
    detectMobileDevice();
    detectiPad();
    let nationwidebuttonpolls = document.getElementById('pollsbuttonNationwide');
    pollselectionbuttons(nationwidebuttonpolls);
    let nationwidebuttontl = document.getElementById('tlbuttonNationwide');
    pollselectionbuttons(nationwidebuttontl);

    const iframes = document.querySelectorAll("iframe.excel-embed");
    const activityMap = new WeakMap();
    const inactivityThreshold = 10 * 60 * 1000; // 10 minutes

    // Step 1: Initialize activityMap with current time
    iframes.forEach(iframe => {
        activityMap.set(iframe, Date.now());

        // Step 2: On hover, check inactivity and refresh if needed
        iframe.addEventListener("mouseenter", () => {
            // console.log('hover fired');
            const lastActive = activityMap.get(iframe) || 0;
            const now = Date.now();
            // console.log("inactive for", now - lastActive, "ms");

            if (now - lastActive >= inactivityThreshold) {
                iframe.src = iframe.src;
                // Optional: trigger a subtle visual cue here
            }

            // Update activity timestamp
            activityMap.set(iframe, now);
        });
    });

    // Step 3: Reset inactivity timer on global user activity
    let resetAllActivityTimers = () => {
        const now = Date.now();
        iframes.forEach(iframe => {
            activityMap.set(iframe, now);
        });
    };

    // Monitor global activity
    /*["mousemove", "keydown", "click", "scroll"].forEach(evt =>
    document.addEventListener(evt, resetAllActivityTimers)*/

    
});

