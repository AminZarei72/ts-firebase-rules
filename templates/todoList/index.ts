/* ----------------------------------------------- */
import { setRuleStructure } from 'ts-firebase-rules'
import { create_todo } from './functions/todos'
/* ----------------------------------------------- */
/* export functions here_ */
export * from './functions/todos'
/* ----------------------------------------------- */
setRuleStructure(() => ({
    'todos': (id) => ({
        create: create_todo(id),
    }),
}))
/* ----------------------------------------------- */
