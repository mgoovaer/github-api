// Main function: attempts to pull GitHub repositories for given username
function pullRepositories() {
	var username = document.getElementById('username').value;
	if (username == null || username == "") {
        alert("Username must be filled out.");
        return false;
    }

    var xhr = new XMLHttpRequest();
	var request = "https://api.github.com/users/" + username + "/repos";
	xhr.open("GET", request);
	  
	xhr.onprogress = function () {
		displayProgressIndicator();
	};

	xhr.onload = function () {
		if(xhr.status == 200) {
			displayResponse(JSON.parse(xhr.response));
		} else {
			displayError();
		}
	}

	xhr.send();
};

// Display a line progress indicator
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
function displayProgressIndicator() {
	document.getElementById("content").innerHTML = "";

	var bar = new ProgressBar.Line(content, {
	  strokeWidth: 4,
	  easing: 'easeInOut',
	  duration: 1400,
	  color: '#FFEA82',
	  trailColor: '#eee',
	  trailWidth: 1,
	  svgStyle: {width: '100%', height: '100%'},
	  from: {color: '#808080'},
	  to: {color: '#2879d0'},
	  step: (state, bar) => {
	    bar.path.setAttribute('stroke', state.color);
	  }
	});

	bar.animate(1.0);  // Number from 0.0 to 1.0
};

// Populate the content div with the GitHub Repositories
function displayResponse(json) {
	f = json;
    //Build the new child andd append it to the father
    el =  document.getElementById("content");
    el.innerHTML = "";

    if(f.length > 0) {
	    element = document.createElement("ul");
	    for (var i = 0; i < f.length; i++) {
	    	li = document.createElement("li");
	        a = document.createElement("a");
	        a.appendChild(document.createTextNode(f[i].name));
	        a.href = f[i].html_url;
	        li.appendChild(a);
	        element.appendChild(li);
	    }
    } else {
    	txtNode = document.createTextNode("No repositories found for entered username.");
    	element = document.createElement("p").appendChild(txtNode);
    }
    el.appendChild(element);
};

// Populate the content div with an error message
function displayError() {
    el =  document.getElementById("content");
    el.innerHTML = "";

    txtNode = document.createTextNode("An error has occured.");
    element = document.createElement("p");
    element.setAttribute("class", "error");
    element.appendChild(txtNode);
    el.appendChild(element);
};