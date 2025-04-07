const trig = document.querySelector('.trigger');
const trigUndo = document.querySelector('.trigger-undo');

const cursor = document.querySelector('#cursor');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    // console.log(`the x pos= ${x}`);
    const y = e.clientY;
    cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
  });

trig.addEventListener('click', openLand);
trigUndo.addEventListener('click', reOpenLand)

function openLand() {
    document.getElementById("landing").style.top = "-100%";

    const audio = document.querySelector("#myAudio");
    if (audio) {setTimeout(() => {
        audio.play();
    }, 0); // 500ms delay
    }

}

function reOpenLand() {
    document.getElementById("landing").style.top = "0";
}

// landing page fade

window.addEventListener("load", function () {
    setTimeout(() => {
        const landing = document.getElementById("landing");
        if (landing) {
            landing.style.backgroundColor = "#383838ae"; // Or whatever semi-transparent value you want
        }
    }, 500); // 1.5 seconds
});

// spray page opener

const trig2 = document.querySelector('#spray-trigger');
const trigUndo2 = document.querySelector('#close-spray');


trig2.addEventListener('click', openSpray);
trigUndo2.addEventListener('click', closeSpray);

function openSpray() {
    document.getElementById("spray-section").style.top = "0";
    const audio = document.querySelector("#can-sound");
    if (audio) {setTimeout(() => {
        audio.play();
    }, 0); // 5
    }

}

function closeSpray() {
    let section = document.getElementById("spray-section");
    section.style.top = "-100%";
    section.offsetHeight; // Forces browser to recognize style change
}

const aboutButton = document.querySelector("#about-button");
const aboutSection = document.querySelector("#about-section");

function toggleAbout() {
    if (aboutSection.style.right === "-52%") {
        aboutSection.style.right = "0";
    } else {
        aboutSection.style.right = "-52%";
    }
}

// Click event on #about-button
aboutButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents immediate closing when clicking the button
    toggleAbout();
});

// Close when clicking outside
document.addEventListener("click", (event) => {
    if (!aboutSection.contains(event.target) && event.target !== aboutButton) {
        aboutSection.style.right = "-52%";
    }
});



// Function to open the popup
function openPopupWindow() {
    popupOverlay.classList.add("active");
}

// Function to close the popup
function closePopupWindow() {
    popupOverlay.classList.remove("active");
}

// Open Popup on Button Click
openPopup.addEventListener("click", openPopupWindow);

// Close Popup on Close Button Click
closePopup.addEventListener("click", closePopupWindow);

// Close if clicking outside popup
popupOverlay.addEventListener("click", (event) => {
    if (event.target === popupOverlay) {
        closePopupWindow();
    }
});

// Hovering over graffiti
document.querySelectorAll(".graffiti").forEach((graffiti) => {
    const hoverImg = graffiti.querySelector(".graf-hover");
    const staticImg = graffiti.querySelector(".graf-static");

    // Mouse enter - Show color image
    graffiti.addEventListener("mouseenter", () => {
        hoverImg.style.opacity = "1";
        staticImg.style.opacity = "0";
    });

    // Mouse leave - Revert to B&W image
    graffiti.addEventListener("mouseleave", () => {
        hoverImg.style.opacity = "0";
        staticImg.style.opacity = "1";
    });

    // Click event - Open the specific popup
    graffiti.addEventListener("click", () => {
        const popupId = graffiti.getAttribute("data-popup");
        document.getElementById(popupId).classList.add("active");
    });
});

document.querySelectorAll(".graffiti-home").forEach((graffiti) => {
    const hoverImg = graffiti.querySelector(".graf-hover-home");
    const staticImg = graffiti.querySelector(".graf-static-home");

    // Mouse enter - Show color image
    graffiti.addEventListener("mouseenter", () => {
        hoverImg.style.opacity = "1";
        staticImg.style.opacity = "0";
    });

    // Mouse leave - Revert to B&W image
    graffiti.addEventListener("mouseleave", () => {
        hoverImg.style.opacity = "0";
        staticImg.style.opacity = "1";
    });

    // Click event - Open the specific popup
    graffiti.addEventListener("click", () => {
        const popupId = graffiti.getAttribute("data-popup");
        document.getElementById(popupId).classList.add("active");
    });
});
// Hovering over graffiti end

// Select all close buttons
document.querySelectorAll(".closePopup").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest(".overlay").classList.remove("active");
    });
});

// Close popup when clicking outside
document.querySelectorAll(".overlay").forEach((popup) => {
    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.remove("active");
        }
    });
});



