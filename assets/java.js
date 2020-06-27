var tasks = {};





var today = function() {
    var area = $("#currentDay")
        .text(moment("dddd, MMMM Do"))
}

var loadTasks = function() {
    today();
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = {
            sev: [],
            eigh: [],
            nine: [],
            ten: [],
            elev: [],
            noon: [],
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
            six: [],
        }
    }

    $.each(tasks, function(list,arr) {
        arr.forEach(function(task) {
            createTask(task.text);
        });
    });
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();

setInterval(function() {
    today()
}, (1000 * 60)*30);