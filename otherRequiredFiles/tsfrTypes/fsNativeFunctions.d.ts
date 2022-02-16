/* ---------------------------------------- */
type fns =
    'create' |
    'update' |
    'get' |
    'delete' |
    'list' |
    'read' |
    'write';
type mainFns = { [targetPatsh in fns]: boolean; };
export type RuleStructure = () => {
    [
    /**  users_private will compile to match /users_private/ */
    targetPath: string
    ]: (id: string) => Partial<mainFns>
}
export const setRuleStructure: (ruleStructure: RuleStructure) => void
/* ---------------------------------------- */
