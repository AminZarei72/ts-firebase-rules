"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("tmp/e2e1Files/prj1/tsfrPrj/functions/todos/create_todo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create_todo = void 0;
    function create_todo(id) {
        return true;
    }
    exports.create_todo = create_todo;
});
define("tmp/e2e1Files/prj1/tsfrPrj/functions/todos/index", ["require", "exports", "tmp/e2e1Files/prj1/tsfrPrj/functions/todos/create_todo"], function (require, exports, create_todo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(create_todo_1, exports);
});
define("tmp/e2e1Files/prj1/tsfrPrj/index", ["require", "exports", "tmp/e2e1Files/prj1/tsfrPrj/functions/todos/index"], function (require, exports, todos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(todos_1, exports);
});
