/* ----------------------------------------------- */
import { setRuleStructure } from 'ts-firebase-rules'
// import { setRuleStructure } from '../../tmp/e2e1Files/prj1/node_modules/ts-firebase-rules'
import { create_todo, update_todo, read_todo } from './functions/todos'
/* ----------------------------------------------- */
/* export functions here_ */
export * from './functions/todos'
/* ----------------------------------------------- */
setRuleStructure(() => ({
    'todos': (id) => ({
        create: create_todo(id),
        update: update_todo(id),
        read: read_todo(id),
    }),
}))
/* ----------------------------------------------- */
