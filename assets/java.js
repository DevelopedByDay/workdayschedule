
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
        var task = localStorage.getItem(i) ?? '';
        var html = `<div class="row mt-1">
        <div class="col-1 col-lg-1 time-block hour">
            ${hour}
        </div>
        <div class="col-10 col-lg-10" id="s${i}">
          <p id="day${i}" class="description">${task}</p>
        </div>
        <button id="saveBtn${i}" class="col-1 col-lg-1 saveBtn"><span class="oi oi-lock-locked"></span></button> 
            
      </div>`
        container.insertAdjacentHTML("beforeend", html);
    }
    timeCheck();

    $("[id^=saveBtn]").on("click", function () {
        var id = this.id,
            time = id.replace(/\D/g, "");
        var description = $("#day" + time).html();
        saveTask(time, description);
    });
};

function saveTask(time, description) {
    localStorage.setItem(time, description);
    // swap(swapper);
}

$("div").on("click", "p", function() {
    var text = $(this).text()
    var textInput = $("<textarea>")
    $(this).replaceWith(textInput)
    textInput.trigger("focus")
    .attr("id", this.id)
    .addClass("form-control description")
        .val(text)
        .text()
        .trim();
})



$("div").on("blur", "textarea", function() {
    var text = $(this)
        .val()
        .trim();

    var taskP = $("<p>")
        .attr("id", this.id)
        .addClass("description")
        .text(text);
    $(this).replaceWith(taskP);
});

function timeCheck() {
    var currentHour = moment().hour();
    $(".mt-1").each(function(){
        var hourBlock = $(this).children(".time-block").text();
        var matches = hourBlock.match(/\d+/g);
        var hourNumber = parseInt(matches);
        if (currentHour < hourNumber) {
            $(this).addClass("future");
            $(this).removeClass("present");
            $(this).removeClass("past");
        }
        else if (currentHour === hourNumber) {
            $(this).addClass("present");
            $(this).removeClass("past");
            $(this).removeClass("future");
        }
        else if (currentHour > hourNumber) {
            $(this).addClass("past");
            $(this).removeClass("present");
            $(this).removeClass("future");
        }
    })
}


loadTasks();



setInterval(function() {
    today();
    timeCheck()
}, (1000 * 60)*5);