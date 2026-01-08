function analyzePassword() {
  const password = document.getElementById("password").value;
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  let score = 0;

  const lengthCheck = password.length >= 8;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /[0-9]/.test(password);
  const specialCheck = /[!@#$%^&*]/.test(password);

  updateCriteria("length", lengthCheck);
  updateCriteria("upper", upperCheck);
  updateCriteria("lower", lowerCheck);
  updateCriteria("number", numberCheck);
  updateCriteria("special", specialCheck);

  if (lengthCheck) score++;
  if (upperCheck) score++;
  if (lowerCheck) score++;
  if (numberCheck) score++;
  if (specialCheck) score++;

  const percent = (score / 5) * 100;
  strengthBar.style.width = percent + "%";

  if (score <= 1) {
    strengthBar.className = "progress-bar bg-danger strength-bar";
    strengthText.textContent = "Çok Zayıf";
  } else if (score <= 3) {
    strengthBar.className = "progress-bar bg-warning strength-bar";
    strengthText.textContent = "Orta";
  } else if (score === 4) {
    strengthBar.className = "progress-bar bg-info strength-bar";
    strengthText.textContent = "Güçlü";
  } else {
    strengthBar.className = "progress-bar bg-success strength-bar";
    strengthText.textContent = "Çok Güçlü";
  }

  calculateCrackTime(password);
}

function updateCriteria(id, condition) {
  const el = document.getElementById(id);
  if (condition) {
    el.textContent = "✔ " + el.textContent.substring(2);
    el.className = "valid";
  } else {
    el.textContent = "❌ " + el.textContent.substring(2);
    el.className = "invalid";
  }
}


function togglePassword() {
  const passwordInput = document.getElementById("password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

function calculateCrackTime(password) {
  const crackTimeEl = document.getElementById("crackTime");

  if (password.length === 0) {
    crackTimeEl.textContent = "-";
    return;
  }

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[!@#$%^&*]/.test(password)) charsetSize += 8;

  const combinations = Math.pow(charsetSize, password.length);
  const guessesPerSecond = 1_000_000_000; 
  const seconds = (combinations / 2) / guessesPerSecond;
  crackTimeEl.textContent = formatTime(seconds);
}

function formatTime(seconds) {
  if (seconds < 1) return "Anında kırılır 😨";
  if (seconds < 60) return `${seconds.toFixed(1)} saniye`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} dakika`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} saat`;
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} gün`;
  if (seconds < 3153600000) return `${(seconds / 31536000).toFixed(1)} yıl`;

  return `${(seconds / 31536000000).toFixed(1)} yüzyıl 😎`;
}