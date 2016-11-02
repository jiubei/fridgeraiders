$(document).ready(function() {
  console.log("start");


  // Calling of the food2fork API
  function ajaxCall() {
    $.ajax({
        url: word_combiner(),
        // url: "https://community-food2fork.p.mashape.com/search?key=356839640924168b1ea923ea80357769&q=avocado+mac",
        dataType: 'json',
        beforeSend: function(xhr) {
          xhr.setRequestHeader("X-Mashape-Key", "hbAfS9jgqumshjLDgVsG5w30Zfpzp1OJ2AWjsnvIcNWV3DQ05Q");
          xhr.setRequestHeader("Accept", "application/json");
        },
      }).done(successFunction)
      .fail(failFunction);

    function successFunction(res, status, req) {
      // console.log(res);

      if (res.count === 0) {
        $(".search-window").append(
          "<div class='search-answers'><a href='https://www.mcdelivery.com.sg/sg/' target='_blank'><div class='searched-titles'>McDelivery</div><img class='food-img' src='public/mcd.png' alt='Delicious Food' /></a></div> <div class='search-answers'><a href='http://www.pizzahut.com.sg/delivery/'target='_blank'><div class='searched-titles'>Pizza Hut Delivery</div><img class='food-img' src='public/phd.jpg' alt='Delicious Food' /></a></div><div class='search-answers'><a href='https://www.kfcdelivery.com.sg/'target='_blank'><div class='searched-titles'> KFC Delivery </div><img class='food-img' src='public/kfcd.png' alt='Delicious Food' /></a></div>"
      );
    } else {
        for (var m = 0; m < res.count; m++) {
          $(".search-window").append(
            "<div class='search-answers'><a href="+ res.recipes[m].f2f_url +" target='_blank'><div class='searched-titles'>" + res.recipes[m].title + "</div><img class='food-img' src='"+ res.recipes[m].image_url +"' alt='Delicious Food' /><a class='recipe' href="+ res.recipes[m].source_url +" target='_blank'>Get the Recipe!</a> </a></div>"
          );
        }
      }
    }

    function failFunction(req, status, err) {
      // console.log(err);
    }
  }

  // end of the call of food2fork API

  var ingredients = [{
    name: "apples",
    common: true
  },
  {
    name: "bacon",
    common: true
  }, {
    name: "bananas",
    common: false
  }, {
    name: "beef",
    common: true
  }, {
    name: "bread",
    common: true
  }, {
    name: "butter",
    common: true
  }, {
    name: "tuna",
    common: true
  }, {
    name: "carrots",
    common: true
  }, {
    name: "cereal",
    common: true
  }, {
    name: "cheese",
    common: true
  }, {
    name: "chicken",
    common: true
  }, {
    name: "chocolate",
    common: true
  }, {
    name: "coffee",
    common: true
  }, {
    name: "corn",
    common: false
  }, {
    name: "eggs",
    common: true
  }, {
    name: "fish",
    common: false
  }, {
    name: "garlic",
    common: true
  }, {
    name: "ginger",
    common: true
  }, {
    name: "ground-beef",
    common: false
  }, {
    name: "ice-cream",
    common: true
  }, {
    name: "mayonnaise",
    common: true
  }, {
    name: "milk",
    common: true
  }, {
    name: "onions",
    common: true
  }, {
    name: "orange",
    common: true
  }, {
    name: "lettuce",
    common: true
  }, {
    name: "pasta",
    common: true
  }, {
    name: "peanut-butter",
    common: true
  }, {
    name: "peas",
    common: false
  }, {
    name: "pork",
    common: true
  }, {
    name: "potatoes",
    common: true
  }, {
    name: "rice",
    common: true
  }, {
    name: "sausage",
    common: true
  }, {
    name: "sweet-potatoes",
    common: false
  }, {
    name: "tofu",
    common: false
  }, {
    name: "tomatoes",
    common: true
  }, {
    name: "vinegar",
    common: true
  }, {
    name: "watermelon",
    common: true
  }, {
    name: "yoghurt",
    common: false
  }, {
    name: "parsley",
    common: false
  }, {
    name: "mutton",
    common: false
  }, {
    name: "dragonfruit",
    common: false
  }];

  // Choice Button function
  var commonIngredients = new Array(0);

  for (var i = 0; i < ingredients.length; i++) {
    if (ingredients[i].common) {
      commonIngredients.push(ingredients[i].name);
    }
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...

    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  shuffle(commonIngredients);

  var commonSearch = new Array(0);

  for (var j = 0; j < 10; j++) {
    commonSearch.push(commonIngredients[j]);
  }


  for (var k = 0; k < commonSearch.length; k++) {
    $("#common-ingredients").append("<div id='choice-" + (k + 1) + "' class='choice-btn'><div class='btn-word'>" + commonSearch[k] + "</div> +</div>");
  }
  // End of Choice Button Function

  var searchbarIngredients = new Array(0);

  for (var l = 0; l < ingredients.length; l++) {
    searchbarIngredients.push(ingredients[l].name);
  }

  // Searchbar Autocomplete function
  // Ingredient searched and entered transfers over to ingredients found panel
  // search must be limited to the Autocomplete

  $(function() {

    var availableTags = searchbarIngredients;

    function log(message) {
      $("<div>").text(message).prependTo(".search-choices");
      $(".search-choices").scrollTop(0);
    }

    $("#search-bar").autocomplete({
      source: availableTags,
      minLength: 2,
      select: function(event, ui) {
        $(".search-window").empty();
        $(".search-choices").append(ui.item ?
          "<div class='search-btn'><div class='search-word'>" + ui.item.value + "</div> x</div>" :
          "Nothing selected, input was " + this.value);

        word_combiner();
        ajaxCall();
        deleter();
      }
    });
  });

  // End of Searchbar Autocomplete function


  // True search function
  // common ingredient button onClick transfers to ingredients found panel
  // common ingredient button must also be removed
var foodArray = [];
  var choiceBtn = $(".choice-btn .btn-word");

  choiceBtn.click(function() {
    $(".search-window").empty();
    //add to array
    foodArray.push($(this).text());
    var selection = $(this).text();

    $(".search-choices").append(("<div class='search-btn'><div class='search-word'>" + selection + "</div> x</div>"));
    $(this).parent("div").remove();

    word_combiner();
    ajaxCall();
    deleter();
  });

  // clicking on ingredients found button will remove ingredients
  // clicking 'Dump Ingredients!' will delete all ingredient buttons

  function word_combiner() {
    var words_arr = [];
    $(".search-word").each(function() {
      words_arr.push($(this).text());
    });
    var searchElement = ("https://community-food2fork.p.mashape.com/search?key=356839640924168b1ea923ea80357769&q=" + words_arr.join('+'));

    // console.log(searchElement);

    return searchElement;
  }

  function deleter() {
    var srchBtn = $('.search-btn');

    srchBtn.click(function() {
      $(this).closest("div").remove();
      word_combiner();
      ajaxCall();
    });
  }

  var dumpall = $("#ingredient-selected .search-function");

  dumpall.click(function() {
    $(".search-window").empty();
    $(".search-choices").empty();
    word_combiner();
  });
});
