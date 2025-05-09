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
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            text: 'TEXT',
            font: 'Arial, Helvetica, sans-serif',
            size: 20,
            color: 'black',
            align: '',
            pos: {x:0.45,y:0.2}
        },
        {
            text: 'TEXT',
            font: 'Arial, Helvetica, sans-serif',
            size: 20,
            color: 'black',
            align: '',
            pos: {x:0.45,y:0.85}
        },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gRandomLines = [
    "When life gives you lemons",
    "That feeling when",
    "I can't even",
    "Why you no",
    "No one asked",
    "Basically me",
    "When you realize",
    "Do it for the vine",
    "You good bro?",
    "Just do it",
    "Not my problem",
    "I don't know lol",
    "Y'all won't believe",
    "Every single time",
    "What are those?",
    "Out of here",
    "This is fine",
    "Same energy",
    "Big mood",
    "Me trying",
    "Moment of silence",
    "Hold my beer",
    "That's a mood",
    "Tell me more",
    "I'm not crying",
    "Oops, all me",
    "Can't relate",
    "Good vibes only",
    "Wait, what?",
    "I came here to...",
    "That awkward moment",
    "Living rent free",
    "Its happening",
    "Stay woke",
    "Facts only",
    "Keep calm",
    "Never forget",
    "Ight, Imma head out"
  ]

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

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(diff) {
    if (diff < 0 && gMeme.lines[gMeme.selectedLineIdx].size <= 6) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
}

function alignText(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function addLine() {
    const newLine = {
        text: 'TEXT',
        font: 'Arial, Helvetica, sans-serif',
        size: 20,
        color: 'black',
        pos:{x:0.45,y:0.5}
    }
    gMeme.lines.push(newLine)

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
}

function removeLine() {
    if (gMeme.lines.length < 1) return

    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1

    switchLine(gMeme.lines.length - 1)
}

function saveLineLocation(canvas,index, x, y) {
    const pos = {
        x: x / canvas.width, 
        y: y / canvas.height
    }
    gMeme.lines[index].pos = pos;
    
}

function returnDeafultSet() {
    gMeme.selectedLineIdx = 0,
        gMeme.lines = [
            {
                text: 'TEXT',
                font: 'Arial, Helvetica, sans-serif',
                size: 20,
                color: 'black',
                align: '',
                pos: {x:0.45,y:0.2},
            },
            {
                text: 'TEXT',
                font: 'Arial, Helvetica, sans-serif',
                size: 20,
                color: 'black',
                align: '',
                pos: {x:0.45,y:0.85},
            }
        ]
}


function moveLine(canvas,dx, dy) {
    const relativeDx = dx / canvas.width
    const relativeDy = dy / canvas.height

    let newX = gMeme.lines[gMeme.selectedLineIdx].pos.x + relativeDx
    let newY = gMeme.lines[gMeme.selectedLineIdx].pos.y + relativeDy

    gMeme.lines[gMeme.selectedLineIdx].pos.x = newX
    gMeme.lines[gMeme.selectedLineIdx].pos.y = newY
}

function getTextLines(){
    return gRandomLines
}