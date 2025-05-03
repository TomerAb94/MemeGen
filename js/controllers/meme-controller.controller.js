'use strict'

var gElCanvas
var gCtx

//Drag & Drop
var gIsDrag = false
var gStartPos

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
        gCtx.beginPath()
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
        var posX = line.pos ? line.pos.x : (gElCanvas.width - textWidth) / 2;
        var posY = line.pos ? line.pos.y : 50

        if (line.align === 'left') posX = spacing
        if (line.align === 'right') posX = gElCanvas.width - spacing

        if (index === 1 && !line.pos) {
            // second line at the bottom
            posY = gElCanvas.height - 30;
        } else if (index > 1&& !line.pos) {
            posY += spacing * (index - 1)
        }
        gCtx.beginPath()
        gCtx.fillText(`${line.text}`, posX, posY);

        saveLineLocation(index, posX, posY)

        if (index === meme.selectedLineIdx) drawTextFrame(line.text, posX, posY, line.size)
    })

}

function drawTextFrame(text, x, y, size) {
    const spacing = 20

    const textMetrics = gCtx.measureText(text)
    const rectWidth = textMetrics.width + spacing * 2
    const rectHeight = size + spacing / 2
    const rectX = x - spacing
    const rectY = y + spacing / 3 - rectHeight

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

        const textStartX = line.pos.x - 5
        const textEndX = textStartX + textWidth + 10
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

function onDown(ev) {
    const clickedLineIdx = getLineClicked(ev)
    if (clickedLineIdx === -1) return

    const pos = getEvPos(ev)
    gIsDrag = true
    gStartPos = pos

    document.body.style.cursor = 'move'
}

function onMove(ev) {
    if (!gIsDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)

    gStartPos = pos

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onUp(ev) {
gIsDrag=false
document.body.style.cursor='auto'
}

function getEvPos(ev) {
    //later add touch evs
    let pos = { x: ev.offsetX, y: ev.offsetY }

    return pos
}