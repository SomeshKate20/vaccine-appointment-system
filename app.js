class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">Please reload the page.</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg">Reload Page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function Header({ doctorName }) {
   try {
    return (
      <header className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] shadow-lg" data-name="header">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Left Side */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <div className="icon-user-round-check text-3xl text-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome, Dr. {doctorName}</h1>
                <p className="text-blue-100 mt-1">Appointment Dashboard</p>
              </div>
            </div>

            {/* Right Side - Date + Logout */}
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-white flex items-center">
                <div className="icon-calendar-check text-xl mr-2"></div>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>

              {/* 🚪 Logout Button */}
              <a href="login.html" className="px-4 py-2 bg-white  bg-opacity-20 text-white rounded-lg flex items-center space-x-2">
                <div className="icon-log-out text-lg"></div>
                <span>Logout</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}

function StatsCards({ appointments }) {
  try {
    const totalAppointments = appointments.length;
  

    const malePatients = appointments.filter(a => a.patient_gender.toLowerCase() === 'male').length;
    const femalePatients = appointments.filter(a => a.patient_gender.toLowerCase() === 'female').length;
    const stats = [
      { label: 'Total Appointments', value: totalAppointments, icon: 'calendar-check', bgLight: 'bg-blue-50', iconColor: 'text-blue-500' },
      { label: 'Male Patients', value: malePatients, icon: 'user', bgLight: 'bg-green-50', iconColor: 'text-green-500' },
      { label: 'Female Patients', value: femalePatients, icon: 'user', bgLight: 'bg-purple-50', iconColor: 'text-purple-500' },
      { label: 'Vaccines', value: new Set(appointments.map(a => a.vaccine_name)).size, icon: 'syringe', bgLight: 'bg-orange-50', iconColor: 'text-orange-500' }
    ];
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8" data-name="stats-cards" data-file="app.js">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-lg ${stat.bgLight} flex items-center justify-center`}>
                <div className={`icon-${stat.icon} text-2xl ${stat.iconColor}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('StatsCards component error:', error);
    return null;
  }
}

function AppointmentCard({ appointment }) {
  try {
    const genderColor = appointment.patient_gender === 'Male' ? 'border-blue-500' : 'border-pink-500';
    return (
      <div className={`appointment-card ${genderColor}`} data-name="appointment-card" data-file="app.js">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start space-x-4 mb-4 lg:mb-0">
            <div className={`w-12 h-12 rounded-full ${appointment.patient_gender === 'Male' ? 'bg-blue-100' : 'bg-pink-100'} flex items-center justify-center flex-shrink-0`}>
              <div className={`icon-user text-xl ${appointment.patient_gender === 'Male' ? 'text-blue-600' : 'text-pink-600'}`}></div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800">{appointment.patient_name}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center"><div className="icon-cake text-base mr-1 text-gray-600"></div>{appointment.patient_age} years</span>
                <span className="flex items-center"><div className="icon-phone text-base mr-1 text-gray-600"></div>{appointment.patient_phone}</span>
                <span className="flex items-center"><div className="icon-activity text-base mr-1 text-gray-600"></div>{appointment.patient_disease || 'N/A'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[var(--primary-color)] font-semibold">
            <div className="icon-clock text-xl"></div>
            <span>{appointment.date_time}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                <div className="icon-syringe text-base text-green-600"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Vaccine</p>
                <p className="font-semibold text-gray-800">{appointment.vaccine_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                <div className="icon-building text-base text-purple-600"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Manufacturer</p>
                <p className="font-semibold text-gray-800">{appointment.manufacturer || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center">
                <div className="icon-map-pin text-base text-orange-600"></div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-semibold text-gray-800">{appointment.hospital_add || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AppointmentCard component error:', error);
    return null;
  }
}

function EmptyState() {
  try {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center" data-name="empty-state" data-file="app.js">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <div className="icon-calendar-x text-5xl text-gray-400"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Appointments Today</h3>
        <p className="text-gray-600 max-w-md mx-auto">You don't have any appointments scheduled for today. Enjoy your free time!</p>
      </div>
    );
  } catch (error) {
    console.error('EmptyState component error:', error);
    return null;
  }
}

function App() {
  try {
    const [appointments, setAppointments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [doctorName, setDoctorName] = React.useState('');

    React.useEffect(() => {
      if (window.doctorData) {
        setDoctorName(window.doctorData.name);
        setAppointments(window.doctorData.appointments);
        setLoading(false);
      }
    }, []);

    return (
      <div className="min-h-screen pb-12" data-name="app" data-file="app.js">
        <Header doctorName={doctorName} />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <StatsCards appointments={appointments} />
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="icon-calendar text-2xl text-[var(--primary-color)] mr-3"></div>
              
            Appointments
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
              </div>
            ) : appointments.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <AppointmentCard key={index} appointment={appointment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);