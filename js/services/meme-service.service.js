'use strict'

var gImgs = [
    { id: 1, url: 'imgs/meme-imgs/meme-imgs (square)/1.jpg', keywords: ['president', 'Trump'] },
    { id: 2, url: 'imgs/meme-imgs/meme-imgs (square)/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'imgs/meme-imgs/meme-imgs (square)/3.jpg', keywords: ['baby', 'dog'] },
    { id: 4, url: 'imgs/meme-imgs/meme-imgs (square)/4.jpg', keywords: ['sleep', 'cat'] },
    { id: 5, url: 'imgs/meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', keywords: ['evil', 'funny'] },
]

var gMeme = {
    selectedImgId: null,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'TEXT',
            size: 20,
            color: 'black'
        }
    ]
}

function getImgById(imgId) {
    gMeme.selectedImgId = imgId
    
    const img = gImgs.find(img => imgId === img.id)
    return img
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }