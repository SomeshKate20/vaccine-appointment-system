document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById("searchbutton");
    const resultsDiv = document.getElementById("search-results-container");

    searchButton.addEventListener("click", function() {
        const query = document.getElementById("vaccine").value.trim();
        if (!resultsDiv) return;

        let url = './search.php?query=' + encodeURIComponent(query);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.length) {
                    resultsDiv.innerHTML = "<p>No results found.</p>";
                    return;
                }

                let table = `<table id="vaccine-results-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vaccine Name</th>
                            <th>Disease Treated</th>
                            <th>Manufacturer</th>
                            <th>Doctor</th>
                            <th>Hospital Address</th>
                            <th>Availability</th>
                            <th>Apply</th>
                        </tr>
                    </thead>
                    <tbody>`;

                data.forEach(row => {
                    table += `<tr>
                        <td>${row.id}</td>
                        <td>${row.vaccine_name}</td>
                        <td>${row.disease || ''}</td>
                        <td>${row.manufacturer}</td>
                        <td>${row.doctor_name }</td>
                        <td>${row.hospital_add}</td>
                        <td>${row.available}</td>
                        <td><button class="book-btn">Book</button></td>
                    </tr>`;
                });

                table += `</tbody></table>`;
                resultsDiv.innerHTML = table;
            })
            .catch(err => {
                resultsDiv.innerHTML = `<p>Error fetching results: ${err.message}</p>`;
            });
    });
});
