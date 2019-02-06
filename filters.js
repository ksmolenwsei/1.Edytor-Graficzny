document.addEventListener('DOMContentLoaded', function(){
    let plotno = document.querySelector('#plotno')

    let negatyw = document.querySelector('#negatyw')
    let black = document.querySelector("#black")

    let bright = document.querySelector("#bright")
    let bright_counter = document.querySelector("#bright-counter")


    
    console.log(negatyw)
    const zdjecie = './img.jpeg'
    let ctx = plotno.getContext('2d')
    let img = new Image()
    img.src = zdjecie
    img.addEventListener('load', (e)=>{
        ctx.drawImage(img, 0, 0, plotno.width, plotno.height) 
    })
    
    function redraw(){
        ctx.drawImage(img, 0, 0, plotno.width, plotno.height)
    }
    
    //JASNOSC
    bright.addEventListener("input", (e)=>{
        redraw()
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
        let value = (e.target.value)/10
        bright_counter.innerHTML = value
        console.log(value)
        for(let i = 0; i< imageData.data.length; i+=4){
                imageData.data[i]   *= value
                imageData.data[i+1] *= value
                imageData.data[i+2] *= value
        }

        ctx.putImageData(imageData, 0, 0)
    })
    
    


                            //////////////FILTRY



    //NEGATYW
    negatyw.addEventListener("click", (e)=>{
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
        console.log(imageData)
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

