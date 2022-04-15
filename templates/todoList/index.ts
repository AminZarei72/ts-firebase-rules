/* ----------------------------------------------- */
import { setRuleStructure } from 'ts-firebase-rules'
import { create_todo, update_todo, get_todo, list_todo } from './functions/todos'
/* ----------------------------------------------- */
setRuleStructure(() => ({
    'todos': (id) => ({
        create: create_todo(id),
        update: update_todo(id),
        get: get_todo(id),
        list: list_todo(),
    }),
}))
/* ----------------------------------------------- */
