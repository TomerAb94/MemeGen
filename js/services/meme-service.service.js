'use strict'

var gImgs = [
    { id: 1, url: 'imgs/meme-imgs/meme-imgs (square)/1.jpg', keywords: ['president', 'Trump'] },
    { id: 2, url: 'imgs/meme-imgs/meme-imgs (square)/2.jpg', keywords: ['cute', 'dog'] }
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

var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}