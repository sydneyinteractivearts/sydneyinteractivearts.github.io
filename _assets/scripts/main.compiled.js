'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = {
    sizeScalar: 2.3
};

var ShapeFactory = (function () {
    function ShapeFactory() {
        _classCallCheck(this, ShapeFactory);
    }

    _createClass(ShapeFactory, null, [{
        key: 'getConfig',
        value: function getConfig() {
            return {
                size: 10 * config.sizeScalar
            };
        }
    }, {
        key: 'Line',
        value: function Line(x, y) {
            return new Path.Line({
                from: [x, y - ShapeFactory.getConfig().size],
                to: [x, y + ShapeFactory.getConfig().size],
                strokeColor: _.sample(['blue', 'green']),
                strokeWidth: ShapeFactory.getConfig().size * 0.5,
                strokeCap: 'round'
            });
        }
    }, {
        key: 'Polygon',
        value: function Polygon(x, y, sides) {
            var colorProps = {
                hue: 100,
                saturation: 1,
                brightness: 0.8,
                alpha: 0.95
            };

            var RADIUS_SCALAR = 1.3;
            var STROKE_SCALAR = 0.4;
            return new Path.RegularPolygon({
                center: [x, y],
                sides: sides,
                radius: ShapeFactory.getConfig().size * RADIUS_SCALAR,
                strokeWidth: ShapeFactory.getConfig().size * STROKE_SCALAR,
                strokeColor: colorProps
            });
        }
    }, {
        key: 'Arc',
        value: function Arc(x, y) {

            var offset = 24;
            var offset2 = offset * .71425;
            var STROKE_SCALAR = 0.4;

            return new Path.Arc({
                center: [x, y],
                from: [x - offset, y],
                through: [x + offset2, y + offset2],
                to: [x, y + offset],
                pivot: new Point(x, y),
                strokeColor: {
                    hue: 200,
                    saturation: 1,
                    brightness: 0.8
                },
                strokeWidth: ShapeFactory.getConfig().size * STROKE_SCALAR
            });
        }
    }]);

    return ShapeFactory;
})();

function createItem(x, y) {
    // factory for random shape
    // return the shape

    var item;
    switch (Math.floor(Math.random() * 3)) {

        case 0:
            item = ShapeFactory.Line(x, y);
            break;
        case 1:
            item = ShapeFactory.Polygon(x, y, Math.floor(Math.random() * 7) + 3);
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

var Overlay = (function () {

    return {
        createBackground: function createBackground() {
            var whiteBg = new Path.Rectangle({
                topLeft: new Point(0, 0),
                bottomRight: view.viewSize,
                fillColor: 'white'
            });
        },
        createFront: function createFront() {
            var blendRect = new Path.Rectangle({
                topLeft: new Point(0, 0),
                bottomRight: view.viewSize,
                fillColor: {
                    gradient: {
                        stops: ['blue', 'green', 'red', 'blue']
                    },
                    origin: new Point(0, 0),
                    destination: view.viewSize
                },
                blendMode: 'screen'
            });
        }

    };
})();

var Shapes = (function () {

    var STEP = 55 * (config.sizeScalar * 0.85);

    return {
        clear: function clear() {
            if (paper.project.isEmpty()) {
                return;
            }
            items.length = 0;
            console.log(paper);
            paper.project.clear();
        },
        create: function create() {
            for (var y = 0; y < view.viewSize.height + STEP * 2; y += STEP) {
                for (var x = 0; x < view.viewSize.width + STEP * 2; x += STEP) {
                    var item = createItem(x, y);
                    item.data.uniqueRotation = (Math.random() - 0.5) * 5; //(y+x)*0.005
                    items.push(item);
                }
            }
        }
    };
})();

var init = function init() {
    Shapes.clear();
    Overlay.createBackground();
    Shapes.create();
    Overlay.createFront();
};

paper.install(window);

window.onload = function () {

    paper.setup('background-canvas');

    init();

    view.onFrame = function () {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.rotate(item.data.uniqueRotation);
        }
    };

    view.onResize = _.debounce(init, 200, false);
};