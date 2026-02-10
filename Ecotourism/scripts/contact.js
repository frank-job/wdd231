
    const contactForm = document.getElementById('contactForm');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('successMessage');
    const userDataDisplay = document.getElementById('userDataDisplay');
    const displaySubject = document.getElementById('displaySubject');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

       
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString()
        };

      
        localStorage.setItem('lastInquiry', JSON.stringify(formData));

      
        const savedData = JSON.parse(localStorage.getItem('lastInquiry'));

       
        if (savedData) {
        
            displaySubject.innerText = savedData.subject;
            
            userDataDisplay.innerHTML = `
                <p><strong>Name:</strong> ${savedData.name}</p>
                <p><strong>Email:</strong> ${savedData.email}</p>
                <p><strong>Message:</strong> ${savedData.message}</p>
                <hr style="border: 0.5px solid #ccc; margin: 10px 0;">
                <small>Submitted on: ${savedData.date}</small>
            `;

            
            formContainer.style.display = 'none';
            successMessage.style.display = 'block';
        }
    });
