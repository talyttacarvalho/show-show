$(document).ready(function () {
	$('.home').delay('6000').fadeIn('slow');
	var boxLogo = $("#box-logo");
	var logo = $("#logo");
	boxLogo.animate({
		opacity: '0.0'
	}, "slow");
	logo.animate({
		opacity: '0.0'
	}, "slow");
	boxLogo.animate({
			height: '550px',
			width: '550px',
			opacity: "1.0"
		},
		"slow");
	logo.animate({
			opacity: "1.0"
		},
		"slow");
	boxLogo.animate({
			height: '400px',
			width: '400px',
			opacity: "1.0"
		},
		"slow");
	logo.animate({
			opacity: "1.0"
		},
		"slow");
	logo.animate({
			opacity: "0.3"
		},
		"slow");
	logo.animate({
			opacity: "1.0"
		},
		"slow");

	function response(func) {
		return function (response) {
			response.json().then(func);
		}
	}

	function searchShow(json) {
		console.log(json);
		var artistEvents = json.resultsPage.results.event;
		$("#search-text").val("");
		$("#show-show").empty();
		$("#artist-status").empty();
		$("#buttom").empty();
		$("#search-btn").prop("disabled", true);
		if (artistEvents !== undefined) {
			artistEvents.forEach((object, index, show) => {
				var showPerformer = show[index].performance[0].artist.displayName;
				var showLocation = show[index].venue.displayName;
				var showCity = show[index].location.city;
				var showDetails = `<p class="info-show">Performance: ${showPerformer}</p>
                <p class="info-show">Local: ${showLocation} </p>
                <p class="info-show">Cidade: ${showCity}</p>
        `;
				var showDay = moment(show[index].start.date).locale("pt-BR").format("D");
				var showMonth = moment(show[index].start.date).locale("pt-BR").format("MMM");
				var showYear = moment(show[index].start.date).locale("pt-BR").format("YYYY");
				var showDate = `<span class="ml-1 mr-1"> ${showDay} </span>
                        <span class="mr-1"> ${showMonth} </span>
                        <span class="mr-1"> ${showYear} </span>
        `;
				if (showDay !== "Invalid date" && showMonth !== "Invalid date" && showYear !== "Invalid date") {
					$("#show-show").append(`
            <li class="box-show col-12 d-flex justify-content-center flex-column pb-3">
              <div class="info-show mt-4 mb-3 col-12 d-flex justify-content-center">Data: ${showDate} </div>
              <div class="info-show col-12 d-flex justify-content-center flex-column align-items-center">${showDetails} </div>
            </li>
          `);
				}
			});
			$("#buttom").append(`<button type="button" class="btn btn-friends my-3">Amigos que vão ao show</button>
			<button type="button" class="btn btn-buy">Comprar Ingresso</button>`);
		} else {
			$("#artist-status").append(`<h4 class="status"> Artista fora de turnê </h4>`);
		}

	}

	function setAvatar(avatar) {
		var artistAvatar = avatar;
		$("#artist-avatar").empty();
		$("#artist-avatar").append(`
      <div class="img-artist mt-3" style="background-image: url('${artistAvatar}')"></div>
    `);
	}

	function setId(json) {
		var artistName = json.resultsPage.results.artist[0].displayName;
		var artistId = json.resultsPage.results.artist[0].id;
		var setId = `https://api.songkick.com/api/3.0/artists/${artistId}/calendar.json?apikey=XFK6hX8iZ4LjPg6l`;
		var setIdImg = `https://images.sk-static.com/images/media/profile_images/artists/${artistId}/huge_avatar`;
		$("#artist-name").empty();
		$("#artist-name").append(`<p class="">${artistName}</p>`);
		fetch(setId).then(response(searchShow));
		setAvatar(setIdImg);
	}
	$("#search-text").keyup(function () {
		if ($(this).val() !== "") {
			$("#search-btn").prop("disabled", false);
		}
	});


	$("#search-btn").click(function (event) {
		event.preventDefault();

		var artistName = $("#search-text").val();
		var setName = `https://api.songkick.com/api/3.0/search/artists.json?apikey=XFK6hX8iZ4LjPg6l&query="${artistName}"`;
		fetch(setName).then(response(setId));
	});

});
