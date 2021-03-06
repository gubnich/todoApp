import * as _ from "lodash";

import {
    TodosActions,
    GET_TODOS_SUCCESS,
    FULFIL_TODO_TOGGLE,
    ADD_TODO,
    REMOVE_TODO
} from "./todos.actions";
import { TodoItem } from "../../models/index";
import { State } from "./todos.models";

export const initialState: State = {
    counter: 0,
    data: []
};

export function todoReducer(state: State = initialState, action: TodosActions) {
    switch (action.type) {
        case GET_TODOS_SUCCESS:
            return _.assign({
                // @ts-ignore
                counter: action.payload.counter,
                // @ts-ignore
                data: [...action.payload.data]
            });
        case ADD_TODO:
            const newId: number = state.counter + 1;
            const newTodo: TodoItem = {
                id: newId,
                // @ts-ignore
                text: action.payload,
                isDone: false
            };
            return _.assign(state, {
                counter: newId,
                data: [...state.data, newTodo]
            });
        case FULFIL_TODO_TOGGLE:
            const isDoneProp = state.data.find(
                // @ts-ignore
                item => item.id === action.payload
            );
            isDoneProp.isDone = !isDoneProp.isDone;
            return _.assign(state, {
                data: [...state.data]
            });
        case REMOVE_TODO:
            const pickedTodoIndex = state.data.findIndex(
                // @ts-ignore
                item => item.id === action.payload
            );
            state.data.splice(pickedTodoIndex, 1);
            return _.assign(state, {
                data: [...state.data]
            });
        default:
            return state;
    }
}
