let currentPage = 'Home';

const path = window.location.pathname.replaceAll("/","");
if (path == "") {
    currentPage = "Home";
} else if (path == "gb") {
    currentPage = "Westminster";
} else if (path == "holyrood") {
    currentPage = "Holyrood";
} else if (path == "senedd") {
    currentPage = "Senedd";
} else {
    currentPage = "Home";
}

/*
function setCurrentPage(page) {
    currentPage = page;
};*/

if (!document.fonts.check("1em Bahnschrift")) {
    document.body.classList.add("fallback-din");
}

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
            if (currentPage == 'Home') {
                document.title = "&Elections • " + sectionTitle;
            } else {
                document.title = "&Elections • " + currentPage + " • " + sectionTitle;
            };
            //menuBarTitle.style.fontWeight = "550";
        }
    });
});

function closesupport(type) {
    let support = document.getElementById('support');
    support.classList.add('hidden');
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + (30 * 24 * 60 * 60 * 1000));
    if (type == 0) {
        document.cookie = 'supportDismissed=true; path=/; SameSite=Lax';
    } else {
        document.cookie = "supportDismissed=true; expires=" + expiry.toUTCString() + "; path=/; SameSite=Lax";
    }
    
}

function analyticsconsent(currentState) {
    const cookiebanner = document.getElementById('cookies');
    cookiebanner.classList.add('hidden');

    // Optional: store dismissal in cookie (commented out for now)
    // const expiry = new Date();
    // expiry.setTime(expiry.getTime() + (30 * 24 * 60 * 60 * 1000));
    // document.cookie = "cookiesDismissed=true; expires=" + expiry.toUTCString() + "; path=/; SameSite=Lax";

    if (currentState === true) {
        // Store consent
        localStorage.setItem('analyticsConsent', 'true');

        // Dynamically load GA script
        const gaScript = document.createElement('script');
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-ZWFF762E3D";
        gaScript.async = true;
        document.head.appendChild(gaScript);

        // Initialize GA after script loads
        gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }

        gtag('js', new Date());
        gtag('config', 'G-ZWFF762E3D', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
        });
        };
    } else {
        // Store rejection
        localStorage.setItem('analyticsConsent', 'false');
    }

    // Optional support box logic
    if (!cookieExists("supportDismissed", "true")) {
        setTimeout(showSupportBox, 180000);
    }
}

function showSupportBox() {
    console.log('okayyyyyy')
    let support = document.getElementById('support');
    support.classList.remove('hidden');
}

function showCookieSettings() {
    let cookiebanner = document.getElementById('cookies');
    cookiebanner.classList.remove('hidden');
    console.log('hey okay so');
}

function scottishmap(maptoshow) {
    if (maptoshow == 'reg') {
        var maptohide = 'hex';
        var btntoshow = 'left';
        var btntohide = 'right';
        /*const iframe = 'scotmap-reg'.querySelector("iframe.lazy-frame");
        if (iframe && !iframe.src) {
            iframe.src = iframe.dataset.src;
        }*/
    } else {
        var maptohide = 'reg';
        var btntoshow = 'right';
        var btntohide = 'left';
    };
    let newMapId = document.getElementById("scotmap-" + maptoshow);
    newMapId.classList.remove('hide');
    let oldMapId = document.getElementById("scotmap-" + maptohide);
    oldMapId.classList.add('hide');
    let newBtnId = document.getElementById("scotmapbtns" + btntoshow);
    newBtnId.classList.remove('hide');
    let oldBtnId = document.getElementById("scotmapbtns" + btntohide);
    oldBtnId.classList.add('hide');
}


function socialslink(link,sameWindow) {
    if (sameWindow == 0) {
        window.open(link, "_blank", "width=500, height=850")
    } else {
        window.open(link, "_blank")
    }
}

var pollsdisplaying = 'Nationwide';
var timelinedisplaying = 'Nationwide';
var sheetdisplaying = 'allgroups';
var modeldisplaying = 'combined';
var scotregionsmapinitiated = false;
var scotpollsdisplaying = 'Regional';
var scottimelinedisplaying = 'Regional';
var resultdisplaying = 'Seats';

