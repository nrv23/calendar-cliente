import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch,useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { setActiveEvent } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
moment.locale('es'); // cambiar a español
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || 'month');
    const dispatch= useDispatch();

    const { events } = useSelector(state => state.calendar)

    const onDoubleCLick = e => {
        console.log(e);
        console.log("abirnedo modla")
       // dispatch(uiOpenModal())
    }


    const onSelectEvent = e => {
        
        dispatch( setActiveEvent(e));
        dispatch(uiOpenModal());
    }

    const onViewChange = e => {
        setLastView(e);
        localStorage.setItem("lastView",e);
    }

    const eventStyleGetter = (event,start,end,isSelected) => {

        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }
    
    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleCLick}
                onSelectEvent={onSelectEvent}
                view={lastView} //implementar el campo de lastView en el componente
                onView= {onViewChange} // alcambiar ls opciones de la agenda, mes, dia, semana, agenda
                components= {{ // envia un evento como prop
                    event: CalendarEvent //cargar un componente personalizado para mostrar datos del evento
                }}
                />

                <AddNewFab /> {/* Boton flotante */}

                <CalendarModal />
        </div>
    )
}
