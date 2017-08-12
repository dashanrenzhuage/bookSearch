function search(){
  var sendData = $(":input[type='text']").val();
  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=search+term",
    type: "get",
    data: sendData,
    success: function(rmdata){
      $("#info").html("");
      for(var i=0;i<rmdata.items.length;i++){
        if(rmdata.items[i].volumeInfo.title.toLowerCase().indexOf(sendData.toLowerCase())!=-1){//If title contains input
          if(typeof rmdata.items[i].volumeInfo.authors !== "undefined"){//If author exists
            if(typeof rmdata.items[i].volumeInfo.imageLinks !== "undefined"){//If author & picture exists
			        var $newDiv = $("<div class='newDiv'><img src='"+rmdata.items[i].volumeInfo.imageLinks.thumbnail+"'><p>"+rmdata.items[i].volumeInfo.title+"</p><span>By </span></div>");      
              for(var j=0;j<rmdata.items[i].volumeInfo.authors.length;j++){
                if(j != rmdata.items[i].volumeInfo.authors.length-1){
				          $newDiv.append("<span>"+rmdata.items[i].volumeInfo.authors[j]+", </span>");
                }else{
                  $newDiv.append("<span>"+rmdata.items[i].volumeInfo.authors[j]+"</span>");
                }
              }
			        $("#info").append($newDiv);
            }else{//If author exists & picture doesn't exists
			        var $newDiv2 = $("<div class='newDiv'><p class='stay'>"+rmdata.items[i].volumeInfo.title+"</p><span class='stay by'>By </span></div>");
              for(var j=0;j<rmdata.items[i].volumeInfo.authors.length;j++){
                if(j!= rmdata.items[i].volumeInfo.authors.length-1){
                  $newDiv2.append("<span class='stay'>"+rmdata.items[i].volumeInfo.authors[j]+", </span>");
                }else{
                  $newDiv2.append("<span class='stay'>"+rmdata.items[i].volumeInfo.authors[j]+"</span>");
                }
              }
			        $("#info").append($newDiv2);
            }
          }else{//If author doesn't exist
            if(typeof rmdata.items[i].volumeInfo.imageLinks !=="undefined"){//If author doesn't exist and picture exists
              $("#info").append("<div class='newDiv'><img src='"+rmdata.items[i].volumeInfo.imageLinks.thumbnail+"'><p>"+rmdata.items[i].volumeInfo.title+"</p></div>");
            }else{//If both of author and picture don't exist
              $("#info").append("<div class='newDiv'><p class='stay onlytitle'>"+rmdata.items[i].volumeInfo.title+"</p></div>");
            }
          }
        }
      }
      if($("#info").html() == ""){
	      $("#info").append("<div class='newDiv'><p class='stay onlytitle'>Oops, there is no book that match your search!</p></div>");
	    }
    }
  });
};
	
$("#search").on('click',search);
$("#bookname").on('keyup',function(event){
  var event=event||window.enent;             
  if(event.keyCode==13){
    search();
  } 
});