function pollselectionbuttons(button) {
    if (button) {
        button.style.backgroundColor = "rgba(233,37,37,0.85)";
        button.style.boxShadow = "0px 2px 4px 0px rgba(0,0,0,0.6)";
        button.style.fontWeight = "400";
        button.style.cursor = "default";
        button.style.pointerEvents = "none";
        button.style.textShadow = "none";
    }
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
    } else if (type == 2) {
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
    } else if (type == 3) {
        let sheettohide = sheetdisplaying;
        sheetdisplaying = region;
        let button = document.getElementById('demobtn' + region);
        pollselectionbuttons(button);
        document.getElementById('demographics-' + region).style.display = 'block';
        document.getElementById('demographics-' + sheettohide).style.display = 'none';
        let oldbutton = document.getElementById('demobtn' + sheettohide);
        oldbutton.removeAttribute("style");
    } else if (type == 4) { 
        let modeltohide = modeldisplaying;
        modeldisplaying = region;
        let button = document.getElementById('livebtn' + modeldisplaying);
        pollselectionbuttons(button);
        document.getElementById('model-' + modeldisplaying).style.display = 'flex';
        document.getElementById('model-' + modeltohide).style.display = 'none';
        let oldbutton = document.getElementById('livebtn' + modeltohide);
        oldbutton.removeAttribute("style");
    } else if (type == 5) {
        let pollstohide = scotpollsdisplaying;
        scotpollsdisplaying = region;
        let button = document.getElementById('pollsbutton' + region);
        pollselectionbuttons(button);
        document.getElementById('polls' + region).style.display = 'block';
        document.getElementById('polls' + pollstohide).style.display = 'none';
        let oldbutton = document.getElementById('pollsbutton' + pollstohide);
        oldbutton.removeAttribute("style");
    } else if (type == 6) {
        let tltohide = scottimelinedisplaying;
        scottimelinedisplaying = region;
        let button = document.getElementById('tlbutton' + region);
        pollselectionbuttons(button);
        document.getElementById('tl' + region).style.display = 'block';
        document.getElementById('tl' + tltohide).style.display = 'none';
        let oldbutton = document.getElementById('tlbutton' + tltohide);
        oldbutton.removeAttribute("style");
        let graphtitle;
        if (region == 'Regional') {
            graphtitle = 'Regional List Polls';
        } else {
            graphtitle = 'Constituency Vote Polls';
        };
        document.getElementById('graphtitles').innerHTML = graphtitle;
        console.log(graphtitle);
    } else {
        let resulttohide = resultdisplaying;
        resultdisplaying = region;
        let button = document.getElementById('prbutton' + region);
        pollselectionbuttons(button);
        document.getElementById('pr' + region).style.display = 'block';
        document.getElementById('pr' + resulttohide).style.display = 'none';
        let oldbutton = document.getElementById('prbutton' + resulttohide);
        oldbutton.removeAttribute("style");
    }
}

var sectionsDisplaying = [
    ['projection-maps',false],          //0
    ['constituency-projections',false], //1
    ['demographic-projections',false],  //2
    ['regional-projections',false],     //3
    ['regional-data',false],            //4
    ['projection-timeline',false],      //5
    ['polling-timeline',false],         //6
    ['poll-library',false],             //7
    ['custom-projection',false],        //8
    ['2024-projection',false],          //9
    ['blog',true],                      //10
    ['about',true],                     //11
    ['more-legislatures',true],         //12
    ['past-results',false]              //13
];


function setupListener() {
    return new Promise((resolve) => {
        if (document.readyState == "loading") {
            document.addEventListener("DOMContentLoaded", resolve);
        } else {
            resolve();
        }
    });
}

