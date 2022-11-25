function toggleMenu(){
    const toggleMenu = document.querySelector(".toggleMenu");
    const navigation = document.querySelector(".navigation");    
    toggleMenu.classList.toggle("active");
    navigation.classList.toggle("active");
}
  const button = document.querySelector(".button");
      button.addEventListener("mousedown", () => button.classList.add("clicked"));
      button.addEventListener("mouseup", () => button.classList.remove("clicked"));


      var title = document.getElementById('cityName').value;
      
      var preloader = document.getElementById("loading")
      function myfunction(){
          preloader.style.display = 'none';
     }

     fetch("crime_incidents.json")
.then(ci => ci.json())
.then(ciData => work2(ciData));

function work2(ciData)
{
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