// pop-up for .p-link

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".p-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.stopPropagation();

            // Remove any existing nested popup
            let existingPopup = document.querySelector(".nested-popup");
            if (existingPopup) existingPopup.remove();

            // Get unique content
            let imageSrc = this.dataset.image;
            let popupText = this.dataset.text;
            let titleText = this.dataset.title;

            // Create the nested popup
            let nestedPopup = document.createElement("div");
            nestedPopup.classList.add("nested-popup");
            nestedPopup.innerHTML = `
                <div class="nested-content">
                    <div id="popup-nav">
                        <h3>${titleText}</h3>
                        <button class="close-nested">CLOSE</button>
                    </div>
                    <img src="${imageSrc}" alt="Related Image">
                    <p>${popupText}</p>
                </div>
            `;

            // Append to body (not to the parent popup)
            document.body.appendChild(nestedPopup);

          

            // Make it visible
            nestedPopup.style.visibility = 'visible';

            // Close button
            nestedPopup.querySelector(".close-nested").addEventListener("click", function () {
                nestedPopup.remove();
            });
        });
    });
});


// Draggable function
function makeDraggable(popup) {
    if (!popup) return;

    let isDragging = false;
    let startX, startY, startLeft, startTop;

    popup.style.cursor = "grab"; // Indicate draggable area

    popup.addEventListener("mousedown", (e) => {
        e.preventDefault(); // Prevent text selection
        isDragging = true;


        // Get current positions
        startX = e.clientX;
        startY = e.clientY;
        let rect = popup.getBoundingClientRect();
        startLeft = rect.left;
        startTop = rect.top;

        popup.style.position = "fixed"; // Use fixed positioning for consistency
        popup.style.zIndex = "9999";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        let newLeft = startLeft + (e.clientX - startX);
        let newTop = startTop + (e.clientY - startY);

        // Ensure the popup stays within the viewport
        newLeft = Math.max(0, Math.min(window.innerWidth - popup.clientWidth, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - popup.clientHeight, newTop));

        popup.style.left = `${newLeft}px`;
        popup.style.top = `${newTop}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

// Apply draggable behavior to main popups
document.querySelectorAll(".popup").forEach((popup) => {
    makeDraggable(popup);
});

// Handle dynamically created nested popups
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("p-link")) {
        event.stopPropagation();

        // Find the closest parent popup
        let parentPopup = event.target.closest(".popup");
        if (!parentPopup) {
            console.warn("No parent .popup found for p-link. Nested popup cannot be attached.");
            return;
        }

        // Remove any existing nested popups inside THIS popup only
        parentPopup.querySelectorAll(".nested-popup").forEach(popup => popup.remove());

        // Get content from the clicked p-link
        let imageSrc = event.target.dataset.image;
        let popupText = event.target.dataset.text;
        let titleText = event.target.dataset.title;

        // Create new nested popup
        let nestedPopup = document.createElement("div");
        nestedPopup.classList.add("nested-popup");
        nestedPopup.innerHTML = `
            <div class="nested-content">
                <div id="popup-nav">
                    <h3>${titleText}</h3>
                    <button class="close-nested">CLOSE</button>
                </div>
                <img src="${imageSrc}" alt="Related Image">
                <p>${popupText}</p>
            </div>
        `;

        // Append inside the correct popup
        parentPopup.appendChild(nestedPopup);

        // Debugging output
        console.log("Nested popup added inside:", parentPopup);

        // Style & position it
        nestedPopup.style.position = "absolute";
        nestedPopup.style.left = "50%";
        nestedPopup.style.top = "50%";
        nestedPopup.style.transform = "translate(-50%, -50%)"; // Center it

        // Close event for the nested popup
        nestedPopup.querySelector(".close-nested").addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent closing the parent popup
            nestedPopup.remove(); // Remove the nested popup
        });
    }
});


window.addEventListener('load', function() {
    var audio = document.getElementById('background-audio');
    audio.play().catch(function(error) {
        console.log('Autoplay blocked:', error);
    });
});

function adjustDottedLine() {
    let tl1 = document.getElementById("tl-1");
    let tl3 = document.getElementById("tl-3");
    let dottedLine = document.getElementById("dotted-line");

    let tl1Rect = tl1.getBoundingClientRect();
    let tl3Rect = tl3.getBoundingClientRect();

    let navBottomRect = document.getElementById("nav-bottom").getBoundingClientRect();

    // Adjust width and position based on tl-1 and tl-3
    dottedLine.style.left = (tl1Rect.left - navBottomRect.left) + "px";
    dottedLine.style.width = (tl3Rect.left - tl1Rect.left) + "px";
}

// Run on load and resize
window.addEventListener("load", adjustDottedLine);
window.addEventListener("resize", adjustDottedLine);