function showhide(section, canHide) {
    /*await setupListener();*/
    console.log(section)
    console.log(sectionsDisplaying[section]);
    let sectionTitle = sectionsDisplaying[section][0];
    let sectionWasDisplaying = sectionsDisplaying[section][1];
    let button = document.getElementById('shb-' + sectionTitle);
    let titleLink = document.getElementById('lnk-' + sectionTitle);
    let sectionData = document.getElementById('data-' + sectionTitle);
    if (sectionWasDisplaying == true && canHide == true) {
        //sectionData.style.display = 'none';
        /*sectionData.style.overflow = "hidden";
        sectionData.style.transition = "max-height 0.5s ease";
        sectionData.style.maxHeight = "0";
        sectionData.style.display = 'none';*/
        sectionData.classList.add('hidden');
        if (mobileDevice) {
            button.classList.remove('opened');
        } else if (ipadDevice) {
            button.innerHTML = '▸';
        } else {
            button.innerHTML = 'show';
        }
        button.title = 'show section';
        titleLink.title = 'show and go to section';
        sectionsDisplaying[section][1] = false;
        console.log('hiddennow');
    } else {
        // document.getElementById(sectionTitle + '-data').style.display = '';
        /*if (section == 0 || section == 9 || section == 10) {
            sectionData.style.display = 'flex';
        } else {
            sectionData.style.display = "block";
        }
        sectionData.style.overflow = "hidden";
        sectionData.style.transition = "max-height 0.5s ease";
        sectionData.style.maxHeight = "100%";*/
        sectionData.classList.remove('hidden');
        /*if (section == 0 && currentPage == 'Holyrood') {
            var promapscot = true;
        } else {
            var promapscot = false;
        }*/
        /*const smallWidth = !window.matchMedia("(min-width: 1275px)").matches;/*
        if (!(smallWidth && promapscot)) {
            const iframe = sectionData.querySelector("iframe.lazy-frame");
            if (iframe && !iframe.src) {
                iframe.src = iframe.dataset.src;
                /*sectionData.appendChild("loading...");
                setTimeout(() => {
                    section.removeChild("loading...");
                }, 3000);
            }
        }*/
        if (currentPage == 'Holyrood' && section == 0 && scotregionsmapinitiated == false) {
            regionsmap = document.getElementById('scotmap-reg');
            /*regionsmap.classList.add('hide');*/
            scotregionsmapinitiated = true;
        }
        const iframe = sectionData.querySelector("iframe.lazy-frame");
        if (iframe && !iframe.src) {
            iframe.src = iframe.dataset.src;
            /*sectionData.appendChild("loading...");
            setTimeout(() => {
                section.removeChild("loading...");
            }, 3000);*/
        }
        if (mobileDevice) {
            button.classList.add('opened');
        } else if (ipadDevice) {
            button.innerHTML = '^';
        } else {
            button.innerHTML = 'hide';
        }
        button.title = 'hide section';
        titleLink.title = 'go to section';
        sectionsDisplaying[section][1] = true;
        console.log('shownnow');
    }
}

function displayMobileMenu() {
    document.body.classList.toggle("mobile-menu-active");
    let button = document.getElementById('mobiletitlesbutton');
    button.innerHTML = document.body.classList.contains("mobile-menu-active") ? "Close" : "Menu";
}

/*
window.matchMedia("(orientation: landscape)").addEventListener("change", (e) => {
  if (e.matches) {
    document.body.classList.add("landscape");
    console.log('landscape');
  } else {
    document.body.classList.remove("landscape");
    console.log('not landscape');
  }
});*/

document.addEventListener("DOMContentLoaded", () => {
  if (screen.orientation) {
    document.body.classList.toggle("landscape", screen.orientation.type.startsWith("landscape"));
  }
});

screen.orientation?.addEventListener("change", () => {
  document.body.classList.toggle("landscape", screen.orientation.type.startsWith("landscape"));
});

function detectMobileDevice() {
    let userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod/i.test(userAgent)) {
        document.body.classList.add("mobile-device");
        console.log("Mobile device detected!");
        document.body.style.paddingBottom = '150px';
        document.body.style.paddingTop = '20px';
        //document.documentElement.style.scrollPaddingTop = '125px';
        document.querySelectorAll('.showhidesection').forEach(btn => {
            btn.innerHTML = '▸';
        })
        document.querySelectorAll('a.titlebarlink').forEach(link => {
            link.addEventListener('click', function  (e) {
                e.preventDefault();
            });
        });
        return true;
    } else {
        return false;
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
        document.querySelectorAll('.showhidesection').forEach(btn => {
            btn.innerHTML = ">";
        });
        document.querySelectorAll('.showhidesection.opened').forEach(btn => {
            btn.innerHTML = "^";
        });
        document.querySelectorAll('a.titlebarlink').forEach(link => {
            link.addEventListener('click', function (e) {5
                e.preventDefault();
            });
        });
        return true;
    } else {
        return false;
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
let mobileDevice = false;
let ipadDevice = false;

function cookieExists(name, value = null) {
  return document.cookie.split(';').some(cookie => {
    const [key, val] = cookie.trim().split('=');
    return key === name && (value === null || val === value);
  });
}



function updateBlogScrolling() {
    const blogContainer = document.querySelector('.blogtitles-container');
    if (!blogContainer) return;

    if (blogContainer.scrollHeight > blogContainer.clientHeight) {
        blogContainer.classList.add('scrollbar-visible');
        console.log(blogContainer.classList)
    } else {
        blogContainer.classList.remove('scrollbar-visible');
        console.log('scrollbarnotvisible')
    }
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateBlogScrolling, 100);
});


