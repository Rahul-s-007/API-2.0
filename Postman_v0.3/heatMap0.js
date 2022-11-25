displayName();
     async function displayName()
    {
         const response = await fetch('./crime_report.json');
         const ciData = await response.json();
    document.getElementById("Violent crime").innerHTML = ciData['violent-crime'];
    document.getElementById("Public order").innerHTML = ciData['public-order'];
    document.getElementById("Anti-social behaviour").innerHTML = ciData['anti-social-behaviour'];
    document.getElementById("Criminal damage arson").innerHTML = ciData['criminal-damage-arson'];
    document.getElementById("other-theft").innerHTML = ciData['other-theft'];
    document.getElementById("Vehicle crime").innerHTML = ciData['vehicle-crime'];
    document.getElementById("Shoplifting").innerHTML = ciData['shoplifting'];
    document.getElementById("Robbery").innerHTML = ciData['robbery'];
    document.getElementById("Drugs").innerHTML = ciData['drugs'];
    document.getElementById("other-crime").innerHTML = ciData['other-crime'];
    }