document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const bookingData = {
                patient_name: name,
                patient_age: age,
                patient_gender: gender,
                patient_phone: phoneNumber,
                patient_disease: disease,
                vaccine_name: selectedVaccine,    // must match vaccine_name column
                doctor: selectedDoctor,           // must match 'doctor' in PHP
                date_time: selectedAvailability
            };

            console.log("Sending booking data:", bookingData);

            try {
                const response = await fetch('storeappointments.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(bookingData)
                });

                const text = await response.text();
                console.log('Raw response:', text);

                const result = JSON.parse(text);

                if (result.success) {
                    alert(`Appointment Confirmed! Vaccine: ${bookingData.vaccine_name} at ${bookingData.hospital_add}`);
                    sessionStorage.removeItem('appointmentFormData');
                    sessionStorage.removeItem('selectedVaccine');
                    appointmentForm.reset();
                } else {
                    alert(`Booking Failed: ${result.message || 'Unknown server error'}`);
                }
            } catch (error) {
                console.error('Error submitting appointment:', error);
                alert('Server connection failed. Try again.');
            }
        });
    }
});
