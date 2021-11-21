import { types } from "../types/types";
import moment from 'moment';


const initialState = {
    events : [ {
        id: new Date().getTime(),
        title: "Cumpleaños del jefe",
        start: moment().toDate(),
        end: moment().add(2,'hours').toDate(), // sumarle dos horas ala fecha final,
        bgcolor: '#fafafa',
        notes: "Comprar el paster",
        user: {
            _id: '123',
            name: "Nataniel"
        }
    }],
    activeEvent: null
};


export const calendarReducer = (state=initialState, action) =>  {

    switch(action.type) {

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events,action.payload]
            }
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.cleanActiveEvent:
            return {
                ...state,
                activeEvent: null
            }
        case types.updateEvent: 
            return {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
            }

        default:
            return state;
    }
}