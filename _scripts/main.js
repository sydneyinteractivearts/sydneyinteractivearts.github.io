
const config = {
    sizeScalar: 2.3
};

class ShapeFactory {

    static getConfig() {
        return {
            size: 10*config.sizeScalar
        }
    }

    static Line(x, y) {
        return new Path.Line({
            from: [x, y-ShapeFactory.getConfig().size],
            to: [x, y+ShapeFactory.getConfig().size],
            strokeColor: _.sample(['blue', 'green']),
            strokeWidth: ShapeFactory.getConfig().size*0.5,
            strokeCap: 'round'
        })
    }

    static Polygon(x, y, sides) {
        let colorProps = {
            hue: 100,
            saturation: 1,
            brightness: 0.8,
            alpha: 0.95
        };

        const RADIUS_SCALAR = 1.3;
        const STROKE_SCALAR= 0.4;
        return new Path.RegularPolygon({
            center: [x, y],
            sides: sides,
            radius: ShapeFactory.getConfig().size*RADIUS_SCALAR,
            strokeWidth: ShapeFactory.getConfig().size*STROKE_SCALAR,
            strokeColor: colorProps
        });
    }

    static Arc(x, y) {

        let offset = 24;
        let offset2 = offset*.71425;
        const STROKE_SCALAR = 0.4;

        return new Path.Arc({
            center: [x, y],
            from: [x-offset, y],
            through: [x+offset2, y+offset2],
            to: [x, y+offset],
            pivot: new Point(x, y),
            strokeColor: {
                hue: 200,
                saturation: 1,
                brightness: 0.8
            },
            strokeWidth: ShapeFactory.getConfig().size*STROKE_SCALAR
        })
    }

}



function createItem(x, y) {
    // factory for random shape
    // return the shape

    var item;
    switch(Math.floor(Math.random()*3)) {

        case 0:
            item = ShapeFactory.Line(x, y);
            break;
        case 1:
            item = ShapeFactory.Polygon(x, y, Math.floor(Math.random() * 7)+3);
            break;
        case 2:
            item = ShapeFactory.Arc(x, y);
            break;

        case 3:
            break;

        default:
            console.warn('Shouldn\'t see this!');
            break;
    }
    return item;
}


var items = [];


var Overlay = (() => {
    
    return {
        createBackground: () => {
            var whiteBg = new Path.Rectangle({
                topLeft: new Point(0,0),
                bottomRight: view.viewSize,
                fillColor: 'white'
            });
        },
        createFront: () => {
            var blendRect = new Path.Rectangle({
                topLeft: new Point(0,0),
                bottomRight: view.viewSize,
                fillColor: {
                    gradient: {
                        stops: ['blue', 'green', 'red', 'blue']
                    },
                    origin: new Point(0,0),
                    destination: view.viewSize
                },
                blendMode: 'screen'
            });
        }
        
    }
    
})();

var Shapes = (() => {

    let STEP = 55*(config.sizeScalar*0.85);
    
    return {
        clear: () => {
            if(paper.project.isEmpty()) {
                return;
            }
            items.length = 0;
            console.log(paper);
            paper.project.clear();
        },
        create: () => {
            for(var y=0; y<view.viewSize.height+STEP*2; y+=STEP) {
                for(var x=0; x<view.viewSize.width+STEP*2; x+=STEP) {
                    var item = createItem(x, y);
                    item.data.uniqueRotation = (Math.random() - 0.5) * 5; //(y+x)*0.005
                    items.push(item);
                }
            }
        }
    }
})();

var init = function() {
    Shapes.clear();
    Overlay.createBackground();
    Shapes.create();
    Overlay.createFront();
};





function onFrame() {

    for(var i=0; i<items.length; i++) {
        var item = items[i];
        item.rotate(item.data.uniqueRotation);
    }

}

function onResize(event) {


}
