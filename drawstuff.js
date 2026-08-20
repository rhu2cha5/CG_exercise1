/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas, context, and image data
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    var w = context.canvas.width; // as set in html
    var h = context.canvas.height;  // as set in html
    var imagedata = context.createImageData(w,h);
 
    // legend: . = skip, K = black, P = pink, W = white, Y = yellow
    var mushroomGrid = [
    "................",
    "................",
    ".......KKKK.....",
    "......KPPPPK....",
    ".....KPPPPPWK...",
    "....KPPWWPPPK...",
    "....KKKKKKKKK...",
    "......KYYYYK....",
    "......KYYYYK....",
    "......KKKKKK...."
    ];

    var palette = {
        "K": new Color(20,20,20,255),
        "P": new Color(235,90,110,255),
        "W": new Color(255,255,255,255),
        "Y": new Color(250,230,160,255)
    };

    var cellSize = 20;   // how big each grid square is in real pixels
    var startX = 80;     // where the design begins on the canvas
    var startY = 80;

    for (var row = 0; row < mushroomGrid.length; row++) {
        for (var col = 0; col < mushroomGrid[row].length; col++) {
            var code = mushroomGrid[row][col];
            if (code === ".") continue; // skip empty cells

            var color = palette[code];
            var blockX = startX + col*cellSize;
            var blockY = startY + row*cellSize;

            for (var x = blockX; x < blockX+cellSize; x++)
                for (var y = blockY; y < blockY+cellSize; y++) {
                    drawPixel(imagedata, x, y, color);
                }
        }
    }
    
    context.putImageData(imagedata, 0, 0); // display the image in the context
}
