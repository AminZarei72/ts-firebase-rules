
/* ---------------------------------- */
/* ---------------------------------- */
export type tables = 'todos' | 'users' 
export type T=tables
/* ---------------------------------- */
export type allStatus_todo = 'waiting' | 'done' | 'delayed' 
/* ---------------------------------- */
export type create_todo = {
    status: 'waiting',
    title: string,
    comments: string,
    createdBy: string,
}
/* ---------------------------------- */
export type read_todo = {
    status: allStatus_todo,
    title: string,
    comments: string,
    createdBy: string,
}
/* ---------------------------------- */
export type update_todo_creator = {
    status: allStatus_todo,
    title: string,
    comments: string,
    createdBy: string,
}
/* ---------------------------------- */
export type update_todo_user = {
    status: 'done',
    title: string,
    comments: string,
    createdBy: string,
}
/* ---------------------------------- */