//window.addEventListener("load", (event) => {
window.addEventListener('DOMContentLoaded', () => {
    updateBlogScrolling();
    mobileDevice = detectMobileDevice();
    ipadDevice = detectiPad();
    console.log("okay then")
    let nationwidebuttonpolls = document.getElementById('pollsbuttonNationwide');
    pollselectionbuttons(nationwidebuttonpolls);
    let nationwidebuttontl = document.getElementById('tlbuttonNationwide');
    pollselectionbuttons(nationwidebuttontl);
    console.log("thing now here")
    let allgroupsbuttondemos = document.getElementById('demobtnallgroups');
    pollselectionbuttons(allgroupsbuttondemos);
    let combinedbuttonlivemodel = document.getElementById('livebtncombined');
    pollselectionbuttons(combinedbuttonlivemodel);
    let regionalbuttonpolls = document.getElementById('pollsbuttonRegional');
    pollselectionbuttons(regionalbuttonpolls);
    let regionalbuttontl = document.getElementById('tlbuttonRegional');
    pollselectionbuttons(regionalbuttontl);
    let pastResultsbutton = document.getElementById('prbuttonSeats');
    pollselectionbuttons(pastResultsbutton);
    console.log("thing here so far");

    /*
    if (!cookieExists("supportDismissed","true")) {
        setTimeout(showSupportBox, 180000); //CHANGE-
    }*/

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




document.addEventListener('DOMContentLoaded', () => {
    // Map trigger IDs to content IDs
    const dropdownMap = {
        'pagesdd-trigger': 'pagesdd',
        'current-projectiondd-trigger': 'current-projectiondd',
        'historical-infodd-trigger': 'historical-infodd',
        'other-projectionsdd-trigger': 'other-projectionsdd',
        'socialsdd-trigger': 'socialsdd'
        // Add all your other dropdown trigger-to-content mappings here
        // Example: 'about-us-trigger': 'about-us-content'
    };

    const dropdownTriggers = document.querySelectorAll('.dropdown'); // Select all trigger wrappers
    const dropdownContents = document.querySelectorAll('.dropdown-content'); // Select all content divs

    function positionDropdowns() {
        dropdownTriggers.forEach(trigger => {
            //const contentId = dropdownMap[trigger.id];
            const contentId = trigger.id.replaceAll("dd-trigger","dd")
            if (!contentId) return; // Skip if no mapping

            const content = document.getElementById(contentId);
            if (!content) return; // Skip if content not found

            const triggerRect = trigger.getBoundingClientRect();

            // Calculate position relative to the document
            //content.style.top = `${triggerRect.bottom + window.scrollY}px`; // Bottom of trigger
            content.style.left = `${triggerRect.left + window.scrollX}px`;   // Left edge of trigger
            // You might want to adjust 'left' if you want it centered or aligned differently
            // E.g., `content.style.left = `${triggerRect.left + (triggerRect.width / 2) - (content.offsetWidth / 2) + window.scrollX}px`;` for centering
        });
    }

    // Initial positioning and reposition on resize
    positionDropdowns();
    window.addEventListener('resize', positionDropdowns);
    // Also re-position if scroll happens, as position:absolute is relative to document, not viewport
    window.addEventListener('scroll', positionDropdowns);


    // Add event listeners for showing/hiding dropdowns
    dropdownTriggers.forEach(trigger => {
        //const contentId = dropdownMap[trigger.id];
        const contentId = trigger.id.replaceAll("dd-trigger","dd")
        const content = document.getElementById(contentId);

        if (!content) return; // Ensure content exists

        let hideTimeout;

        // Mouse enters the trigger area
        trigger.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout); // Clear any pending hide operation
            // Hide any other open dropdowns (good UX)
            dropdownContents.forEach(dc => {
                if (dc !== content) {
                    dc.classList.remove('is-open');
                }
            });
            content.classList.add('is-open');
            positionDropdowns(); // Re-position just in case of scroll/resize
        });

        // Mouse leaves the trigger area
        trigger.addEventListener('mouseleave', () => {
            // Start a timeout to hide the dropdown, allowing time to move mouse to content
            hideTimeout = setTimeout(() => {
                // Only hide if the mouse is not over the content itself
                if (!content.matches(':hover')) {
                    content.classList.remove('is-open');
                }
            }, 200); // 200ms delay
        });

        // Mouse enters the dropdown content area (to prevent it from closing)
        content.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout); // Clear pending hide operation
        });

        // Mouse leaves the dropdown content area
        content.addEventListener('mouseleave', () => { 
            // Hide the dropdown after a short delay
            hideTimeout = setTimeout(() => {
                content.classList.remove('is-open');
            }, 200); // 200ms delay
        });
    });

    // Optional: Close dropdowns if user clicks anywhere else on the document
    document.addEventListener('click', (event) => {
        dropdownContents.forEach(content => {
            const triggerId = Object.keys(dropdownMap).find(key => dropdownMap[key] === content.id);
            if (!triggerId) return;
            const trigger = document.getElementById(triggerId);

            // If the click is not inside the trigger and not inside the content
            if (!trigger.contains(event.target) && !content.contains(event.target)) {
                content.classList.remove('is-open');
            }
        });
    });

    // IMPORTANT: Review your existing onclick="showhide(...)" calls in index.html
    // For the titlebarlinks that now trigger these JS dropdowns, you should remove those onclicks.
    // E.g., `onclick="showhide(0,false); showhide(1,false); showhide(2,false); showhide(3,false); showhide(4,false)"`
    // If those `showhide` calls are still needed for section display, you might need to
    // call them from within the JavaScript dropdown's `mouseenter` or `click` event,
    // or rethink how your content sections are managed.

    

    const elements = document.querySelectorAll('.dropdown-content');
    const titlebar = document.querySelectorAll('.title-bar');

    elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            console.log('dropdown open');
            document.getElementById('title-bar').classList.add('dropdown-open');
        });
        el.addEventListener('mouseleave', () => {
            console.log('dropdown closed');
            document.getElementById('title-bar').classList.remove('dropdown-open');
        });
    });
});

