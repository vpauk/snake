import {App} from "./App";

class Startup {
    public static main(): number {
        const app = new App();
        app.run()

        return 0;
    }
}

Startup.main();