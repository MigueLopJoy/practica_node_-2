const d = document

d.addEventListener("DOMContentLoaded", e => {
    setMenuActiveLink()
})

const setMenuActiveLink = () => {
    const links = d.querySelectorAll("header .nav-link")
    for (let i = 0; i < links.length; i++) {
        let link = links[i]
        if (link.classList.contains("active")) link.classList.removeactive
    }
    d.querySelector(`header .nav-link.${getPageName()}`)
}

const getPageName = () => {
    let url = location.href,
        urlFragments = url.split('/')
    urlFragments = urlFragments.filter(fragment => {
        return fragment !== ''
    })
    return urlFragments.pop()
}