console.log("inside cutecritter");

//let ecc =  document.createElement("div");
//ecc.id = "cutecritter1"
//document.body.appendChild(ecc);

 var ajax = new XMLHttpRequest();
    ajax.open("GET", "cutecritterfactory.svg", true);
    ajax.send();

    // Append the SVG to the target
/*
    ajax.onload = function(e) {
		console.log("loaded");
      ecc.innerHTML = ajax.responseText;
    }
*/

ajax.onload = function(e) {
  let div = document.createElement("div");
  div.id = "cutecritter1"
  div.innerHTML = ajax.responseText;
  document.body.insertBefore(div, document.body.childNodes[0]);
}
	