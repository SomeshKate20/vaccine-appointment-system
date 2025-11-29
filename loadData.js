
document.addEventListener('DOMContentLoaded', () => {

    const savedDataJSON = sessionStorage.getItem('appointmentFormData');

    if (savedDataJSON) {

        const savedData = JSON.parse(savedDataJSON);

        document.getElementById('name').value = savedData.name || '';
        document.getElementById('age').value = savedData.age || '';

        const genderSelect = document.getElementById('gender');
        if (genderSelect && savedData.gender) {
            genderSelect.value = savedData.gender;
        }

        document.getElementById('disease').value = savedData.disease || '';
        document.getElementById('phone-number').value = savedData.phone || '';


    }

    const savedVaccineDataJSON = sessionStorage.getItem('selectedVaccine');

    if (savedVaccineDataJSON) {
        const savedVaccineData = JSON.parse(savedVaccineDataJSON);

        document.getElementById('selected-vaccine').value = savedVaccineData.vaccineName || '';
        document.getElementById('selected-manufacturer').value = savedVaccineData.manufacturer || '';
        document.getElementById('selected-doctor').value = savedVaccineData.doctor || '';
        document.getElementById('selected-hospital').value = savedVaccineData.hospitalAddress || '';
        document.getElementById('selected-availability').value = savedVaccineData.availability || '';


    }
});