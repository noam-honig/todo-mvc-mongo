import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";
import { MongoDataProvider } from "remult/remult-mongo";
import { MongoClient } from "mongodb";

export const api = remultExpress({
    dataProvider: async () => {
        const client = new MongoClient("mongodb://localhost:27017/local");
        await client.connect();
        return new MongoDataProvider(client.db("todo"), client);
    },
    entities: [Task],
    controllers: [TasksController],
    initApi: async remult => {
        const taskRepo = remult.repo(Task);
        if (await taskRepo.count() === 0) {
            await taskRepo.insert([
                { id: 'a', title: "Setup", completed: true },
                { id: 'b', title: "Entities", completed: false },
                { id: 'c', title: "Paging, Sorting and Filtering", completed: false },
                { id: 'd', title: "CRUD Operations", completed: false },
                { id: 'e', title: "Validation", completed: false },
                { id: 'f', title: "Backend methods", completed: false },
                { id: 'g', title: "Database", completed: false },
                { id: 'h', title: "Authentication and Authorization", completed: false },
                { id: 'i', title: "Deployment", completed: false }
            ]);
        }
    }
})