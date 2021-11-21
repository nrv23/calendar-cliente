import { types } from "../types/types"


export const setActiveEvent = (event) => ({

    type: types.eventSetActive,
    payload: event
});

export const addNewEvent = (event) => ({

    type: types.eventAddNew,
    payload: event
});

export const cleanActiveEvent = () => ({

    type: types.cleanActiveEvent,

})

export const updateEvent = (event) => ({

    type: types.updateEvent,
    payload: event
})

