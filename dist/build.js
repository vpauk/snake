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
            this.draw();
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
define("PositionManager", ["require", "exports", "Section", "App"], function (require, exports, Section_1, App_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PositionManager {
        constructor(context, snake, section, point) {
            this.context = context;
            this.snake = snake;
            this.section = section;
            this.point = point;
            this.onKeyDown();
            setInterval(() => {
                this.move();
            }, 500);
        }
        up() {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getY() - App_2.App.step;
                if (item.getY() - App_2.App.step === this.point.getY() && item.getX() === this.point.getX()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setY(clonePoint.getY() - App_2.App.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setY(nextPosition);
                item.draw();
            }
        }
        down() {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getY() + App_2.App.step;
                if (item.getY() + App_2.App.step === this.point.getY() && item.getX() === this.point.getX()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setY(clonePoint.getY() + App_2.App.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setY(nextPosition);
                item.draw();
            }
        }
        left() {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getX() - App_2.App.step;
                if (item.getX() - App_2.App.step === this.point.getX() && item.getY() === this.point.getY()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setX(clonePoint.getX() - App_2.App.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setX(nextPosition);
                item.draw();
            }
        }
        right() {
            this.context.clearRect(0, 0, App_2.App.width, App_2.App.height);
            const list = this.snake.getList().slice(0);
            for (let item of list) {
                let nextPosition = item.getX() + App_2.App.step;
                if (item.getX() + App_2.App.step === this.point.getX() && item.getY() === this.point.getY()) {
                    let clonePoint = Object.assign(new Section_1.Section(this.context), this.point);
                    clonePoint.setX(clonePoint.getX() + App_2.App.step);
                    clonePoint.draw();
                    this.snake.add(clonePoint);
                    this.pointAdded();
                }
                item.setX(nextPosition);
                item.draw();
            }
        }
        onKeyDown() {
            document.onkeydown = (event) => {
                switch (event.key) {
                    case "ArrowDown":
                        this.section.setDirection(Section_1.Section.DIRECTION_DOWN);
                        break;
                    case "ArrowUp":
                        this.section.setDirection(Section_1.Section.DIRECTION_UP);
                        break;
                    case "ArrowLeft":
                        this.section.setDirection(Section_1.Section.DIRECTION_LEFT);
                        break;
                    case "ArrowRight":
                        this.section.setDirection(Section_1.Section.DIRECTION_RIGHT);
                        break;
                    default:
                        return;
                }
            };
        }
        move() {
            if (this.section.getDirection() === Section_1.Section.DIRECTION_UP) {
                this.up();
            }
            else if (this.section.getDirection() === Section_1.Section.DIRECTION_DOWN) {
                this.down();
            }
            else if (this.section.getDirection() === Section_1.Section.DIRECTION_LEFT) {
                this.left();
            }
            else if (this.section.getDirection() === Section_1.Section.DIRECTION_RIGHT) {
                this.right();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdm9sb2R5bXlyL3d3dy90ZXRyaXMvc3JjLyIsInNvdXJjZXMiOlsiU2VjdGlvbi50cyIsIlNuYWtlLnRzIiwiUG9zaXRpb25NYW5hZ2VyLnRzIiwiQXBwLnRzIiwibWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQWFJLFlBQXNCLE9BQWlDO1lBQWpDLFlBQU8sR0FBUCxPQUFPLENBQTBCO1lBUDdDLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztZQUNOLE1BQUMsR0FBRyxDQUFDLENBQUM7WUFDTixVQUFLLEdBQVcsU0FBUyxDQUFDO1lBQzFCLGNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBR3pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFpQztZQUNsRCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFFTSxJQUFJO1lBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVNLE1BQU07WUFDVCxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRTtnQkFDOUUsT0FBTyxDQUFD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