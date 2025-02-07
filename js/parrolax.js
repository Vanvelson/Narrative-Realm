let img = document.querySelector('.main__box-img')

window.addEventListener('mousemove', function(event){
    let x = event.offsetX 
    let y = event.offsetY

    img.style.transform = `translate(${-x/20}px,${y/20}px)`
})
let img2 = document.querySelector('.main__box-img')

window.addEventListener('mousemove', function(event){
    let x = event.offsetX 
    let y = event.offsetY

    img2.style.transform = `translate(${-x/240}px,${y/240}px)`
})
let img3 = document.querySelector('.main__box-img3')

window.addEventListener('mousemove', function(event){
    let x = event.offsetX 
    let y = event.offsetY

    img3.style.transform = `translate(${-x/180}px,${y/180}px)`
})
let img4 = document.querySelector('.main__box-im')

window.addEventListener('mousemove', function(event){
    let x = event.offsetX 
    let y = event.offsetY

    img4.style.transform = `translate(${-x/240}px,${y/240}px)`
})
