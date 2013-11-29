// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){
  $(".modal-footer .btn-primary").click(function(){
    title = $("#inputTaksName").val();

    if (title !== ""){
      $.ajax({
        type: "POST",
        url: '/tasks',
        data: { task: { title: title } },
        success: function(response){
          save_task(response);
        },
        dataType: "JSON"
      });
    }

  });


  $("#inputTaksName").on('keyup', function(e){
    e.stopPropagation();
    if (e.keyCode===13){
      $(".modal-footer .btn-primary").click();
    }
    if (e.keyCode===27){
      $(".modal-footer #close").click();
      $("#inputTaksName").val("");
    }
  });


  var save_task = function(response){
    $(".modal-footer #close").click();
    insert_element($("#tasks_elements tbody"), response);
    $("#inputTaksName").val("");
  }

  var insert_element = function(container, task){
    container.append("<tr id='"+ task.id +"' class='task_element'>\
                     <td>"+ task.id +"</td>\
                     <td>"+ task.title + "</td>\
                     <td><input class='complete' type='checkbox'><label class='btn btn-danger btn-mini'>X</label></td>\
                     </tr>");
  }

  var remove_element = function(container, title){
  
  }

});
