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

    const spacing = 30;
    const numLines = meme.lines.length;

    meme.lines.forEach((line, index) => {
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = `${line.color}`

        const textWidth = gCtx.measureText(line.txt).width;

        var x = (gElCanvas.width - textWidth) / 2;
        if (line.align === 'left') x = spacing
        if (line.align === 'right') x = gElCanvas.width - spacing

        let y;
        if (index === 0) {
            // First line at the top
            y = 50;
        } else if (index === numLines - 1) {
            // Last line at the bottom
            y = gElCanvas.height - 50;
        } else {
            // Middle lines spaced evenly
            const middleSectionTop = 50 + spacing;
            const middleSectionBottom = gElCanvas.height - 50 - spacing;
            const middleLinesCount = numLines - 2; // Exclude first and last
            const middleIndex = index; // Since index 0 is first, index 1 is first middle
            y = middleSectionTop + (middleIndex * (middleSectionBottom - middleSectionTop)) / (middleLinesCount + 1);
        }

        gCtx.fillText(`${line.txt}`, x, y);

        saveLineLocation(index, x, y)

        if (index === meme.selectedLineIdx) drawTxtFrame(line.txt, x, y, line.size)
    })

}

function drawTxtFrame(text, x, y, size) {

    const textMetrics = gCtx.measureText(text)
    const rectWidth = textMetrics.width
    const rectHeight = size
    const rectX = x
    const rectY = y - rectHeight


    gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
}

function onResize() {

    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth

    const meme = getMeme()
    renderMeme(meme.selectedImgId)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)

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
    initTextInput(meme.lines[meme.selectedLineIdx].txt)
    renderMeme(meme.selectedImgId)
}

function initTextInput(txt) {
    document.querySelector('.txt-input').value = txt
}

function onLineClick(event) {
    const clickedLineIdx = isLineClicked(event)
    if (clickedLineIdx === -1) return

    onSwitchLine(clickedLineIdx)
}

function isLineClicked(ev) {
    const meme = getMeme()

    const clickedX = ev.offsetX
    const clickedY = ev.offsetY

    const clickedLineIdx = meme.lines.findIndex((line, index) => {
        const textWidth = gCtx.measureText(line.txt).width
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
