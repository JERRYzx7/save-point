// 首頁狀態篩選：按鈕的 data-filter 對應卡片的 data-status
(function () {
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll("#game-grid .game-card");
  var empty = document.getElementById("filter-empty");
  if (!buttons.length || !cards.length) return;

  function apply(filter) {
    var visible = 0;
    cards.forEach(function (card) {
      var show = filter === "all" || card.dataset.status === filter;
      card.hidden = !show;
      if (show) visible++;
    });
    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.filter === filter ? "true" : "false");
    });
    if (empty) empty.hidden = visible > 0;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { apply(btn.dataset.filter); });
  });
})();
