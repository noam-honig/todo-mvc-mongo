import { Allow, Entity, Fields, Validators } from "remult";

@Entity("tasks", {
    allowApiCrud:true// Allow.authenticated,
    //allowApiDelete:"admin"
})
export class Task {
    @Fields.uuid()
    id = '';
    @Fields.string<Task>({
        validate: task => {
            if (task.title.length < 5)
                throw "Too Short";
        }
    })
    title = '';
    @Fields.boolean()
    completed = false;
}