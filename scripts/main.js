

var shape = new Path.Line({
    //point: [0, 0],
    //size: [1, 100],
    from: [0,-70],
    to: [0, 70],
    strokeColor: 'orange',
    strokeWidth: 7,
    strokeCap: 'round'
});


//var shape = new Path.RegularPolygon({
//    center: [0, 0],
//    sides: 6,
//    radius: 20,
//    fillColor: {
//        hue: 100,
//        saturation: 1,
//        brightness: 0,
//        alpha: 0.95
//    }
//});

var symbol = new Symbol(shape);
var symbols = [];

var STEP = 25;


function onFrame(event) {
    for(var i=0; i<symbols.length; i++) {
        var instance = symbols[i];
        instance.rotate(instance.data.uniqueRotation);
        //console.log(instance.fillColor);
        
        //symbol.scale(1 + (Date.now() * 0.000000000000001));
    }
    symbol.definition.strokeColor.hue += 0.15;
    
}

function onResize(event) {

    symbols = [];
    for(var h=0; h<view.viewSize.height; h+=STEP) {
        for(var w=0; w<view.viewSize.width; w+=STEP) {
            var placedSymbol = symbol.place(new Point(w, h));
            placedSymbol.data.uniqueRotation = (h+w)*0.005;
            symbols.push(placedSymbol);
        }
    }
}
