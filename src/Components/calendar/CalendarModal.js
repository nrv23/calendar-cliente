import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch,useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { addNewEvent, cleanActiveEvent,updateEvent } from '../../actions/calendar';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
  
Modal.setAppElement('#root');



const now = moment().minutes(0).seconds(0).add(1,'hours');
const endF = now.clone().add(1,'hours'); //clonar la misma instancia de la fecha now y sumarle una hora

const initialEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endF.toDate()
};

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(endF.toDate());
    const [titleValid, setTitleValid] = useState(true);
    const [formValues, setFormValues] = useState(initialEvent);

    const { title, notes, start, end } = formValues;

    const dispatch= useDispatch();

    useEffect(() => {

        if(activeEvent) {
            setFormValues(activeEvent);
        }

    },[activeEvent,setFormValues])


    const handleStartDateChange = e => {
        setDateStart(e); 
        setFormValues({
            ...formValues,
            start: e
        }) 
    }

    const handleEndDateChange = e => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    
    const closeModal = () => {

        console.log("cerrando");
        dispatch(uiCloseModal())
        dispatch(cleanActiveEvent())
        setFormValues(initialEvent)
    }

    const handleInputChange = ({target:{name,value}}) => {
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = e => {

        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);
        
        if(momentStart.isSameOrAfter(momentEnd)) { // si es igual o mayor a la fecha final No debe dejar pasar la vlaidación
            Swal.fire('Error','La fecha final debe ser mayor a la fecha inicial','warning');
            return;
        }

        if(title.trim().length < 5) {
            setTitleValid(false);
            return;
        } 
        if(!activeEvent) { // debe existir un evento actual para saber que se va actualizar, de lo contrario se va agregar uno
            //nuevo
            dispatch(addNewEvent({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: "Nataniel"
                }
            }));
           
        } else {

            dispatch(updateEvent(formValues));
          
        }

        setTitleValid(true);
        closeModal();
    }


    return (
        <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        
        <h1> Nuevo evento </h1>
    <hr />
    <form 
        className="container"
        onSubmit={handleSubmit}
    >

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker 
            onChange={handleStartDateChange}
            value= {dateStart}
            className="form-control"
        />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker 
            onChange={handleEndDateChange}
            value= {dateEnd}
            className="form-control"
            minDate={dateStart}
        />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${!titleValid? 'is-invalid':''} `}
            placeholder="Título del evento"
            name="title"
            onChange={handleInputChange}
            autoComplete="off"
            value={title}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            onChange={handleInputChange}
            value={notes}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
        
      </Modal>
    )
}
