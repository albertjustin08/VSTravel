document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('travelForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    const fullName = document.getElementById('fullName');
    const phoneNumber = document.getElementById('phoneNumber');
    const departureDate = document.getElementById('departureDate');
    const returnDate = document.getElementById('returnDate');
    const participants = document.getElementById('participants');

    const errorFullName = document.getElementById('errorFullName');
    const errorPhoneNumber = document.getElementById('errorPhoneNumber');
    const errorDepartureDate = document.getElementById('errorDepartureDate');
    const errorReturnDate = document.getElementById('errorReturnDate');
    const errorParticipants = document.getElementById('errorParticipants');

    [errorFullName, errorPhoneNumber, errorDepartureDate, errorReturnDate, errorParticipants]
      .forEach(el => el.textContent = '');

    if (!fullName.value.trim()) {
      errorFullName.textContent = 'Full Name is required';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneNumber.value.trim()) {
      errorPhoneNumber.textContent = 'Phone Number is required';
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber.value)) {
      errorPhoneNumber.textContent = 'Phone Number must be 10-15 digits';
      isValid = false;
    }

    if (!departureDate.value) {
      errorDepartureDate.textContent = 'Departure Date is required';
      isValid = false;
    }

    if (!returnDate.value) {
      errorReturnDate.textContent = 'Return Date is required';
      isValid = false;
    } else if (departureDate.value && returnDate.value < departureDate.value) {
      errorReturnDate.textContent = 'Return Date must be after Departure Date';
      isValid = false;
    }

    if (!participants.value) {
      errorParticipants.textContent = 'Total Participants is required';
      isValid = false;
    } else if (parseInt(participants.value) < 1) {
      errorParticipants.textContent = 'At least 1 participant is required';
      isValid = false;
    }

    if (isValid) {
      alert('Form submitted successfully!');
      form.reset();
    }
  });
});
