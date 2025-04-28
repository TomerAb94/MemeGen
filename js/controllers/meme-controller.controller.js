'use strict'

var gElCanvas
var gCtx
var gImg

function onInitGen(imgId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // onResize()
    renderMeme(+imgId)

    hideSection('.gallery-container')
    displaySection('.gen-container')
}

function renderMeme(imgId) {
    renderImg(imgId, renderTxt)
}

function renderImg(imgId, onImgReady) {
    const clickedImg = getImgById(imgId)
    const img = new Image()
    img.src = clickedImg.url

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        onImgReady()
    }
}

function renderTxt() {
    const meme = getMeme()

    meme.lines.forEach((line, index) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = `${line.color}`

        const textWidth = gCtx.measureText(line.txt).width;
        const x = (gElCanvas.width - textWidth) / 2;

        const spacing = 30

        const y = (index === 1) ? gElCanvas.height - 50 : ((index * spacing) + 50);

        gCtx.fillText(`${line.txt}`, x, y)
    })

}

function onSetLineTxt(txt) {
    SetLineTxt(txt)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetLineColor(color) {
    SetLineColor(color)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetFontSize(value) {
    SetFontSize(value)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function onAddLine(){
    addLine()

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function hideSection(containerName) {
    document.querySelector(containerName).classList.add('hide')
}

function displaySection(containerName) {
    document.querySelector(containerName).classList.remove('hide')
}