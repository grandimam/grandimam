// Heading anchors on every post; table of contents when the layout includes [data-toc].
(function () {
  var content = document.querySelector(".post-content");
  if (!content) return;
  var headings = content.querySelectorAll("h2[id], h3[id]");

  headings.forEach(function (h) {
    var a = document.createElement("a");
    a.className = "heading-anchor";
    a.href = "#" + h.id;
    a.setAttribute("aria-label", "Link to this section");
    a.textContent = "#";
    h.prepend(a);
  });

  var toc = document.querySelector("[data-toc]");
  var h2s = content.querySelectorAll("h2[id]");
  if (!toc || h2s.length < 2) return;
  var list = toc.querySelector("ol");
  h2s.forEach(function (h) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent.replace(/^#/, "").trim();
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.hidden = false;
})();
