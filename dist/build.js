var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Shape/Shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Shape = /** @class */ (function () {
        function Shape(context) {
            this.context = context;
            this.width = 0;
            this.heigh = 0;
            this.x = 0;
            this.y = 0;
            this.direction = Shape.DIRECTION_DOWN;
        }
        Shape.prototype.getX = function () {
            return this.x;
        };
        Shape.prototype.setX = function (x) {
            this.x = x;
        };
        Shape.prototype.getY = function () {
            return this.y;
        };
        Shape.prototype.setY = function (y) {
            this.y = y;
        };
        Shape.prototype.getDirection = function () {
            return this.direction;
        };
        Shape.prototype.setDirection = function (direction) {
            this.direction = direction;
            ;
        };
        Shape.DIRECTION_UP = 'up';
        Shape.DIRECTION_RIGHT = 'right';
        Shape.DIRECTION_DOWN = 'down';
        Shape.DIRECTION_LEFT = 'left';
        return Shape;
    }());
    exports.Shape = Shape;
});
define("Shape/Cube", ["require", "exports", "Shape/Shape"], function (require, exports, Shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Cube = /** @class */ (function (_super) {
        __extends(Cube, _super);
        function Cube(context) {
            var _this = _super.call(this, context) || this;
            _this.width = 20;
            _this.heigh = 20;
            _this.x = 0;
            _this.y = 0;
            _this.color = '#FF0000';
            _this.draw();
            return _this;
        }
        Cube.prototype.draw = function () {
            this.context.fillStyle = this.color;
            this.context.fillRect(this.x, this.y, this.width, this.heigh);
        };
        Cube.prototype.move = function () {
            this.context.clearRect(0, 0, 400, 400);
            this.draw();
        };
        return Cube;
    }(Shape_1.Shape));
    exports.Cube = Cube;
});
define("PositionManager", ["require", "exports", "Shape/Shape"], function (require, exports, Shape_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PositionManager = /** @class */ (function () {
        function PositionManager(shape, point) {
            var _this = this;
            this.shape = shape;
            this.point = point;
            this.onKeyDown();
            setInterval(function () {
                _this.move();
                point.draw();
            }, 1000);
        }
        PositionManager.prototype.up = function () {
            this.shape.setY(this.shape.getY() - PositionManager.step);
            this.shape.move();
        };
        PositionManager.prototype.down = function () {
            this.shape.setY(this.shape.getY() + PositionManager.step);
            this.shape.move();
        };
        PositionManager.prototype.left = function () {
            this.shape.setX(this.shape.getX() - PositionManager.step);
            this.shape.move();
        };
        PositionManager.prototype.right = function () {
            this.shape.setX(this.shape.getX() + PositionManager.step);
            if (this.shape.getX() >= this.point.getX() && this.shape.getY() >= this.point.getY()) {
                console.log(11111111);
            }
            this.shape.move();
        };
        PositionManager.prototype.onKeyDown = function () {
            var _this = this;
            document.onkeydown = function (e) {
                e = e || window.event;
                if (e.keyCode == 38) {
                    _this.shape.setDirection(Shape_2.Shape.DIRECTION_UP);
                }
                else if (e.keyCode == 40) {
                    _this.shape.setDirection(Shape_2.Shape.DIRECTION_DOWN);
                }
                else if (e.keyCode == 37) {
                    _this.shape.setDirection(Shape_2.Shape.DIRECTION_LEFT);
                }
                else if (e.keyCode == 39) {
                    _this.shape.setDirection(Shape_2.Shape.DIRECTION_RIGHT);
                }
            };
        };
        PositionManager.prototype.move = function () {
            if (this.shape.getDirection() === Shape_2.Shape.DIRECTION_UP) {
                this.up();
            }
            else if (this.shape.getDirection() === Shape_2.Shape.DIRECTION_DOWN) {
                this.down();
            }
            else if (this.shape.getDirection() === Shape_2.Shape.DIRECTION_LEFT) {
                this.left();
            }
            else if (this.shape.getDirection() === Shape_2.Shape.DIRECTION_RIGHT) {
                this.right();
            }
        };
        PositionManager.step = 20;
        return PositionManager;
    }());
    exports.PositionManager = PositionManager;
});
define("App", ["require", "exports", "Shape/Cube", "PositionManager"], function (require, exports, Cube_1, PositionManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
        }
        /**
         * Run game
         */
        App.prototype.run = function () {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext("2d");
            if (context === null) {
                return;
            }
            var range = Array.apply(null, Array(21)).map(function (_, i) {
                return i * 20;
            });
            console.log(range);
            var cube = new Cube_1.Cube(context);
            var cube1 = new Cube_1.Cube(context);
            console.log(Math.random() * (370 - 1) + 1);
            cube1.setX(range[Math.floor(Math.random() * 21)]);
            cube1.setY(range[Math.floor(Math.random() * 21)]);
            cube1.draw();
            var positionManager = new PositionManager_1.PositionManager(cube, cube1);
        };
        /**
         * @type {number}
         */
        App.width = 400;
        return App;
    }());
    exports.App = App;
});
define("main", ["require", "exports", "App"], function (require, exports, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.main = function () {
            var app = new App_1.App();
            app.run();
            return 0;
        };
        return Startup;
    }());
    Startup.main();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdm9sb2R5bXlyL3d3dy90ZXRyaXMvc3JjLyIsInNvdXJjZXMiOlsiU2hhcGUvU2hhcGUudHMiLCJTaGFwZS9DdWJlLnRzIiwiUG9zaXRpb25NYW5hZ2VyLnRzIiwiQXBwLnRzIiwibWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUE7UUFhSSxlQUFtQixPQUFpQztZQUFqQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtZQU4xQyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsVUFBSyxHQUFHLENBQUMsQ0FBQztZQUNWLE1BQUMsR0FBRyxDQUFDLENBQUM7WUFDTixNQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ04sY0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7UUFHM0MsQ0FBQztRQUtNLG9CQUFJLEdBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVNLG9CQUFJLEdBQVgsVUFBWSxDQUFTO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVNLG9CQUFJLEdBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVNLG9CQUFJLEdBQVgsVUFBWSxDQUFTO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVNLDRCQUFZLEdBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7UUFFTSw0QkFBWSxHQUFuQixVQUFvQixTQUFpQjtZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUFBLENBQUM7UUFDaEMsQ0FBQztRQXZDc0Isa0JBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIscUJBQWUsR0FBRyxPQUFPLENBQUM7UUFDMUIsb0JBQWMsR0FBRyxNQUFNLENBQUM7UUFDeEIsb0JBQWMsR0FBRyxNQUFN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