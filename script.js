document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('travelForm');

    // Cek apakah form ada di halaman ini (menghindari error di halaman lain)
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;

        const fields = {
            fullName: document.getElementById('fullName'),
            phoneNumber: document.getElementById('phoneNumber'),
            departureDate: document.getElementById('departureDate'),
            returnDate: document.getElementById('returnDate'),
            participants: document.getElementById('participants')
        };

        const errors = {
            fullName: document.getElementById('errorFullName'),
            phoneNumber: document.getElementById('errorPhoneNumber'),
            departureDate: document.getElementById('errorDepartureDate'),
            returnDate: document.getElementById('errorReturnDate'),
            participants: document.getElementById('errorParticipants')
        };

        // Reset semua pesan error
        Object.values(errors).forEach(el => {
            if (el) el.textContent = '';
        });

        if (!fields.fullName.value.trim()) {
            errors.fullName.textContent = 'Full Name is required';
            isValid = false;
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        const phoneValue = fields.phoneNumber.value.trim();
        if (!phoneValue) {
            errors.phoneNumber.textContent = 'Phone Number is required';
            isValid = false;
        } else if (!phoneRegex.test(phoneValue)) {
            errors.phoneNumber.textContent = 'Phone Number must be 10-15 digits';
            isValid = false;
        }

        const today = new Date().toISOString().split('T')[0]; // Tanggal hari ini format YYYY-MM-DD
        if (!fields.departureDate.value) {
            errors.departureDate.textContent = 'Departure Date is required';
            isValid = false;
        } else if (fields.departureDate.value < today) {
            errors.departureDate.textContent = 'Departure Date cannot be in the past';
            isValid = false;
        }

        if (!fields.returnDate.value) {
            errors.returnDate.textContent = 'Return Date is required';
            isValid = false;
        } else if (fields.departureDate.value && fields.returnDate.value < fields.departureDate.value) {
            errors.returnDate.textContent = 'Return Date must be after Departure Date';
            isValid = false;
        }

        if (!fields.participants.value) {
            errors.participants.textContent = 'Total Participants is required';
            isValid = false;
        } else if (parseInt(fields.participants.value) < 1) {
            errors.participants.textContent = 'At least 1 participant is required';
            isValid = false;
        }

        if (isValid) {
            alert(`Success! Thank you, ${fields.fullName.value}. Your travel booking has been submitted.`);
            form.reset();
        }
    });
});