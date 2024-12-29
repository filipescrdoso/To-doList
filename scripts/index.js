document.getElementById("completed-tasks-container").addEventListener('click', showBannersAndCounter);
document.getElementById("pendent-tasks-container").addEventListener('click', showBannersAndCounter);
document.getElementById("addButton").addEventListener('click', () => {
    setTimeout(function() {
        console.log("ok");
        showBannersAndCounter();
    }, 100);

});

document.addEventListener('DOMContentLoaded', () => {
    if(isMobile()) {
        document.body.classList.add("mob");
    } else {
        document.body.classList.remove("mob")
    }

    showBannersAndCounter();
})



function showBannersAndCounter() {
    let show = true;
    const pendentBanner = document.getElementById("empty-tasks");

    let totalPendent, totalCompleted;

    if(localStorage.getItem("tasks") != null) {
        localTasks = JSON.parse(localStorage.getItem("tasks"));

        totalPendent = 0;
        totalCompleted = 0;
        
        localTasks.forEach(task => {
            if(task.status == "pendent" || task.status == null) {
                show = false;
                totalPendent++;
            } else {
                totalCompleted++;
            }
        })
        document.getElementById("paragraphPendent").innerText = totalPendent;
        document.getElementById("paragraphCompleted").innerText = totalCompleted;
    } 

    if(show == false) {
        pendentBanner.style.display = "none";
    } else {
        pendentBanner.style.display = "flex";
    }
}


function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUserAgent = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isMobileWidth = window.innerWidth <= 700;
    return isMobileUserAgent && isMobileWidth;
}

function toggleElements(elementId, className, remove = false) {
    let element = document.getElementById(elementId);
    if(remove === false) {
        element.classList.toggle(className);
    } else if(remove === true && element.classList.contains(className)) {
        element.classList.remove(className);
    }
}