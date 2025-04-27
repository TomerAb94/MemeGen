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
    const memeData = getMeme()

    gCtx.font = `${memeData.lines[memeData.selectedLineIdx].size}px ${memeData.lines[memeData.selectedLineIdx].font}`
    gCtx.fillStyle = `${memeData.lines[memeData.selectedLineIdx].color}`
    gCtx.fillText(`${memeData.lines[memeData.selectedLineIdx].txt}`, 120, 60)
}

function onSetLineTxt(txt) {
    SetLineTxt(txt)

    const memeData = getMeme()
    renderMeme(memeData.selectedImgId)
}

function onSetLineColor(color) {
    SetLineColor(color)

    const memeData = getMeme()
    renderMeme(memeData.selectedImgId)
}

function onSetFontSize(value) {
    SetFontSize(value)

    const memeData = getMeme()
    renderMeme(memeData.selectedImgId)
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function hideSection(containerName) {
    document.querySelector(containerName).classList.add('hide')
}

function displaySection(containerName) {
    document.querySelector(containerName).classList.remove('hide')
}