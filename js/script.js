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
    document.getElementById("landing").style.height = "0%";

    const audio = document.querySelector("#myAudio");
    if (audio) {setTimeout(() => {
        audio.play();
    }, 0); // 500ms delay
    }

}

function reOpenLand() {
    document.getElementById("landing").style.height = "100%";
}




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
            event.stopPropagation(); // Prevent closing the main popup

            // Remove any existing nested popup before creating a new one
            let existingPopup = document.querySelector(".nested-popup");
            if (existingPopup) existingPopup.remove();

            // Get unique content from data attributes
            let imageSrc = this.dataset.image;
            let popupText = this.dataset.text;
            let titleText = this.dataset.title;

            // Create the nested popup dynamically
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
            const pop1 = document.querySelector('#popup1');
            // Append it directly to the body
            pop1.appendChild(nestedPopup);

            // // Make the nested popup draggable
            // setTimeout(() => {
            //     let nav = nestedPopup.querySelector("#popup-nav");
            //     makeDraggable(nestedPopup, nav);
            // }, 10);

            // Close the nested popup when clicking the button
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
        popup.style.zIndex = "1000";
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

        // Remove existing nested popups before creating a new one
        let existingPopup = document.querySelector(".nested-popup");
        if (existingPopup) existingPopup.remove();

        // Get unique content from data attributes
        let imageSrc = event.target.dataset.image;
        let popupText = event.target.dataset.text;
        let titleText = event.target.dataset.title;

        // Create the nested popup dynamically
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

        // Append it to the body
        document.body.appendChild(nestedPopup);

        // Ensure the popup starts at a reasonable position
        nestedPopup.style.left = "50%";
        nestedPopup.style.top = "50%";
        nestedPopup.style.transform = "translate(-50%, -50%)"; // Center it

        // Make the nested popup draggable
        // setTimeout(() => {
        //     makeDraggable(nestedPopup);
        // }, 10);

        // Close the nested popup when clicking the button
        nestedPopup.querySelector(".close-nested").addEventListener("click", function () {
            nestedPopup.remove();
        });
    }
});


window.addEventListener('load', function() {
    var audio = document.getElementById('background-audio');
    audio.play().catch(function(error) {
        console.log('Autoplay blocked:', error);
    });
});



