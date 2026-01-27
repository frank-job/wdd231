
        // 1. Grab the current URL
        const currentUrl = window.location.href;

        // 2. Split the URL into parts
        const everything = currentUrl.split('?');

        // 3. Grab just the data part (if it exists)
        if (everything.length > 1) {
            const formData = everything[1].split('&');

            const showInfo = document.querySelector('#results');

            function show(cup) {
                formData.forEach((element) => {
                    if (element.startsWith(cup)) {
                        // Clean up the text (remove %20, +, etc)
                        let result = element.split('=')[1].replace(/%40/g, "@").replace(/\+/g, " ").replace(/%3A/g, ":");
                        
                        // Create HTML
                        let item = document.createElement('p');
                        item.innerHTML = `<strong>${cup}:</strong> ${result}`;
                        showInfo.appendChild(item);
                    }
                });
            }

            // Call the function for the specific fields required
            show("firstName");
            show("lastName");
            show("email");
            show("mobilePhone");
            show("businessName");
            show("timestamp");
        }
  