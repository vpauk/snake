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
define("Shape/Section", ["require", "exports", "Shape/Shape"], function (require, exports, Shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Section extends Shape_1.Shape {
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
            return new Section(context);
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
    exports.Section = Section;
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
define("PositionManager", ["require", "exports", "Shape/Shape", "Shape/Section"], function (require, exports, Shape_2, Section_1) {
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
                let nextPosition = item.getY() - PositionManager.step;
                if (item.getY() - PositionManager.step === this.point.getY() && item.getX() === this.point.getX()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setY(clonePoint.getY() - PositionManager.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setY(nextPosition);
                item.draw();
            }
        }
        down() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getY() + PositionManager.step;
                if (item.getY() + PositionManager.step === this.point.getY() && item.getX() === this.point.getX()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setY(clonePoint.getY() + PositionManager.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setY(nextPosition);
                item.draw();
            }
        }
        left() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getX() - PositionManager.step;
                if (item.getX() - PositionManager.step === this.point.getX() && item.getY() === this.point.getY()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setX(clonePoint.getX() - PositionManager.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setX(nextPosition);
                item.draw();
            }
        }
        right() {
            this.context.clearRect(0, 0, 400, 400);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getX() + PositionManager.step;
                if (item.getX() + PositionManager.step === this.point.getX() && item.getY() === this.point.getY()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setX(clonePoint.getX() + PositionManager.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setX(nextPosition);
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
            this.point = Section_1.Section.create(this.context).random().draw();
        }
    }
    PositionManager.step = 20;
    exports.PositionManager = PositionManager;
});
define("App", ["require", "exports", "Shape/Section", "PositionManager", "Snake"], function (require, exports, Section_2, PositionManager_1, Snake_1) {
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
            const cube = Section_2.Section.create(context);
            const cube1 = Section_2.Section.create(context)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdm9sb2R5bXlyL3d3dy90ZXRyaXMvc3JjLyIsInNvdXJjZXMiOlsiU2hhcGUvU2hhcGUudHMiLCJTaGFwZS9TZWN0aW9uLnRzIiwiU25ha2UudHMiLCJQb3NpdGlvbk1hbmFnZXIudHMiLCJBcHAudHMiLCJtYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBY0ksWUFBbUIsT0FBaUM7WUFBakMsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7WUFQMUMsVUFBSyxHQUFHLENBQUMsQ0FBQztZQUNWLFVBQUssR0FBRyxDQUFDLENBQUM7WUFDVixNQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ04sTUFBQyxHQUFHLENBQUMsQ0FBQztZQUNOLGNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQ2pDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHckIsQ0FBQztRQUlNLElBQUk7WUFDUCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVNLElBQUksQ0FBQyxDQUFTO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVNLElBQUk7WUFDUCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVNLElBQUksQ0FBQyxDQUFTO1lBQ2pCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVNLFlBQVk7WUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQztRQUVNLFlBQVksQ0FBQyxTQUFpQjtZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUFBLENBQUM7UUFDaEMsQ0FBQzs7SUF2Q3NCLGtCQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLHFCQUFlLEdBQUcsT0FBTyxDQUFDO0lBQzFCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLG9CQUFjLEdBQUcsTUFBTSxDQUFDO0lB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