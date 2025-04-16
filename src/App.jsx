import { useState } from "react";
import { v4 } from "uuid";
import { MdDelete } from "react-icons/md";
import "./App.css"
const appointmentOptions = [
  { id: "apt_2001", value: "Medical Consultation" },
  { id: "apt_2002", value: "Dental Appointment" },
  { id: "apt_2004", value: "Financial Advisor Meeting" },
  { id: "apt_2005", value: "Career Coaching" },
  { id: "apt_2006", value: "Job Interview" },
  { id: "apt_2007", value: "Performance Review" },
  { id: "apt_2008", value: "Training Session" },
  { id: "apt_2010", value: "Strategy Session" },
  { id: "apt_2011", value: "Project Planning Session" },
  { id: "apt_2012", value: "Feedback Session" }
];


const App = () => {
  const [appointment, setAppointment] = useState("")
  const [date, setDate] = useState("")
  const initialAppointments = JSON.parse(localStorage.getItem("appointments")) || []
  const [appointments, setAppointments] = useState(initialAppointments)
  const [isStarred,setIsStarred]=useState(false)

  const handleAppointment = (event) => {
    setAppointment(event.target.value)

  }

  const handleDate = (event) => {
    setDate(event.target.value)
  }

  const handleAddAppointment = (event) => {
    event.preventDefault()
    if (appointment && date) {
      const newAppointment = {
        id: v4(),
        text: appointment,
        date,
        isStared: false
      }
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      setAppointment("")
      setDate("")

    }
  }

  const handleStar = (id) => {
    const updated = appointments.map(each => {
      if (each.id === id) {
        return { ...each, isStared: !each.isStared }
      }
      return each
    })
    setAppointments(updated)
    localStorage.setItem("appointments", JSON.stringify(updated))
  }
  const getStaredAppointments = () => {
    const nextStarredState=!isStarred
    setIsStarred(nextStarredState)
    const filteredAppointments =nextStarredState? appointments.filter(each => each.isStared):JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(filteredAppointments)
  }

  const handleDelete=(id)=>{
    const filteredAppointments=appointments.filter(each=>each.id!==id)
    setAppointments(filteredAppointments)
    localStorage.setItem("appointments",JSON.stringify(filteredAppointments))
  }

  

  return (
    <div className="app-container">
      <div className="card-container">
        <div className="container">
          <div className="input-container">
            <h1 className="heading-1">Add Appointment</h1>
            <form onSubmit={handleAddAppointment} >
              <div className="input-wrapper">
                <input onChange={handleAppointment} value={appointment} list="options" required id="title" type="text" />
                <label htmlFor="title">Appointment Purpose</label>
                <datalist id="options">
                  {appointmentOptions.map(each => (
                    <option key={each.id} value={each.value}></option>
                  ))}
                </datalist>
              </div>
              <div className="input-wrapper">
                <input onChange={handleDate} value={date} placeholder="" id="date" required type="date" />
              </div>
              <button className="add-btn" type="submit">Add</button>
            </form>
          </div>
          <div className="img-container">
            <img src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png" alt="appointment" />
          </div>
        </div>
        <hr />
        <div className="flex-container">
          <h1 className="heading-1 heading">Appointments</h1>
          <button onClick={getStaredAppointments} className="add-btn starred-btn">
           {isStarred?"All":'starred'}
          </button>
        </div>
        <div className="grid-container">
          {appointments.length===0?(<div className="no-data">
            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Ya4MRCW_R4hJbHpW6qfzgAHaFj%26pid%3DApi&f=1&ipt=224d00f94d2621039ba219b7a27bb804929c86d4388462b57a2e766d7788e5fd&ipo=images" alt="" />
            <h1>Looks like you have no scheduled appointments. Create one now</h1>
          </div>):(appointments.map(each => (
            <div className="data-container" key={each.id}>
              <div className="flex-container"><h1 className="appointment">{each.text}</h1>
                <button onClick={() => handleStar(each.id)} className="star-icon"><img src={each.isStared ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png" : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'} alt="star" /></button>
              </div>
              <div className="flex-container">
                <p className="date">{new Date(each.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: "long",
                  year: "numeric",
                  weekday: "long"
                })}</p>
                <button onClick={()=>handleDelete(each.id)} className="star-icon"><MdDelete size={25}  /></button>
              </div>

            </div>
          )))}
        </div>
      </div>
    </div>
  )
}
export default App