const elements = document.querySelectorAll('.dropdown-content');
const titlebar = document.querySelector('.title-bar');

elements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        console.log('dropdown open');
        titlebar.classList.add('dropdown-open');
    });
    el.addEventListener('mouseleave', () => {
        console.log('dropdown closed');
        titlebar.classList.remove('dropdown-open');
    });
});

if (
  /Safari/.test(navigator.userAgent) &&
  !/Chrome|Chromium|Edg/.test(navigator.userAgent)
) {
  const style = document.createElement('style');
  style.textContent = `
    .sectiontitle,
    .sectiontitle a,
    .sectiontitle a:hover
    .blogtitles-container h2
    h2 {
      font-weight: 400 !important;
    }
  `;
  document.head.appendChild(style);
}


window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  const path = window.location.pathname;
  console.log(path) //okay
  if (!hash) return;

  // Find the index of the section with that name
  const index = sectionsDisplaying.findIndex(([name]) => name === hash);

  // If found and it's normally collapsed, open it
  if (index !== -1 && sectionsDisplaying[index][1] === false) {
    console.log(index);
    if (path == "/") {
        window.location.href="gb/#" + hash
    }
    showhide(index, false);
  }
});

window.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('analyticsConsent');
    if (consent == 'true') {
        analyticsconsent(true)
    } else if (consent == 'false') {
        analyticsconsent(false)
    } else {
        cookiebanner = document.getElementById('cookies');
        cookiebanner.classList.remove('hidden');
    }
})