function saveEnquiry() {
    var saveFlag = 'SAVEENQUIRY';
    var name = document.getElementById('fullName').value.trim();
    var email = document.getElementById('emailId').value.trim();
    var phone = document.getElementById('mobileNo').value.trim();

    document.querySelectorAll(".error-message").forEach(el => el.innerHTML = '');
    document.querySelectorAll("#enquiryForm input").forEach(el => el.style.backgroundColor = '');

    var hasError = false;

    // Name validation
    if (name === '') {
        document.getElementById('nameError').innerHTML = 'Please enter your full name';
        document.getElementById('fullName').style.backgroundColor = '#ffcccc';
        hasError = true;
    }

    // Email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
        document.getElementById('emailError').innerHTML = 'Please enter a valid email address';
        document.getElementById('emailId').style.backgroundColor = '#ffcccc';
        hasError = true;
    }

    // Phone validation
    var phonePattern = /^[6-9]\d{9}$/;
    if (phone === '' || !phonePattern.test(phone)) {
        document.getElementById('phoneError').innerHTML = 'Enter a valid 10-digit number starting with 6-9';
        document.getElementById('mobileNo').style.backgroundColor = '#ffcccc';
        hasError = true;
    }

    if (hasError) {
        return;
    }

    var formData = new FormData();
    formData.append('saveFlag', saveFlag);
    formData.append('name', name);
    formData.append('email_id', email);
    formData.append('mobile_no', phone);

    $.ajax({
        url: "save_enquiry.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function () {
            var formHTML = document.querySelector('#exampleModal .modal-body').innerHTML;
            document.querySelector('#exampleModal .modal-body').innerHTML = `
                <div class="thank-you-message" style="text-align:center; padding: 40px;">
                    <h2>🎉 Thank You!</h2>
                    <p>Your enquiry has been submitted successfully.<br>We will get back to you soon.</p>
                    <button type="button" class="primary-btn3 btn-hover" data-bs-dismiss="modal">Close</button>
                </div>
            `;
            $('#exampleModal').one('hidden.bs.modal', function () {
                document.querySelector('#exampleModal .modal-body').innerHTML = formHTML;
            });
        },
        error: function () {
            alert("Error while saving enquiry.");
        }
    });
}
