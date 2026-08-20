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
 
    var red = new Color(200,30,30,255);   // cap color
var cream = new Color(255,240,220,255); // stem color
var white = new Color(255,255,255,255); // spots

// cap: ellipse centered at (256,200) with radius 90 wide, 60 tall
var cx = 256, cy = 200, rx = 90, ry = 60;
for (var x = cx-rx; x <= cx+rx; x++)
    for (var y = cy-ry; y <= cy+ry; y++) {
        var dx = (x-cx)/rx;
        var dy = (y-cy)/ry;
        if (dx*dx + dy*dy <= 1) {
            drawPixel(imagedata,x,y,red);
        }
    }

    // stem: rectangle under the cap
    for (var x=226; x<286; x++)
        for (var y=200; y<320; y++) {
            drawPixel(imagedata,x,y,cream);
        }

    // spots on the cap (small ellipses)
    var spots = [ [220,180,12,10], [280,190,10,8], [250,160,8,7] ];
    for (var s=0; s<spots.length; s++) {
        var sx=spots[s][0], sy=spots[s][1], srx=spots[s][2], sry=spots[s][3];
        for (var x = sx-srx; x <= sx+srx; x++)
            for (var y = sy-sry; y <= sy+sry; y++) {
                var dx = (x-sx)/srx;
                var dy = (y-sy)/sry;
                if (dx*dx + dy*dy <= 1) {
                    drawPixel(imagedata,x,y,white);
                }
            }
    }
    
    context.putImageData(imagedata, 0, 0); // display the image in the context
}
