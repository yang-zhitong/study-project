import Header from "./Header.html";
import style from "./style.css";

$("h1").on("click", function() {
  $(this).css({
    backgroundColor: "red"
  });
});

export default Header;
