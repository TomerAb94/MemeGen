'use strict'

var gElCanvas
var gCtx

function onInitGen(imgId) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    onResize()
    renderMeme(+imgId)

    hideSection('.gallery-container')
    displaySection('.gen-container')
}


function renderMeme(imgId) {
    renderImg(imgId, renderText)
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

function renderText() {
    const meme = getMeme()
    const spacing = 30;

    meme.lines.forEach((line, index) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = `${line.color}`

        const textWidth = gCtx.measureText(line.text).width;

        var x = (gElCanvas.width - textWidth) / 2;
        var y = 50
        if (line.align === 'left') x = spacing
        if (line.align === 'right') x = gElCanvas.width - spacing

        if (index === 1) {
            // second line at the bottom
            y = gElCanvas.height - 30;
        } else if (index > 1) {
            y += spacing * (index - 1)
        }

        gCtx.fillText(`${line.text}`, x, y);

        saveLineLocation(index, x, y)

        if (index === meme.selectedLineIdx) drawTextFrame(line.text, x, y, line.size)
    })

}

function drawTextFrame(text, x, y, size) {
const spacing = 20

    const textMetrics = gCtx.measureText(text)
    const rectWidth = textMetrics.width+spacing*2
    const rectHeight = size+spacing/2
    const rectX = x-spacing
    const rectY = y+spacing/3 - rectHeight

    gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
}


function onResize() {

    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetLineText(text) {
    setLineText(text)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetLineColor(color) {
    setLineColor(color)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetFontSize(diff) {
    setFontSize(diff)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onAlignText(align) {
    alignText(align)

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function onAddLine() {
    addLine()

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSwitchLine(clickedLineIdx) {
    switchLine(clickedLineIdx)

    const meme = getMeme()
    initTextInput(meme.lines[meme.selectedLineIdx].text)
    renderMeme(meme.selectedImgId)
}

function initTextInput(text) {
    document.querySelector('.text-input').value = text
}

function onLineClick(event) {
    const clickedLineIdx = getLineClicked(event)
    if (clickedLineIdx === -1) return

    onSwitchLine(clickedLineIdx)
}

function getLineClicked(ev) {
    const meme = getMeme()

    const clickedLineIdx = meme.lines.findIndex((line) => {
        const clickedX = ev.offsetX
        const clickedY = ev.offsetY

        const textWidth = gCtx.measureText(line.text).width
        const textHeight = line.size

        const textStartX = line.pos.x
        const textEndX = textStartX + textWidth
        const textEndY = line.pos.y
        const textStartY = textEndY - textHeight


        return (
            clickedX >= textStartX &&
            clickedX <= textEndX &&
            clickedY >= textStartY &&
            clickedY <= textEndY
        )
    })
    return clickedLineIdx
}


function onRemoveLine() {
    removeLine()

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function hideSection(containerName) {
    document.querySelector(containerName).classList.add('hide')
}

function displaySection(containerName) {
    document.querySelector(containerName).classList.remove('hide')
}

