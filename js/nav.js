(function() {

	var className = "nav-top"
	
	document.write("<style id='temp-nav-top'>.navbar {opacity:0; transition: none !important}</style>")

	function update() {
		var nav = document.querySelector(".navbar")

		if (window.scrollY > 15)
			nav.classList.remove(className)
		else
			nav.classList.add(className) 

	}

	document.addEventListener("DOMContentLoaded", function(event) {
		$(window).on('show.bs.collapse', function (e) {
			$(e.target).closest("." + className).removeClass(className);
		})

		$(window).on('hidden.bs.collapse', function (e) {
			update()
		})
		update()

		setTimeout(function() {
			document.querySelector("#temp-nav-top").remove()
		})
  	});

	window.addEventListener("scroll", function() {
		update()			
	})

})();