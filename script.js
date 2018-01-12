var apiKey = "e80d2a443a884de39f5a65f217ff0f12"
var numResults = 10;

$("#search").click(function(){
    var term = $("#term").val();
    if(term === ""){
        return;
    }
    var start = $("#start").val();
    if(start === ""){
        start = "10000101"
    }
    var end = $("#end").val();
    if(end === ""){
        end = "20180111"
    }
    numResults = $("#number").val();
    numResults = parseInt(numResults);
    apiPull(term, start, end)
})

function createListing(response){
    for(var i = 0; i < numResults; i++){ 
        var articleHolder = $("<div>").attr("class","well well-lg").attr("id","article-holder")
        var articleTitle = $("<h2>").text((i + 1) + ": " + response.response.docs[i].headline.main)
        var articleAuthor = $("<h5>").text(response.response.docs[i].byline.original)
        articleHolder.append(articleTitle, articleAuthor);
        $("#results").append(articleHolder)
    }
}

function apiPull(term, startYear, endYear){
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e80d2a443a884de39f5a65f217ff0f12&fq=" + term + "&begin_date=" + startYear + "&end_date=" + endYear;

    console.log(queryUrl)
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function(response){
        createListing(response)
        console.log(response)
    })
}
