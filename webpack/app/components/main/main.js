import main from "./main.html";

$("main").on("click", function() {
  $(this)
    .siblings()
    .show();
});

export default main;
