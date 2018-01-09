import template from "./button.html";
import Mustache from "mustache";
import "./button.css";

Mustache
export default class Button {
  constructor(link) {
    this.link = link;
  }

  onClick(event) {
    event.preventDefault();
    alert(this.link);
  }

  render(node) {
    // Render our button
    console.log(Mustache.render(template, { text: '测试' }));
    var n = $(node).html(Mustache.render(template, { text: '测试' }));
    
    // Attach our listeners
    $(".button").click(this.onClick.bind(this));
  }
}
