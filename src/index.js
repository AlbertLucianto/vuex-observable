import { Subject } from 'rxjs/Subject'
import { ActionsObservable } from './ActionsObservable'

export function observableAction (init) {
  const input$ = new Subject()
  const action$ = new ActionsObservable(input$)

  let $output
  return function observableAction (context, payload) {
    if (!$output) {
      $output = init(action$, context)
    }
    input$.next(payload)
    return $output
  }
}

/**
 * 
 * @param { Array<Epic> } epics 
 */
export function createObservablePlugin (epics) {
  return store => {
    const action$ = new Subject();
    const commit = (action) => {
      store.commit(action);
      return action;
    }
    epics.forEach(epic => epic(action$, { store, commit }))

    store.subscribe((mutation, state) => {
      action$.next(mutation)
    })
  }
}