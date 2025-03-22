


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

// Add event listener to all graffiti items
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
                <div id="popup-nav"
                    <h3>${titleText}</h3><button class="close-nested">CLOSE</button></div>
                    <img src="${imageSrc}" alt="Related Image">
                    <p>${popupText}</p>
                    
                </div>
            `;

            // Append it directly to the body (so it's outside the parent popup)
            document.body.appendChild(nestedPopup);

            // Close the nested popup when clicking the button
            nestedPopup.querySelector(".close-nested").addEventListener("click", function () {
                nestedPopup.remove();
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    function makeDraggable(popup, handle) {
        if (!popup || !handle) return;

        let isDragging = false;
        let offsetX, offsetY;

        handle.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - popup.getBoundingClientRect().left;
            offsetY = e.clientY - popup.getBoundingClientRect().top;
            popup.style.position = "absolute"; // Ensure absolute positioning
            popup.style.zIndex = "1000"; // Bring to front
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            popup.style.left = `${e.clientX - offsetX}px`;
            popup.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }

    // Apply draggable behavior to main .popup
    document.querySelectorAll(".popup").forEach((popup) => {
        const header = popup.querySelector(".p-name");
        makeDraggable(popup, header);
    });

    // Apply draggable behavior to nested .nested-popup
    document.querySelectorAll(".nested-popup").forEach((nestedPopup) => {
        const nav = nestedPopup.querySelector(".popup-nav");
        makeDraggable(nestedPopup, nav);
    });
});
