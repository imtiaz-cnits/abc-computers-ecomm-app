
const allSubmenu = document.querySelectorAll('.vertical-menu .submenu-active')


const handleSubmenuToggle = (item) => {

    const currentActive = item?.classList?.contains("active")

    if (currentActive) {
        item?.classList?.remove("active")
        return
    }

    const activeSubmenu = document.querySelector('.vertical-menu .submenu-active.active')

    if (activeSubmenu) {
        activeSubmenu?.classList?.remove("active")
    }

    item?.classList?.add("active")
}

allSubmenu.forEach(item => {
    const button = item?.querySelector(".submenu-toggle")

    button.addEventListener("click", () => handleSubmenuToggle(item))
})

// Responsive Sidebar Toggle
function toggleSidebar() {
    const currentSize = document.body.getAttribute("data-sidebar-size");

    document.body.classList.toggle("sidebar-enable");
    if (window.innerWidth >= 992) {
        document.body.setAttribute(
            "data-sidebar-size",
            currentSize === "sm" ? "lg" : "sm"
        );
    }
}
document.querySelectorAll(".vertical-menu-btn").forEach((button) => {
    button.addEventListener("click", toggleSidebar);
});