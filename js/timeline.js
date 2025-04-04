document.addEventListener("DOMContentLoaded", function () {
    const tl1 = document.querySelector("#tl-1");
    const tl2 = document.querySelector("#tl-2");
    const tl3 = document.querySelector("#tl-3");
    const graffitiLayout = document.querySelector("#graffiti-layout");
    const graffitiLayout2 = document.querySelector("#graffiti-layout2");

    function activateTL1() {
        graffitiLayout.style.opacity = "0";
        graffitiLayout.style.filter = "blur(10px)";
        graffitiLayout2.style.opacity = "0";
        graffitiLayout2.style.filter = "blur(10px)";
        

        tl3.classList.remove("year-node-active");
        tl3.classList.add("year-node");
        tl2.classList.remove("year-node-active");
        tl2.classList.add("year-node");
        tl1.classList.add("year-node-active");
    }

    function activateTL2() {
        graffitiLayout.style.opacity = "0";
        graffitiLayout.style.filter = "blur(10px)";
        graffitiLayout2.style.opacity = "1";
        graffitiLayout2.style.filter = "blur(0px)";
        graffitiLayout2.style.zIndex = "0";


        tl3.classList.remove("year-node-active");
        tl3.classList.add("year-node");
        tl2.classList.add("year-node-active");
        tl1.classList.remove("year-node-active");
        tl1.classList.add("year-node");
    }

    function activateTL3() {
        graffitiLayout.style.opacity = "1";
        graffitiLayout.style.filter = "blur(0px)";
        graffitiLayout2.style.opacity = "0.4";
        graffitiLayout2.style.filter = "blur(3px)";
        graffitiLayout2.style.zIndex = "-1";

        tl2.classList.remove("year-node-active");
        tl2.classList.add("year-node");
        tl3.classList.add("year-node-active");
        tl1.classList.remove("year-node-active");
        tl1.classList.add("year-node");
        
    }
    tl1.addEventListener("click", activateTL1);
    tl2.addEventListener("click", activateTL2);
    tl3.addEventListener("click", activateTL3);
});