//--------------------------------------------------
//submit search when user clicks enter
var start = document.getElementById('search');

start.addEventListener("keyup", function(event) {
  event.preventDefault();
  if(event.keyCode === 13) {
    wikibot();
  }
});
//--------------------------------------------------

function random() {

    //reset screen
    document.getElementById('screen').innerHTML = '';
    document.getElementById('screen').style.overflow = 'scroll';
    //add iframe that links to random wikipedia page
    document.getElementById('screen').innerHTML = "<div id='window'><iframe src='https://en.wikipedia.org/wiki/Special:Random'></iframe></div>";
}

//--------------------------------------------------

function wikibot() {

    //reset screen
    document.getElementById('screen').innerHTML = '';
    document.getElementById('screen').style.overflowY = 'scroll';

    // Create a new XMLHttpRequest object.
    var request = new XMLHttpRequest();

    var searchTerm = document.getElementById("search").value;

    // Open a new connection, using the GET request on the URL endpoint (list 10 results for search query)

    request.open('GET', 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchTerm + '&prop=info&inprop=url&utf8=&format=json&origin=*', true);

    request.onload = function () {

      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
            //console.log(data.query.search.length); //test

      //loop through search results
      for(var i = 0; i < data.query.search.length; i++) {

        //get page result data and store in variables
        var pageid = data.query.search[i].pageid;
        var title = data.query.search[i].title;
        var snippet = data.query.search[i].snippet;
        var wordcount = data.query.search[i].wordcount;
        var timeToRead = Math.ceil(wordcount/275);
        //console.log(wordcount);
        //console.log("readtime: " + timeToRead);
        var date = data.query.search[i].timestamp;
        console.log(date);

        var dateStamp = "";
          dateStamp += date[8];
          dateStamp += date[9];
          dateStamp += date[7];
          dateStamp += date[5];
          dateStamp += date[6];
          dateStamp += date[4];
          dateStamp += date[0];
          dateStamp += date[1];
          dateStamp += date[2];
          dateStamp += date[3];
          console.log(dateStamp);

        //remove html tags
        snippet = snippet.replace(/<(?:.|\n)*?>/gm, '');
        //console.log(title + ": " + snippet);

        //construct url for individual pages by appending pageid
        var pageurl = "https://en.wikipedia.org/?curid=" + pageid;

        //create a title link that opens page related to result
        var heading = document.createElement('h3');
        var titleText = document.createTextNode(title);
        heading.appendChild(titleText);

        //create paragraph with read time
        var readTime = document.createElement('p');
        readTime.setAttribute("class", "readtime");
        var readTimeText = document.createTextNode(timeToRead + " min read");
        readTime.appendChild(readTimeText);

        //create paragraph with date written and snippet text.
        var dateSnippet = document.createElement('p');
        var dateText = document.createTextNode(dateStamp);
        var span = document.createElement('span');
        span.setAttribute("class", "timestamp");
        span.appendChild(dateText);
        snippetText = document.createTextNode(" " + snippet + " [...]");
        dateSnippet.appendChild(span);
        dateSnippet.appendChild(snippetText);

        //create view more link
        var readMore = document.createElement('a');
        var readMoreText = document.createTextNode("Read More");
        readMore.appendChild(readMoreText);
        readMore.setAttribute('href', pageurl);
        readMore.setAttribute('target', "_blank");

        var br = document.createElement('br');

        var screen = document.getElementById("screen");

        screen.appendChild(heading);
        screen.appendChild(readTime);
        screen.appendChild(dateSnippet);
        screen.appendChild(readMore);
        screen.appendChild(br);
      }

    }

    // Send request
    request.send();

}