import {
  Appointments
} from '@devexpress/dx-react-scheduler-material-ui'

export default function MeetingCard(props) {
  const Card = ({ children, style, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      data={data}
      style={{
        ...style,
        maxHeight: props && props.currentView === 'Month' ? 25 : null
      }}
    >
      {children}
    </Appointments.Appointment>
  )

  const Text = (textProps) => {
    const { data, style } = textProps
    return (
      <Appointments.AppointmentContent
        style={{
          ...style,
          color: data.color,
        }}
        {...textProps}
      />
    )
  }

  return (
    <Appointments appointmentComponent={Card} appointmentContentComponent={Text}/>
  )
}