const puppeteer = require('puppeteer')
let cTab
let link = 'https://www.youtube.com/playlist?list=PLRBp0Fe2GpglJwMzaCkRtI_BqQgU_O6Oy';

(async function () {
    try {
        let browserOpen = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        })

        let browserInstance = await browserOpen
        let allTabsArr = await browserInstance.pages()
        cTab = allTabsArr[0]
        await cTab.goto(link)
        let namee = await cTab.waitForSelector('.style-scope.yt-dynamic-sizing-formatted-string.yt-sans-20')
        let name = await cTab.evaluate(function (select) { return document.querySelector(select).innerText }, '.style-scope.yt-dynamic-sizing-formatted-string.yt-sans-20')

        let allData = await cTab.evaluate(getData, '.metadata-stats.style-scope.ytd-playlist-byline-renderer')

        console.log(name, allData)
        let TotalVideos = allData.split(" ")[0]
        console.log(TotalVideos)


    } catch (error) {
    }
})()

function getData(selector) {
    let allElems = document.querySelectorAll(selector)
    let noOfVideos = allElems[0].innerText
    return noOfVideos
}

async function getCVideosLength() {
    let length = await cTab.evaluate(getLength, )
}

function getLength(durationSelect) {
    let durationElem = document.querySelectorAll(durationSelect)
    return durationElem.length
}