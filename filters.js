document.addEventListener('DOMContentLoaded', function(){
    let plotno = document.querySelector('#plotno')

    let negatyw = document.querySelector('#negatyw')
    let black = document.querySelector("#black")
    let bright = document.querySelector("#bright")
    let bright_counter = document.querySelector("#bright-counter")
    let contrast = document.querySelector("#contrast")
    let contrast_counter = document.querySelector("#contrast-counter")
    let saturation = document.querySelector("#saturation")
    let saturation1 = document.querySelector("#saturation1")
    let saturation2 = document.querySelector("#saturation2")
    let saturation_counter = document.querySelector("#saturation-counter")
    
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
    //KONTRAST

    function truncateColor(value) {
        if (value < 0) {
          value = 0;
        } else if (value > 255) {
          value = 255;
        }
      
        return value;
      }

    contrast.addEventListener("input", (e)=>{
        redraw()
        let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
        
        let value = (e.target.value)
        contrast_counter.innerHTML = value
        let factor = ((259.0 * (value + 255.0)) / (255.0 * (259.0 - value)))/10
        for (let i = 0; i < imageData.data.length; i+=4) {
            imageData.data[i] = truncateColor(factor * (imageData.data[i] - 128.0) + 128.0)
            imageData.data[i+1] = truncateColor(factor * (imageData.data[i+1] - 128.0) + 128.0)
            imageData.data[i+2] = truncateColor(factor * (imageData.data[i+2] - 128.0) + 128.0)
        }
        ctx.putImageData(imageData, 0, 0)
    })


     /// NASYCENIE
     saturation.addEventListener("input", (e)=>{
        console.log(ctx.fillStyle)
        saturation_counter.innerHTML = `hsl(${saturation.value}, ${saturation1.value}%, ${saturation2.value}%)`
        ctx.globalCompositeOperation = "saturation"
        ctx.fillStyle = `hsl(${e.target.value},${saturation1.value}%,${saturation2.value}%)`
        ctx.fillRect(0,0,plotno.width,plotno.height)
    })
     saturation1.addEventListener("input", (e)=>{
        saturation_counter.innerHTML = `hsl(${saturation.value}, ${saturation1.value}%, ${saturation2.value}%)`
        ctx.globalCompositeOperation = "saturation"
        ctx.fillStyle = `hsl(${saturation.value},${e.target.value}%,${saturation2.value}%)`
        ctx.fillRect(0,0,plotno.width,plotno.height)
    })
     saturation2.addEventListener("input", (e)=>{
        saturation_counter.innerHTML = `hsl(${saturation.value}, ${saturation1.value}%, ${saturation2.value}%)`
        ctx.globalCompositeOperation = "saturation"
        ctx.fillStyle = `hsl(${saturation.value},${saturation2.value}%,${e.target.value}%)`
        ctx.fillRect(0,0,plotno.width,plotno.height)
    })

                            //////////////FILTRY

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

