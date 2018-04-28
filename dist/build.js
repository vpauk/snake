define("Shape/Shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Shape {
        constructor(context) {
            this.context = context;
            this.width = 0;
            this.heigh = 0;
            this.x = 0;
            this.y = 0;
            this.direction = Shape.DIRECTION_DOWN;
            this.color = '';
        }
        getX() {
            return this.x;
        }
        setX(x) {
            this.x = x;
        }
        getY() {
            return this.y;
        }
        setY(y) {
            this.y = y;
        }
        getDirection() {
            return this.direction;
        }
        setDirection(direction) {
            this.direction = direction;
            ;
        }
    }
    Shape.DIRECTION_UP = 'up';
    Shape.DIRECTION_RIGHT = 'right';
    Shape.DIRECTION_DOWN = 'down';
    Shape.DIRECTION_LEFT = 'left';
    exports.Shape = Shape;
});
define("Shape/Cube", ["require", "exports", "Shape/Shape"], function (require, exports, Shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Cube extends Shape_1.Shape {
        constructor(context) {
            super(context);
            this.width = 20;
            this.heigh = 20;
            this.x = 0;
            this.y = 0;
            this.color = '#FF0000';
            this.draw();
        }
        static create(context) {
            return new Cube(context);
        }
        draw() {
            this.context.fillStyle = this.color;
            this.context.fillRect(this.x, this.y, this.width, this.heigh);
            return this;
        }
        random() {
            const range = Array.apply(null, Array(21)).map((_, i) => {
                return i * 20;
            });
            this.x = range[Math.floor(Math.random() * 21)];
            this.y = range[Math.floor(Math.random() * 21)];
            return this;
        }
    }
    exports.Cube = Cube;
});
define("Snake", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Snake {
        constructor(context) {
            this.context = context;
            this.list = [];
            this.list = [];
        }
        add(item) {
            this.list.push(item);
        }
        getList() {
            return this.list;
        }
    }
    exports.Snake = Snake;
});
define("PositionManager", ["require", "exports", "Shape/Shape", "Shape/Cube"], function (require, exports, Shape_2, Cube_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PositionManager {
        constructor(context, snake, shape, point) {
            this.context = context;
            this.snake = snake;
            this.shape = shape;
            this.point = point;
            this.onKeyDown();
            setInterval(() => {
                this.move();
            }, 500);
        }
        up() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                item.setY(item.getY() - PositionManager.step);
                if (item.getY() - PositionManager.step === this.point.getY() && item.getX() === this.point.getX()) {
                    let clonePoint = Object.assign(new Cube_1.Cube(this.context), this.point);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.draw();
            }
        }
        down() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                item.setY(item.getY() + PositionManager.step);
                if (item.getY() + PositionManager.step === this.point.getY() && item.getX() === this.point.getX()) {
                    let clonePoint = Object.assign(new Cube_1.Cube(this.context), this.point);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.draw();
            }
        }
        left() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                item.setX(item.getX() - PositionManager.step);
                if (item.getX() - PositionManager.step === this.point.getX() && item.getY() === this.point.getY()) {
                    let clonePoint = Object.assign(new Cube_1.Cube(this.context), this.point);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.draw();
            }
        }
        right() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                item.setX(item.getX() + PositionManager.step);
                if (item.getX() + PositionManager.step === this.point.getX() && item.getY() === this.point.getY()) {
                    let clonePoint = Object.assign(new Cube_1.Cube(this.context), this.point);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.draw();
            }
        }
        onKeyDown() {
            document.onkeydown = (e) => {
                e = e || window.event;
                if (e.keyCode == 38) {
                    this.shape.setDirection(Shape_2.Shape.DIRECTION_UP);
                }
                else if (e.keyCode == 40) {
                    this.shape.setDirection(Shape_2.Shape.DIRECTION_DOWN);
                }
                else if (e.keyCode == 37) {
                    this.shape.setDirection(Shape_2.Shape.DIRECTION_LEFT);
                }
                else if (e.keyCode == 39) {
                    this.shape.setDirection(Shape_2.Shape.DIRECTION_RIGHT);
                }
            };
        }
        move() {
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
            this.point.draw();
        }
        pointAdded() {
            //this.context.clearRect(0, 0, 400, 400);
            this.point = Cube_1.Cube.create(this.context).random().draw();
        }
    }
    PositionManager.step = 20;
    exports.PositionManager = PositionManager;
});
define("App", ["require", "exports", "Shape/Cube", "PositionManager", "Snake"], function (require, exports, Cube_2, PositionManager_1, Snake_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        /**
         * Run game
         */
        run() {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext("2d");
            if (context === null) {
                return;
            }
            const range = Array.apply(null, Array(21)).map((_, i) => {
                return i * 20;
            });
            const cube = Cube_2.Cube.create(context);
            const cube1 = Cube_2.Cube.create(context)
                .random()
                .draw();
            const snake = new Snake_1.Snake(context);
            snake.add(cube);
            const positionManager = new PositionManager_1.PositionManager(context, snake, cube, cube1);
        }
    }
    /**
     * @type {number}
     */
    App.width = 400;
    exports.App = App;
});
define("main", ["require", "exports", "App"], function (require, exports, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Startup {
        static main() {
            const app = new App_1.App();
            app.run();
            return 0;
        }
    }
    Startup.main();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdm9sb2R5bXlyL3d3dy90ZXRyaXMvc3JjLyIsInNvdXJjZXMiOlsiU2hhcGUvU2hhcGUudHMiLCJTaGFwZS9DdWJlLnRzIiwiU25ha2UudHMiLCJQb3NpdGlvbk1hbmFnZXIudHMiLCJBcHAudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBY0ksWUFBbUIsT0FBaUM7WUFBakMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7WUFQMUMsVUFBSyxHQUFHLENBQUMsQ0FBQztZQUNWLFVBQUssR0FBRyxDQUFDLENBQUM7WUFDVixNQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ04sTUFBQyxHQUFHLENBQUMsQ0FBQztZQUNOLGNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ2pDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHckIsQ0FBQztRQUlNLElBQUk7WUFDUCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVNLElBQUksQ0FBQyxDQUFTO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVNLElBQUk7WUFDUCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVNLElBQUksQ0FBQyxDQUFTO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVNLFlBQVk7WUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLFlBQVksQ0FBQyxTQUFpQjtZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUFBLENBQUM7UUFDaEMsQ0FBQzs7SUF2Q3NCLGtCQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO0lBQzFCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO0lBTG5E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