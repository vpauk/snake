define("Section", ["require", "exports", "App"], function (require, exports, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Section {
        constructor(context) {
            this.context = context;
            this.width = 20;
            this.height = 20;
            this.x = 0;
            this.y = 0;
            this.color = '#FF0000';
            this.direction = Section.DIRECTION_DOWN;
        }
        static create(context) {
            return new Section(context);
        }
        draw() {
            this.context.fillStyle = this.color;
            this.context.fillRect(this.x, this.y, this.width, this.height);
            return this;
        }
        random() {
            const range = Array.apply(null, Array(App_1.App.step + 1)).map((_, i) => {
                return i * App_1.App.step;
            });
            this.x = range[Math.floor(Math.random() * (App_1.App.step + 1))];
            this.y = range[Math.floor(Math.random() * (App_1.App.step + 1))];
            return this;
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
        }
    }
    Section.DIRECTION_UP = 'up';
    Section.DIRECTION_RIGHT = 'right';
    Section.DIRECTION_DOWN = 'down';
    Section.DIRECTION_LEFT = 'left';
    exports.Section = Section;
});
define("Snake", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Snake {
        constructor() {
            this.list = [];
        }
        add(item) {
            this.list.push(item);
        }
        getList() {
            return this.list;
        }
        getHead() {
            return this.getList()[this.getList().length - 1];
        }
    }
    exports.Snake = Snake;
});
define("PositionManager", ["require", "exports", "Section", "App"], function (require, exports, Section_1, App_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PositionManager {
        constructor(context, snake, point) {
            this.context = context;
            this.snake = snake;
            this.point = point;
            this.change = { x: -1, y: -1, direction: '' };
            this.onKeyDown();
            setInterval(() => {
                this.move();
            }, 500);
        }
        up(item) {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            let nextPosition = item.getY() - App_2.App.step;
            if (item.getY() - App_2.App.step === this.point.getY() && item.getX() === this.point.getX()) {
                let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                clonePoint.setY(clonePoint.getY() - App_2.App.step);
                clonePoint.setDirection(this.change.direction);
                clonePoint.draw();
                this.snake.add(clonePoint);
                this.pointAdded();
            }
            item.setY(nextPosition);
            item.draw();
        }
        down(item) {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            let nextPosition = item.getY() + App_2.App.step;
            if (item.getY() + App_2.App.step === this.point.getY() && item.getX() === this.point.getX()) {
                let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                clonePoint.setY(clonePoint.getY() + App_2.App.step);
                clonePoint.setDirection(this.change.direction);
                clonePoint.draw();
                this.snake.add(clonePoint);
                this.pointAdded();
            }
            item.setY(nextPosition);
            item.draw();
        }
        left(item) {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            let nextPosition = item.getX() - App_2.App.step;
            if (item.getX() - App_2.App.step === this.point.getX() && item.getY() === this.point.getY()) {
                let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                clonePoint.setX(clonePoint.getX() - App_2.App.step);
                clonePoint.setDirection(this.change.direction);
                clonePoint.draw();
                this.snake.add(clonePoint);
                this.pointAdded();
            }
            item.setX(nextPosition);
            item.draw();
        }
        right(item) {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            let nextPosition = item.getX() + App_2.App.step;
            let isTest = false;
            if (item.getX() + App_2.App.step === this.point.getX() && item.getY() === this.point.getY()) {
                alert(1);
                let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                clonePoint.setX(clonePoint.getX() + App_2.App.step);
                clonePoint.setDirection(this.change.direction);
                clonePoint.draw();
                this.snake.add(clonePoint);
                this.pointAdded();
                alert(2);
                isTest = true;
            }
            console.log(nextPosition, item.getDirection());
            item.setX(nextPosition);
            item.draw();
            if (isTest) {
                alert(3);
            }
        }
        onKeyDown() {
            document.onkeydown = (event) => {
                this.change.x = this.snake.getHead().getX();
                this.change.y = this.snake.getHead().getY();
                switch (event.key) {
                    case "ArrowDown":
                        this.snake.getHead().setDirection(Section_1.Section.DIRECTION_DOWN);
                        this.change.direction = Section_1.Section.DIRECTION_DOWN;
                        break;
                    case "ArrowUp":
                        this.snake.getHead().setDirection(Section_1.Section.DIRECTION_UP);
                        this.change.direction = Section_1.Section.DIRECTION_UP;
                        break;
                    case "ArrowLeft":
                        this.snake.getHead().setDirection(Section_1.Section.DIRECTION_LEFT);
                        this.change.direction = Section_1.Section.DIRECTION_LEFT;
                        break;
                    case "ArrowRight":
                        this.snake.getHead().setDirection(Section_1.Section.DIRECTION_RIGHT);
                        this.change.direction = Section_1.Section.DIRECTION_RIGHT;
                        break;
                    default:
                        return;
                }
            };
        }
        move() {
            const list = this.snake.getList().slice(0);
            console.log('**************************');
            for (let item of list) {
                if (item.getX() === this.change.x && item.getY() === this.change.y && this.change.direction !== item.getDirection()) {
                    item.setDirection(this.change.direction);
                }
                if (item.getDirection() === Section_1.Section.DIRECTION_UP) {
                    this.up(item);
                }
                else if (item.getDirection() === Section_1.Section.DIRECTION_DOWN) {
                    this.down(item);
                }
                else if (item.getDirection() === Section_1.Section.DIRECTION_LEFT) {
                    this.left(item);
                }
                else if (item.getDirection() === Section_1.Section.DIRECTION_RIGHT) {
                    this.right(item);
                }
            }
            this.point.draw();
        }
        pointAdded() {
            this.point = Section_1.Section.create(this.context).random().draw();
        }
    }
    exports.PositionManager = PositionManager;
});
define("App", ["require", "exports", "Section", "PositionManager", "Snake"], function (require, exports, Section_2, PositionManager_1, Snake_1) {
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
            const section = Section_2.Section.create(context);
            const point = Section_2.Section.create(context)
                .random()
                .draw();
            const snake = new Snake_1.Snake();
            snake.add(section);
            const positionManager = new PositionManager_1.PositionManager(context, snake, point);
        }
    }
    /**
     * @type {number}
     */
    App.width = 400;
    /**
     * @type {number}
     */
    App.height = 400;
    /**
     * @type {number}
     */
    App.step = 20;
    exports.App = App;
});
define("main", ["require", "exports", "App"], function (require, exports, App_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Startup {
        static main() {
            const app = new App_3.App();
            app.run();
            return 0;
        }
    }
    Startup.main();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdm9sb2R5bXlyL3d3dy90ZXRyaXMvc3JjLyIsInNvdXJjZXMiOlsiU2VjdGlvbi50cyIsIlNuYWtlLnRzIiwiUG9zaXRpb25NYW5hZ2VyLnRzIiwiQXBwLnRzIiwibWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQWFJLFlBQXNCLE9BQWlDO1lBQWpDLFlBQU8sR0FBUCxPQUFPLENBQTBCO1lBUDdDLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztZQUNOLE1BQUMsR0FBRyxDQUFDLENBQUM7WUFDTixVQUFLLEdBQVcsU0FBUyxDQUFDO1lBQzFCLGNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBRzdDLENBQUM7UUFFTSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQWlDO1lBQ2xELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVNLElBQUk7WUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRU0sTUFBTTtZQUNULE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFO2dCQUM5RSxPQUFPLENBQUMsR0FBRyxTQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3hC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