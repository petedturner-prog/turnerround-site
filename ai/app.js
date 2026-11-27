(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var navToggle = document.getElementById("nav-toggle");
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navToggle) navToggle.checked = false;
    });
  });

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));

  function showTab(id) {
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-tab") === id;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-panel") !== id;
    });
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      showTab(tab.getAttribute("data-tab"));
    });
    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      var next = event.key === "ArrowRight" ? index + 1 : index - 1;
      if (next < 0) next = tabs.length - 1;
      if (next >= tabs.length) next = 0;
      tabs[next].focus();
      showTab(tabs[next].getAttribute("data-tab"));
    });
  });

  var questions = Array.prototype.slice.call(document.querySelectorAll(".q"));
  var answers = Array.prototype.slice.call(document.querySelectorAll(".answer-body"));

  function showQuestion(id) {
    questions.forEach(function (question) {
      var on = question.getAttribute("data-q") === id;
      question.classList.toggle("is-active", on);
      question.setAttribute("aria-pressed", on ? "true" : "false");
    });
    answers.forEach(function (answer) {
      answer.hidden = answer.getAttribute("data-for") !== id;
    });
  }

  questions.forEach(function (question) {
    question.addEventListener("click", function () {
      showQuestion(question.getAttribute("data-q"));
    });
  });
})();
