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