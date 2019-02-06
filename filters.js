document.addEventListener('DOMContentLoaded', function(){
    let plotno = document.querySelector('#plotno')
    let negatyw = document.querySelector('#negatyw')
    let kontrastV = document.querySelector("#kontrast_wartosc")
    let black = document.querySelector("#black")
    let jasnosc_minus = document.querySelector("#jasnosc_zmniejsz")
    let jasnosc_plus = document.querySelector('#jasnosc_zwieksz')
    
    const zdjecie = './img.jpeg'
    let ctx = plotno.getContext('2d')
    let img = new Image()
    img.src = zdjecie
    img.addEventListener('load', (e)=>{
        ctx.drawImage(img, 0, 0, plotno.width, plotno.height) 
    })
    
    
    //JASNOSC
    jasnosc_minus.addEventListener("click", (e)=>{
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
        for(let i = 0; i< imageData.data.length; i+=4){
                imageData.data[i]   = imageData.data[i] / 1.3
                imageData.data[i+1] = imageData.data[i+1] / 1.3
                imageData.data[i+2] = imageData.data[i+2] / 1.3
        }
        ctx.putImageData(imageData, 0, 0)
    })
    jasnosc_plus.addEventListener("click", (e)=>{
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
        for(let i = 0; i< imageData.data.length; i+=4){
                imageData.data[i]   *= 1.3
                imageData.data[i+1] *= 1.3
                imageData.data[i+2] *= 1.3
        }
        ctx.putImageData(imageData, 0, 0)
    })

    //NEGATYW
    negatyw.addEventListener("click", (e)=>{
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
            
        for(let i = 0; i< imageData.data.length; i+=4){
                imageData.data[i]   = imageData.data[i]^255
                imageData.data[i+1] = imageData.data[i+1]^255
                imageData.data[i+2] = imageData.data[i+2]^255
        }
        ctx.putImageData(imageData, 0, 0)
    })
    //czarnobiały
    black.addEventListener("click", function() {
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
        for (let i = 0; i < imageData.data.length; i+= 4) {
        let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3
        imageData.data[i]     = avg
        imageData.data[i + 1] = avg
        imageData.data[i + 2] = avg
        }
        ctx.putImageData(imageData, 0, 0);
        })
    })

