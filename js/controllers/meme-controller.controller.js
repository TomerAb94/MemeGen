'use strict'

var gElCanvas
var gCtx
var gImg

function onInitGen(imgId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const clickedImg = getImgById(+imgId)

    // onResize()
    renderMeme(clickedImg)

    hideSection('.gallery-container')
    displaySection('.gen-container')
}

function renderMeme(clickedImg) {
gImg=new Image()
gImg.src=clickedImg.url

    renderImg(gImg)
    rendertxt()
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}






function hideSection(containerName) {
    document.querySelector(containerName).classList.add('hide')
}

function displaySection(containerName) {
    document.querySelector(containerName).classList.remove('hide')
}