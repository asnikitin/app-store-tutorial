/**
 * создает редюсер для указаного типа.
 * Aвтоматически объединяет со state
 *
 * @param {string} type - тип для редисера
 * @param {callback} callback -  редюсер
 * @returns {Reducer} reducer
 * @example
 * createReducer('Foo event', () => { foo: 'bar'});
 */
export function createReducer(type, callback) {
  return (state, action) => {
    if (!action || !action.type) {
      throw new Error('Action should have type');
    }
    if (action.type === type) {
      return {
        ...state,
        ...callback(state, action),
      };
    }
    return state;
  };
}

/**
 * Cоздает  корневой редюсер из массива редюсеров
 *
 * @param {Array<Reducer>} reducers - массив функций редюсеров
 * @param {State} initialState -  первоначальное состояние для редьсера
 * @returns {Reducer} reducer
 */
export function mergeReducers(reducers, initialState) {
  return (state = initialState, action) => {
    if (reducers.length) {
      return reducers.reduce((nextState, callback) => callback(nextState, action), state);
    }
    return state;
  };
}
