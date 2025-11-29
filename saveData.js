document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const age = parseInt(document.getElementById('age').value.trim(), 10);
            const gender = document.getElementById('gender').value;
            const phoneNumber = document.getElementById('phone-number').value.trim();
            const disease = document.getElementById('disease').value.trim();
            const selectedVaccine = document.getElementById('selected-vaccine').value.trim();
            const selectedManufacturer = document.getElementById('selected-manufacturer').value.trim();
            const selectedDoctor = document.getElementById('selected-doctor').value.trim();
            const selectedHospital = document.getElementById('selected-hospital').value.trim();
            const selectedAvailability = document.getElementById('selected-availability').value.trim();

            // Validation
            if (!name || !gender || !phoneNumber || !selectedAvailability) {
                alert('Please fill out all required fields (Name, Gender, Phone Number, Availability).');
                return;
            }

            if (isNaN(age) || age < 0 || age > 150) {
                alert('Please enter a valid age between 0 and 150.');
                return;
            }

            if (!/^\d{10}$/.test(phoneNumber)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            if (!selectedVaccine || !selectedDoctor || !selectedHospital) {
                alert('Please select a vaccine, doctor, and hospital.');
                return;
            }

            // Validate date_time (selectedAvailability) as text
            if (selectedAvailability.length > 255) {
                alert('Availability text is too long (max 255 characters).');
                return;
            }

            const bookingData = {
                patient_name: name,
                patient_age: age,
                patient_gender: gender,
                patient_phone: phoneNumber,
                patient_disease: disease,
                vaccine_name: selectedVaccine,
                manufacturer: selectedManufacturer,
                doctor: selectedDoctor,
                hospital_address: selectedHospital,
                date_time: selectedAvailability // Treat as plain text
            };

            console.log("Sending booking data:", bookingData);

            try {
                const response = await fetch('storeappointments.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bookingData)
                });

                const text = await response.text();
                console.log('Raw response:', text);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = JSON.parse(text);

                if (result.success) {
                    alert(`Appointment Confirmed! You are booked for: ${bookingData.vaccine_name} at ${bookingData.hospital_address}.`);
                    sessionStorage.removeItem('appointmentFormData');
                    sessionStorage.removeItem('selectedVaccineData');
                    appointmentForm.reset();
                } else {
                    alert(`Booking Failed: ${result.message || 'An unknown server error occurred.'}`);
                }
            } catch (error) {
                console.error('Error submitting appointment:', error);
                alert('There was a problem connecting to the server. Please try again.');
            }
        });
    }
});