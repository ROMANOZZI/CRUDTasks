"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
require("dotenv/config");
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to DB
mongoose_1.default
    .connect(process.env.MONGO_DB_URL)
    .then(function () {
    console.log("Connected to database");
})
    .catch(function (err) {
    console.log("Not Connected to database", err);
});
// Schema
var schema = new mongoose_1.default.Schema({
    taskName: {
        type: String,
        required: true,
    },
    description: String,
    dueDate: Date,
    isCompleted: Boolean,
    tag: String,
});
var task = mongoose_1.default.model(process.env.COLLECTION_NAME, schema);
// Routes
// get all tasks
app.get("/tasks", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tasks, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task.find({})];
            case 1:
                tasks = _a.sent();
                res.status(200).send(tasks);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json({ message: err_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get task by id
app.get("/tasksbyId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var required, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task.find({ _id: req.body.id })];
            case 1:
                required = _a.sent();
                res.status(200).send(required);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(500).json({ message: err_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// add task
app.post("/addtask", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newTask, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newTask = new task({
                    taskName: req.body.taskName,
                    description: req.body.description,
                    dueDate: req.body.dueDate,
                    isCompleted: req.body.isCompleted,
                    tag: "",
                });
                return [4 /*yield*/, newTask.save()];
            case 1:
                _a.sent();
                res.status(200).send(newTask);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json({ message: err_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// update task
app.put("/updatetask", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task.updateOne({ _id: req.body._id }, {
                        taskName: req.body.taskName,
                        description: req.body.description,
                        dueDate: req.body.dueDate,
                        isCompleted: req.body.isCompleted,
                    })];
            case 1:
                updatedTask = _a.sent();
                res.status(200).send(updatedTask);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(500).json({ message: err_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put("/taskCompleted", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, task.updateOne({ _id: req.body.id }, { isCompleted: req.body.isCompleted })];
            case 1:
                updatedTask = _a.sent();
                res.status(200).send(updatedTask);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json({ message: err_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete task
// delete task
app.delete("/deletetask/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        task
            .findByIdAndDelete(JSON.parse(req.params.id).id)
            .exec()
            .then(function () {
            res.status(200).send(req.params.id + "  deleted successfully");
        })
            .catch(function (err) {
            res.status(500).json({ message: err.message });
        });
        return [2 /*return*/];
    });
}); });
app.put("/addtag", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedTask;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, task
                    .updateOne({
                    _id: req.body._id,
                }, {
                    tag: req.body.tag,
                })
                    .then(function (result) {
                    res.status(200).send(result);
                })
                    .catch(function (err) {
                    res.status(500).json({ message: err.message });
                })];
            case 1:
                updatedTask = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Start the server
app.listen(process.env.PORT_NUMBER, function () {
    return console.log("server is listening on ".concat(process.env.PORT_NUMBER));
});
