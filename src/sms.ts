function sendSms(phoneNumber1: string, phoneNumber2: string, message: string) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "App 822b8f5865c25d3f1fb8f3dd64777340-ddcc01d8-2fc5-4056-8ec8-6cbc0074348f");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
  
    const raw = JSON.stringify({
      "messages": [
        {
          "destinations": [
            {"to": phoneNumber1},
            {"to": phoneNumber2}
          ],
          "from": "ServiceSMS",
          "text": message
        }
      ]
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
  
    fetch("https://9l68r3.api.infobip.com/sms/2/text/advanced", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  
  // Exemple d'utilisation
//   sendSms("221777131720", "221778133537", "Bonjour mon pere ceci est un teste pour mon message.");
  