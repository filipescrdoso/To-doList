document.getElementById("completed-tasks-container").addEventListener('click', showBanners);
document.getElementById("pendent-tasks-container").addEventListener('click', showBanners);
document.getElementById("addButton").addEventListener('click', () => {
    setTimeout(function() {
        console.log("ok");
        showBanners();
    }, 100);

});

document.addEventListener('DOMContentLoaded', () => {
    if(isMobile()) {
        document.body.classList.add("mob");
    } else {
        document.body.classList.remove("mob")
    }

    showBanners();
})

function showBanners() {
    let show = true;
    const pendentBanner = document.getElementById("empty-tasks");

    if(localStorage.getItem("tasks") != null) {
        localTasks = JSON.parse(localStorage.getItem("tasks"));
        
        localTasks.forEach(task => {
            if(task.status == "pendent" || task.status == null) {
                show = false;
            }
        })
        console.log(show)

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