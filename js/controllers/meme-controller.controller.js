'use strict'

var gElCanvas
var gCtx

var gLineBorderPos = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 },
}

//Download (for delete frame)
var gIsDownload = false

//Drag & Drop
var gIsDrag = false
var gStartPos

//Resize
var gIsResize = { isResize: false, corner: '' }

function onInitGen(imgId) {
    displaySection('.gen-container')
    hideSection('.gallery-container')

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    onResize()
    renderMeme(+imgId)
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

        var posX = line.pos.x * gElCanvas.width
        var posY = line.pos.y * gElCanvas.height

        if (line.align === 'left') posX = spacing
        if (line.align === 'right') posX = gElCanvas.width - spacing * 3
        if (line.align === 'center') posX = gElCanvas.width / 2

        gCtx.beginPath()
        gCtx.fillText(`${line.text}`, posX, posY);

        saveLineLocation(gElCanvas, index, posX, posY)

        if (index === meme.selectedLineIdx && !gIsDownload) {
            drawTextFrame(line.text, posX, posY, line.size)
        }
    })

}


function drawTextFrame(text, x, y, size) {
    const spacing = 20

    const textMetrics = gCtx.measureText(text)
    const rectWidth = textMetrics.width + spacing * 2
    const rectHeight = size + spacing / 2
    const rectX = x - spacing
    const rectY = y + spacing / 3 - rectHeight

    updateLineCorners(rectWidth, rectHeight, rectX, rectY)

    gCtx.setLineDash([5, 5])
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2

    gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)

    gCtx.setLineDash([])
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
    gIsDownload = true
    const meme = getMeme()
    renderMeme(meme.selectedImgId)

    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'

    gIsDownload = false
}

function onAddLine() {
    const meme = getMeme()
    addLine(gMeme.lines.length)

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

        const textStartX = line.pos.x * gElCanvas.width - 5
        const textEndX = textStartX + textWidth + 10
        const textEndY = line.pos.y * gElCanvas.height
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
    onLineClick(ev)
    const meme = getMeme()

    const clickedLineIdx = getLineClicked(ev)
    if (clickedLineIdx === -1) {
        const { cursor, corner } = isFrameBorderClicked(ev)
        if ({ cursor, corner }) {
            gIsResize = { isResize: true, corner }
            // console.log(gIsResize);
            gStartPos = getEvPos(ev)
            document.body.style.cursor = cursor
            return
        }
        return
    }

    gIsDrag = true
    gStartPos = getEvPos(ev)
    document.body.style.cursor = 'move'
    meme.lines[clickedLineIdx].align = 'null'

}

function onMove(ev) {
    if (!gIsDrag && !gIsResize.isResize) return

    const pos = getEvPos(ev)
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    if (gIsResize.isResize) {

        if (gIsResize.corner === 'topLeft' || gIsResize.corner === 'topRight') line.size += (dy * -1)
        if (gIsResize.corner === 'bottomLeft' || gIsResize.corner === 'bottomRight') line.size += dy

        gStartPos = pos
        renderMeme(meme.selectedImgId)
        return
    }

    if (gIsDrag) {
        moveLine(gElCanvas, dx, dy)
        gStartPos = pos
        renderMeme(meme.selectedImgId)
    }

}

function onUp(ev) {
    gIsDrag = false
    gIsResize = false
    document.body.style.cursor = 'auto'
}

function getEvPos(ev) {
    //later add touch evs
    let pos = { x: ev.offsetX, y: ev.offsetY }

    return pos
}

function updateLineCorners(rectWidth, rectHeight, rectX, rectY) {
    gLineBorderPos = {
        topLeft: { x: rectX, y: rectY },
        topRight: { x: rectX + rectWidth, y: rectY },
        bottomLeft: { x: rectX, y: rectY + rectHeight },
        bottomRight: { x: rectX + rectWidth, y: rectY + rectHeight },
    }

}

function isFrameBorderClicked(ev) {

    const clickedX = ev.offsetX
    const clickedY = ev.offsetY

    const topLeft = gLineBorderPos.topLeft
    const topRight = gLineBorderPos.topRight
    const bottomLeft = gLineBorderPos.bottomLeft
    const bottomRight = gLineBorderPos.bottomRight

    const area = 10

    if (
        clickedX >= topLeft.x - area &&
        clickedX <= topLeft.x + area &&
        clickedY >= topLeft.y - area &&
        clickedY <= topLeft.y + area
    ) {
        return { cursor: 'nwse-resize', corner: 'topLeft' }
    }
    if (
        clickedX >= bottomRight.x - area &&
        clickedX <= bottomRight.x + area &&
        clickedY >= bottomRight.y - area &&
        clickedY <= bottomRight.y + area
    ) {
        return { cursor: 'nwse-resize', corner: 'bottomRight' }
    }
    if (
        clickedX >= topRight.x - area &&
        clickedX <= topRight.x + area &&
        clickedY >= topRight.y - area &&
        clickedY <= topRight.y + area
    ) {
        return { cursor: 'nesw-resize', corner: 'topRight' }
    }
    if (
        clickedX >= bottomLeft.x - area &&
        clickedX <= bottomLeft.x + area &&
        clickedY >= bottomLeft.y - area &&
        clickedY <= bottomLeft.y + area
    ) {
        return { cursor: 'nesw-resize', corner: 'bottomLeft' }
    }

    return { isResize: false, corner: '' }
}