// COMING SOON 倒數：data-release="YYYY-MM-DD"，以使用者當地時間 00:00 計算
(function () {
  var boxes = document.querySelectorAll(".countdown[data-release]");
  if (!boxes.length) return;
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    boxes.forEach(function (box) {
      var p = box.dataset.release.split("-");
      var target = new Date(+p[0], +p[1] - 1, +p[2]);
      var diff = Math.floor((target - new Date()) / 1000);
      if (diff <= 0) {
        box.querySelectorAll("div").forEach(function (d) { d.hidden = true; });
        box.querySelector(".cd-done").hidden = false;
        return;
      }
      var v = { d: Math.floor(diff / 86400), h: Math.floor(diff % 86400 / 3600), m: Math.floor(diff % 3600 / 60), s: diff % 60 };
      box.querySelectorAll(".cd-num").forEach(function (el) {
        var u = el.dataset.unit;
        el.textContent = u === "d" ? v.d : pad(v[u]);
      });
    });
  }
  tick();
  setInterval(tick, 1000);
})();
