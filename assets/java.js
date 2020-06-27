var tasks = {};





var today = function() {
    var area = $("#currentDay")
        .text(moment().format("dddd, MMMM Do"))
}

var createTask = function() {
     
};

var loadTasks = function() {
    today();
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

loadTasks();

setInterval(function() {
    today()
}, (1000 * 60)*30);