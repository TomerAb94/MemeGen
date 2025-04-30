'use strict'

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['president', 'Trump'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['sleep', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['evil', 'funny'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['evil', 'funny'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['evil', 'funny'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['evil', 'funny'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['evil', 'funny'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['evil', 'funny'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['evil', 'funny'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['evil', 'funny'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['evil', 'funny'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['evil', 'funny'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['evil', 'funny'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['evil', 'funny'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['evil', 'funny'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['evil', 'funny'] },
    { id: 19, url: 'imgs/19.jpg', keywords: ['evil', 'funny'] },
    { id: 20, url: 'imgs/20.jpg', keywords: ['evil', 'funny'] },
    { id: 21, url: 'imgs/21.jpg', keywords: ['evil', 'funny'] },
    { id: 22, url: 'imgs/22.jpg', keywords: ['evil', 'funny'] },
    { id: 23, url: 'imgs/23.jpg', keywords: ['evil', 'funny'] },
    { id: 24, url: 'imgs/24.jpg', keywords: ['evil', 'funny'] },
    { id: 25, url: 'imgs/25.jpg', keywords: ['evil', 'funny'] },
]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'TEXT',
            font: 'Arial, Helvetica, sans-serif',
            size: 20,
            color: 'black'
        },
        {
            txt: 'TEXT',
            font: 'Arial, Helvetica, sans-serif',
            size: 20,
            color: 'black'
        },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgById(imgId) {
    gMeme.selectedImgId = imgId

    const img = gImgs.find(img => imgId === img.id)
    return img
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function SetLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function SetLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function SetFontSize(value) {
    gMeme.lines[gMeme.selectedLineIdx].size += value
}

function addLine() {
    const newLine = {
        txt: 'TEXT',
        font: 'Arial, Helvetica, sans-serif',
        size: 20,
        color: 'black'
    }
    pushMiddle(gMeme.lines,newLine)
    
}

function switchLine(index = -1) {
    if (index !== -1) {
        gMeme.selectedLineIdx = index
        return
    } else {
        if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
            gMeme.selectedLineIdx = 0
        } else {
            gMeme.selectedLineIdx++
        }
    }

    console.log(gMeme.selectedLineIdx);
    
}

function saveLineLocation(index, x, y) {
    const pos = { x, y }
    gMeme.lines[index].pos = pos
}

function returnDeafultSet() {
    gMeme.selectedLineIdx = 0,
        gMeme.lines = [
            {
                txt: 'TEXT',
                font: 'Arial, Helvetica, sans-serif',
                size: 20,
                color: 'black'
            },
            {
                txt: 'TEXT',
                font: 'Arial, Helvetica, sans-serif',
                size: 20,
                color: 'black'
            }
        ]
}

