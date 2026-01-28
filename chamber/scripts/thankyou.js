
      
        const currentUrl = window.location.href;

      
        const everything = currentUrl.split('?');

     
        if (everything.length > 1) {
            const formData = everything[1].split('&');

            const showInfo = document.querySelector('#results');

            function show(cup) {
                formData.forEach((element) => {
                    if (element.startsWith(cup)) {
                      
                        let result = element.split('=')[1].replace(/%40/g, "@").replace(/\+/g, " ").replace(/%3A/g, ":");
                        
                   
                        let item = document.createElement('p');
                        item.innerHTML = `<strong>${cup}:</strong> ${result}`;
                        showInfo.appendChild(item);
                    }
                });
            }

           
            show("firstName");
            show("lastName");
            show("email");
            show("mobilePhone");
            show("businessName");
            show("timestamp");
        }
  

  document.getElementById('timestamp').value = new Date().toLocaleString();