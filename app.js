const codeArea = document.getElementById('code');
const runBtn = document.getElementById('run');
const resultFrame = document.getElementById('result');

runBtn.addEventListener('click', () => {
  const code = codeArea.value;
  const doc = resultFrame.contentDocument || resultFrame.contentWindow.document;
  doc.open();
  doc.write(code);
  doc.close();
});
async function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://YOUR-SERVER-URL/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();

  if (data.status === "ok") {
    window.location.href = "login.html";
  } else {
    alert(data.message);
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://YOUR-SERVER-URL/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.status === "ok") {
    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}
