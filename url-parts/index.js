var propertyNames = "hash host hostname href origin pathname port protocol search".split(" ");

const urlInput = document.getElementById("url-input");
const urlFields = document.getElementById("url-fields");
const urlParams = document.getElementById("url-params");
const errorDiv = document.getElementById("error");
const resultsDiv = document.getElementById("results");

urlInput.value = window.location.href;
urlInput.addEventListener("input", update);

function escapeHtml(str) {
  const elem = document.createElement("div"); // "div" is arbitrary, could be any element name
  elem.innerText = str;
  return elem.innerHTML;
}

function update() {
  try {
    const url = new URL(urlInput.value);

    let html = "<table>";
    for (const propertyName of propertyNames) {
      html += `<tr><th>${propertyName}</th><td>${escapeHtml(url[propertyName])}</td></tr>`;
    }
    html += "</table>";
    urlFields.innerHTML = html;

    html = "<table>";
    for (const [key, value] of url.searchParams.entries()) {
      html += `<tr><th>${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`;
    }
    html += "</table>";
    urlParams.innerHTML = html;

    errorDiv.innerHTML = "";
    resultsDiv.style.display = "initial";
  } catch (e) {
    errorDiv.innerText = String(e);
    resultsDiv.style.display = "none";
  }
}

update();
