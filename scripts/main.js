


//var shape = ;

function createItem(x, y) {
    // factory for random shape
    // return the shape

    var item;
    switch(Math.floor(Math.random()*2)) {
        case 0:
            item = new Path.Line({
                from: [x,y-70],
                to: [x, y+70],
                strokeColor: 'orange',
                strokeWidth: 7,
                strokeCap: 'round'
            });
            break;
        case 1:
            item = new Path.RegularPolygon({
                center: [x, y],
                sides: 6,
                radius: 20,
                fillColor: {
                    hue: 100,
                    saturation: 1,
                    brightness: 0.8,
                    alpha: 0.95
                }
            });
            break;
        default:
            console.log('woooo');
            break;
    }
    return item;
}

var items = [];

var STEP = 25;

for(var y=0; y<view.viewSize.height; y+=STEP) {
    for(var x=0; x<view.viewSize.width; x+=STEP) {
        var item = createItem(x, y);
        item.data.uniqueRotation = (y+x)*0.005;
        items.push(item);
    }
}

function onFrame(event) {
    var now = Date.now();
    
    for(var i=0; i<items.length; i++) {
        var item = items[i];
        item.rotate(item.data.uniqueRotation);
        if(item.strokeColor) {
            item.strokeColor.hue += i*0.0015;    
        } else if(item.fillColor) {
            item.fillColor.hue -= i*0.0015;
        }
        
        
        //symbol.scale(1 + (Date.now() * 0.000000000000001));
    }
    
}

function onResize(event) {


}
