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

//  change scetion

// function showPage(pageId) {
//     // Hide all sections
//     const sections = document.querySelectorAll('section');
//     sections.forEach(section => {
//         section.style.display = 'none';
//     });
    
//     // Show the selected section
//     const selectedSection = document.getElementById(pageId);
//     selectedSection.style.display = 'block';
// }

// showPage('page1');
