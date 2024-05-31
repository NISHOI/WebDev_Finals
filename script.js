const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');
const openBtn = document.querySelector('.open-btn');

function openSidebar() {
    sidebar.style.left = "0";
    content.style.marginLeft = "250px";
    openBtn.style.display = "none";
}

function closeSidebar() {
    sidebar.style.left = "-250px";
    content.style.marginLeft = "0";
    openBtn.style.display = "block";
}

window.onclick = function(event) {
    if (!event.target.matches('.open-btn') && !sidebar.contains(event.target) && window.innerWidth <= 768) {
        closeSidebar();
    }
}

function showPage(pageId) {
    const pages = content.querySelectorAll('div > div');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = 'block';
    }
}

showPage('page1');