document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('search-results-container'); 

    if (resultsContainer) {
        resultsContainer.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON' && event.target.textContent.trim() === 'Book') {
                const row = event.target.closest('tr');
                if (!row) return; 

                const cells = row.querySelectorAll('td');

                if (cells.length >= 8) { // 8 because we now have Book button at index 7
                    const selectedVaccineData = {
                        id: cells[0].textContent.trim(),
                        vaccineName: cells[1].textContent.trim(),
                        disease: cells[2].textContent.trim(),
                        manufacturer: cells[3].textContent.trim(),
                        doctor: cells[4].textContent.trim(),
                        hospitalAddress: cells[5].textContent.trim(),
                        availability: cells[6].textContent.trim()
                    };

                    sessionStorage.setItem('selectedVaccine', JSON.stringify(selectedVaccineData));
                    window.location.href = 'index.html'; 
                }
            }
        });
    }
});
