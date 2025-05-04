'use strict'

function onInitGallery() {
    displaySection('.gallery-container')
    hideSection('.gen-container')
    
    restoreTextInput()
    returnDeafultSet()

    renderGallery()
}

function restoreTextInput() {
    document.querySelector('.text-input').value = ''
}

function renderGallery() {
    const imgs = getImgs()
    const imgList = document.querySelector('.img-list')
    imgList.innerHTML = imgs.map(img=>{
        return `<li><img id="${img.id}" onclick="onInitGen(id)" src="${img.url}" alt=""></li>`
    }).join('')

}
