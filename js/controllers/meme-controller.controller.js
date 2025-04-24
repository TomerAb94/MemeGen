'use strict'

var gElCanvas
var gCtx

function onInitGen(){
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // onResize()
    // renderMeme()
    hideSection('.gallery-container')
}

function renderMeme(){

}

function hideSection(containerName){
    document.querySelector(containerName).classList.add('hide')
}

function displaySection(containerName){
    document.querySelector(containerName).classList.remove('hide')
}