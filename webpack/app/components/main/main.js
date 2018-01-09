import main from "./main.html";
import "./main.css";
import Mustache from "mustache";

$.ajax({
  url: 'http://localhost:3000/ajaxGet',
  type: 'get',
  data: 'name=write',
  success: function(data) {
    
  },
  error: function (err) {
    console.log(err);
  },
})

export default Mustache.render(main, { text: '测试' });;
