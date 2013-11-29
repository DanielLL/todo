// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
$(document).ready(function(){

  //Listeners

  add_events = function(){
    $(".deleteItem, #inputTaksName, .modal-footer .btn-primary, .complete").unbind();

    $(".modal-footer .btn-primary").click(function(){
      title = $("#inputTaksName").val();

      if (title !== ""){
        save_task(title);
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

    $(".deleteItem").click(function(e){
      e.stopPropagation();
      $container = $(this).parents(".task_element");
      taskId =     parseInt($container.attr("id"));
      delete_task(taskId);
    });


    $(".complete").on('change', function(){
      container  = $(this).parents(".task_element");
      isComplete = $(this).is(":checked");
      title      = container.find(".task_title label").text();
      task = { id: parseInt(container.attr("id")),title: title , completed: isComplete}
      update_task(task);
    });


    $(".task_title label").click(function(){
      edit_mode($(this).parent(), true);
    });


    $("input.input_task").on("keyup", function(){

    })
  },


  add_events();
  //Functions
  //
  //Requests
  var delete_task = function(taskId){
    $.ajax({
      type: "DELETE",
      url: '/tasks/' + taskId,
      success: function(response){
        remove_element(response);
      },
      dataType: "JSON"
    });
  }
  var save_task = function(response){
    $.ajax({
      type: "POST",
      url: '/tasks',
      data: { task: { title: title } },
      success: function(response){
        $(".modal-footer #close").click();
        insert_element($("#tasks_elements tbody"), response);
        $("#inputTaksName").val("");
      },
      dataType: "JSON"
    });
  }
  var update_task = function(task){
    $.ajax({
      type: "PUT",
      url: '/tasks/' + task.id,
      data: { task: {title: task.title, completed: task.completed } },
      success: function(response){
        update_element(response);
      },
      dataType: "JSON"
    });
  }

  //DOM Functions
  var insert_element = function(container, task){
    container.append("<tr id='"+ task.id +"' class='task_element'>\
                     <td>"+ task.id +"</td>\
                     <td class='task_title'>\
                     <label>"+ task.title + "</label>\
                     <input type='text' class='input_task hidden'/>\
                     </td>\
                     <td><input class='complete' type='checkbox'>\
                     <label class='deleteItem btn btn-danger btn-mini'>X</label>\
                     </td>\
                     </tr>");
                     add_events();

  }

  var update_element = function(task){
    container = $(".task_element[id="+task.id+"]");
    container.find(".task_title label").text(task.title);

  }
  var remove_element = function(taskId){
    $(".task_element[id="+taskId+"]").remove();
    add_events();
  }

  var edit_mode = function(container, flag){

    if (flag){
      container.find("label").toggle();
      container.find("input").removeClass("hidden");
    }
    else {
      container.find("label").toggle();
      container.find("input").addClass("hidden");

    }
  }

});
