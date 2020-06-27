var tasks = {};





var today = function() {
    var area = $("#currentDay")
        .text(moment().format("dddd, MMMM Do"))
}

var createTask = function() {
    
};

var loadTasks = function() {
    today();
    var container = document.getElementById("schedule")
    for(i = 7; i < 19; i++) {
        var hour = i
        if (i > 12) {
            hour = hour - 12 + "PM"
        }
        else if (i === 12){
            hour = hour + "PM"
        }
        else {
            hour = hour + "AM";
        }
        var html = `<div class="row mt-1">
        <div class="col-1 col-lg-1 time-block hour">
            ${hour}
        </div>
        <div class="col-10 col-lg-10">
          <p id="day${i}" class="description">

          </p>
        </div>
        <button id="saveBtn${i}" class="col-1 col-lg-1 saveBtn"><span class="oi oi-lock-locked"></span></button> 
            
      </div>`
        container.insertAdjacentHTML("beforeend", html);
    }

    // tasks = JSON.parse(localStorage.getItem("tasks"));

    // if (!tasks) {
    //     tasks = {
    //         sev: [],
    //         eigh: [],
    //         nine: [],
    //         ten: [],
    //         elev: [],
    //         noon: [],
    //         one: [],
    //         two: [],
    //         three: [],
    //         four: [],
    //         five: [],
    //         six: [],
    //     }
    // }

    // $.each(tasks, function(list,arr) {
    //     arr.forEach(function(task) {
    //         createTask(task.text);
    //     });
    // });
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

$("div").on("click", "p", function() {
    var text = $(this)
    var textInput = $("<textarea>")
    $(this).replaceWith(textInput)
    textInput.trigger("focus")
    .addClass("form-control")
        .val(text)
        .text()
        .trim();
})

$("div").on("blur", "textarea", function() {
    var text = $(this)
        .val()
        .trim();

    var status = $(this)
    .closest("div")
    .attr("id")

    var index = $(this)
    .closest("div")
    .index();

    tasks[status][index].text = text;
    saveTasks();

    var taskP = $("<p>")
        .addClass("m-1")
        .text(text);
    $(this).replaceWith(taskP);
});

$("[id^=save]").on("click", function () {
    var id = this.id,
        time = id.substr(id.length - 1);
    var description = $("#day" + time).val();
});

loadTasks();



setInterval(function() {
    today()
}, (1000 * 60)*5);