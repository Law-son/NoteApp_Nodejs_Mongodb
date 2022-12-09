// Get the modal
var qrmodal = document.getElementById("myqrModal");
var qrmodal1 = document.getElementById("myqrModal1");

// Get the button that opens the modal
var mbtn = document.getElementById("modal-btn");
var mbtn1 = document.getElementById("modal-btn1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementById("close1");

// When the user clicks the button, open the modal 
mbtn.onclick = function() {
   qrmodal.style.display = "block";
 }



 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   qrmodal.style.display = "none";
 }

 span1.onclick = function() {
  qrmodal1.style.display = "none";
}


 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if(event.target == qrmodal){
     qrmodal.style.display = "none";
   }
   if(event.target == qrmodal1){
    qrmodal1.style.display = "none";
  }
 }


 $(document).ready(function(){

  //create note
    $('form').on('submit', function(){
  
        var title = $('form #title');
        var content = $('form #body');
        var note = {title: title.val(), content: content.val()};
  
        $.ajax({
          type: 'POST',
          url: '/home',
          data: note,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    //delete note
    $('.del-btn').on('click', function(){
        var _id = $(this).attr("data-id");
        var id = {_id: _id};
        $.ajax({
          type: 'DELETE',
          url: '/home',
          data: id,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          },error: function(jqXhr, textStatus, errorMessage ){
            console.log("Status: " + textStatus + "Error message: " + errorMessage);
          }
        });
    });

    //update
    $('.note-title').on('click', function(){
      qrmodal1.style.display = "block";
      var container_id = $(this).attr("data-id");
      //console.log(container_id);
  

      $('form').on('submit', function(){
        var id = container_id;
        var new_title = $('form #new-title');
        var new_content = $('form #new-body');
        var note = {_id: container_id, title: new_title.val(), content: new_content.val()};

        $.ajax({
          type: 'PUT',
          url: '/home/update/',
          data: note,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });

        return false;
    });  

});
  
  });
  