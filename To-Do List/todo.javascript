let ul = document.querySelector("ul");
let li = document.querySelectorAll("ul li");
let span_Delete = document.querySelectorAll("ul li span");
let input = document.querySelector("input[type='text']");



for (let i = 0; i < li.length; i++) {
    
    // Toggle complete & incomplete
    li[i].addEventListener("click", function () {
        this.classList.toggle("done");
    });

    // Add delete functionality
    span_Delete[i].addEventListener("click", function () {
        this.parentNode.remove();
    });
    
    
}

////////////////////////////////////////////////////////////////////////

// Code for new li

////////////////////////////////////////////////////////////////////////



input.addEventListener("keypress", function (event) {
    if (event.which === 13) {

        // Create new li
        let new_li = document.createElement("LI");

        // Add content to new li
        new_li.innerHTML = "<li><span> X </span>" + input.value + "</li>";

        // Add click functionality to new li
        new_li.addEventListener("click", function () {
            this.classList.toggle("done");
        });

        new_li.childNodes[0].addEventListener("click", function () {
            console.log(this.value);
            this.parentNode.remove();
        });

        // Append new li
        ul.appendChild(new_li);

        // Clear input box
        input.value = "";

    }
});




// ul.addEventListener("click", "li", function(){
// console.log("Clicked new li");
// });