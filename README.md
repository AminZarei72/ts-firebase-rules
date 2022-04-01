


![TSFR](https://user-images.githubusercontent.com/)
 
 
TSFR is the lost peace of firebase ".rules" files .   
with TSFR you can use power of typescript to overcome firebase rules-engine limitations and scale your app so much easier without worring about your app crashes just for simple typo errors and also better managing/debugging with spliting the .rules file into smaller files. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Features](#features)
- [Quick Start](#quick-start)
- [basic example](#basic-example)
- [Notes](#notes)
- [Author](#author)
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- type-checking
    - catch bugs on-the-fly 
- Cli 
    - a good cli always makes our life easier (e.g: create, watch, ...)
- Live reload / watch-mode 
    - `npx tsfr watch`
- import/export
    - split your project into smaller peaces and have better debugging
- additional helper types and functions
    - TSFR comes with helpers ,you can import them and use them 
- write additional native modules
    - you can write additinal native helper functions or use other people functions
- _globalVariables_ 
    - e.g: can be used as Configs that are going to be used in many functions ...


## Quick Start

```bash
npm i -D ts-firebase-rules
npx tsfr create
#use npx tsfr create --help for more complex commands
```
this will ask you to choose a template and that's it. Just `cd` to `tsfr` folder , run build or watch command and start editing `tsfr/index.ts`!

```bash
cd tsfr
npx tsfr watch
#npx tsfr build
```

## basic-example
 lets create a simple todo list:
```ts
//index.ts
import { setRuleStructure } from 'ts-firebase-rules'
import { create_todo, update_todo, read_todo } from './functions/todos'

setRuleStructure(() => ({
    'todos': (id) => ({
        create: create_todo(id),
        //other fns e.g update ...
    }),
}))
```
```ts
//functions/todos.ts
import { FrString, request, isString, getReq,  FrBoolean} from "ts-firebase-rules" 

import * as mt from '../../modelsTypes'
export function create_todo(id: FrString): FrBoolean {
    const reqData = getReq<mt.create_todo>()
    return (
        request.auth != null && // user has logged in 
        reqData.createdBy === request.auth.uid &&  
        isString(reqData.comments) && 
        titleIsValid(reqData.title)
    )
} 
```
```ts
//functions/helpers.ts
import { _globalVariables_ } from "../_globalVariables_" 
export function titleIsValid(title: FrString): FrBoolean {
    return (
        title.matches('[A-Za-z][A-Za-z0-9]') &&
        title.size() >= _globalVariables_.minimumCharsInTitle &&
        title.size() <= _globalVariables_.maximumCharsInTitle)
}

```
compiles to:
```js
match /groups/{id} {
    allow create: if create_groups(id);
    ...
}

//other imported functions will get compiled here 
function create_todo(id) {
    let reqData = getReq();
    return (request.auth != null &&
        titleIsValid(reqData.title) &&
        reqData.createdBy == request.auth.uid &&
        isString(reqData.comments) && 
        );
}

function titleIsValid(title) {
        return (title.matches('[A-Za-z][A-Za-z0-9]') &&
            title.size() >= minimumCharsInTitle()  &&
            title.size() <= maximumCharsInTitle() );
} 
```
## Notes

⚠️ `*Note:this project is still in its first days ,personally i used this for some of my projects(on production) and so far there have been no problem but we use multiple compiler and transitions so unexpected bugs might happen ,so (for now) you should check the final file and do the testing*`

Note: we still going to have Firebase rules language limitations like lack of Loops and etc
so make sure you have read their documentions

 ✨✨✨✨✨✨

## Author

- [amin zarei](https://github.com/aminZarei72)
    - aminzarei.work@gmail.com

## License
[MIT](https://github.com/aminZarei72)

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
 