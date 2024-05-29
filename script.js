function openSidebar() {
    document.getElementById("sidebar").style.left = "0";
    document.querySelector(".content").style.marginLeft = "250px";
    document.querySelector(".open-btn").style.display = "none";
}

function closeSidebar() {
    document.getElementById("sidebar").style.left = "-250px";
    document.querySelector(".content").style.marginLeft = "0";
    document.querySelector(".open-btn").style.display = "block";
}


window.onclick = function(event) {
    if (!event.target.matches('.open-btn') && !event.target.matches('.sidebar') && window.innerWidth <= 768) {
        closeSidebar();
    }
}
