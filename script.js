const sidebar = document.getElementById('sidebar')
const content = document.querySelector('.content')
const open_btn = document.querySelector('.open-btn')

function openSidebar() {
    sidebar.style.left = "0";
    content.style.marginLeft = "250px";
    open_btn.style.display = "none";
}

function closeSidebar() {
    sidebar.style.left = "-250px";
    content.style.marginLeft = "0";
    open_btn.style.display = "block";
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
