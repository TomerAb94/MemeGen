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
    renderImg(imgId)
    renderTxt()
}

function renderImg(imgId) {
    const clickedImg = getImgById(imgId)
    const img = new Image()
    img.src = clickedImg.url

    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function renderTxt() {
    const memeData = getMemeData()

    gCtx.font = `${memeData.lines[memeData.selectedLineIdx].size}px ${memeData.lines[memeData.selectedLineIdx].font}`
    gCtx.fillText(`${memeData.lines[memeData.selectedLineIdx].txt}`, 120, 60)
}

function onSetLineTxt(txt) {
    SetLineTxt(txt)
    
    const memeData = getMemeData()
    renderMeme(memeData.selectedImgId)
}



function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function hideSection(containerName) {
    document.querySelector(containerName).classList.add('hide')
}

function displaySection(containerName) {
    document.querySelector(containerName).classList.remove('hide')
}