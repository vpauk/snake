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
            const section = Section_2.Section.create(context);
            const point = Section_2.Section.create(context)
                .random()
                .draw();
            const snake = new Snake_1.Snake();
            snake.add(section);
            const positionManager = new PositionManager_1.PositionManager(context, snake, section, point);
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