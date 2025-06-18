document.addEventListener('DOMContentLoaded', function () {
  // Initialize balance from localStorage or default
  let balance = parseFloat(localStorage.getItem('balance')) || 12450.75;

  function updateBalanceDisplay() {
    const balanceEls = document.querySelectorAll('.balance-amount');
    balanceEls.forEach(el => {
      el.textContent = `$${balance.toFixed(2)}`;
    });
    localStorage.setItem('balance', balance.toFixed(2));
  }

  // Withdraw Money Form
  const withdrawForm = document.getElementById("withdraw-money-form");
  if (withdrawForm) {
    withdrawForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById("withdraw-amount").value);
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        updateBalanceDisplay();
        if (typeof closeModal === "function") closeModal("withdraw");
        this.reset();

        // Simulate redirect after short delay
        setTimeout(() => {
          window.location.href = 'withdraw-confirmation.html';
        }, 800);
      } else {
        alert("Invalid amount. You can’t withdraw more than your current balance.");
      }
    });
  }

  // Add Money Form
  const addMoneyForm = document.getElementById('add-money-form');
  const paymentMethodSelect = document.getElementById('payment-method');
  const bankDetailsDiv = document.getElementById('bank-details');

  if (paymentMethodSelect && bankDetailsDiv) {
    paymentMethodSelect.addEventListener('change', () => {
      if (paymentMethodSelect.value === 'bank') {
        bankDetailsDiv.style.display = 'block';
      } else {
        bankDetailsDiv.style.display = 'none';
      }
    });
  }

  if (addMoneyForm) {
    addMoneyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const method = document.getElementById('payment-method').value;
      if (method === 'bank') {
        window.location.href = 'bank-transfer-success.html';
      } else {
        // Simulate card success (or process card API)
        alert('Card payment processed successfully!');
      }
    });
  }

  // Render Charts
  if (typeof Chart !== "undefined") {
    // Sample data - replace with real data integration later
    const balanceData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Account Balance ($)',
        data: [12000, 12100, 12250, 12100, 12450, 12500, 12450],
        borderColor: '#00bcd4',
        backgroundColor: 'rgba(0,188,212,0.3)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };

    const balanceConfig = {
      type: 'line',
      data: balanceData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: '#fff'
            },
            grid: {
              color: '#2c3e50'
            }
          },
          x: {
            ticks: { color: '#fff' },
            grid: { color: '#2c3e50' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#00bcd4' }
          }
        }
      }
    };

    // Portfolio Distribution Pie Chart
    const portfolioData = {
      labels: ['BTC', 'ETH', 'USDT', 'Others'],
      datasets: [{
        label: 'Portfolio',
        data: [50, 25, 15, 10],
        backgroundColor: ['#f7931a', '#627eea', '#26a17b', '#888888'],
        hoverOffset: 30
      }]
    };

    const portfolioConfig = {
      type: 'pie',
      data: portfolioData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#fff' }
          }
        }
      }
    };

    // Trading Volume Bar Chart
    const volumeData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Trading Volume',
        data: [5000, 7000, 4000, 9000, 8000, 10000, 6000],
        backgroundColor: '#00bcd4'
      }]
    };

    const volumeConfig = {
      type: 'bar',
      data: volumeData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#fff' },
            grid: { color: '#2c3e50' }
          },
          x: {
            ticks: { color: '#fff' },
            grid: { color: '#2c3e50' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#00bcd4' }
          }
        }
      }
    };

    // Render Charts if canvas elements exist
    const balanceChartEl = document.getElementById('balanceChart');
    if (balanceChartEl) new Chart(balanceChartEl, balanceConfig);

    const portfolioChartEl = document.getElementById('portfolioChart');
    if (portfolioChartEl) new Chart(portfolioChartEl, portfolioConfig);

    const volumeChartEl = document.getElementById('volumeChart');
    if (volumeChartEl) new Chart(volumeChartEl, volumeConfig);
  }

  // Candlestick Chart (BTC/USD) using Chart.js Financial
  if (window.Chart && Chart.registry && Chart.registry.getPlugin('financial')) {
    const candlestickEl = document.getElementById('candlestickChart');
    if (candlestickEl) {
      const ctx = candlestickEl.getContext('2d');

      // Sample OHLC data (replace this with live API later)
      const ohlcData = [
        { t: new Date('2025-06-10'), o: 27000, h: 27200, l: 26800, c: 27150 },
        { t: new Date('2025-06-11'), o: 27150, h: 27300, l: 27000, c: 27050 },
        { t: new Date('2025-06-12'), o: 27050, h: 27100, l: 26850, c: 26900 },
        { t: new Date('2025-06-13'), o: 26900, h: 27250, l: 26800, c: 27000 },
        { t: new Date('2025-06-14'), o: 27000, h: 27500, l: 26950, c: 27350 },
      ];

      const candlestickChart = new Chart(ctx, {
        type: 'candlestick',
        data: {
          datasets: [{
            label: 'BTC/USD',
            data: ohlcData,
            borderColor: '#00e676',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                tooltipFormat: 'MMM DD',
              },
              ticks: {
                source: 'auto',
                color: '#fff'
              },
              grid: {
                color: '#2c3e50'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price ($)'
              },
              ticks: {
                color: '#fff'
              },
              grid: {
                color: '#2c3e50'
              }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }

  // Login Form (if present)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      window.location.href = `dashboard.html?user=${encodeURIComponent(username)}`;
    });
  }

  // Welcome user from URL param
  const params = new URLSearchParams(window.location.search);
  const user = params.get('user');
  if (user) {
    const welcomeUserEl = document.getElementById('welcome-user');
    if (welcomeUserEl) {
      welcomeUserEl.textContent = `Welcome, ${user}!`;
    }
  }

  // Demo user data (reset each session)
  const demoData = {
    username: '',
    balance: 12450.75,
    portfolio: {
      BTC: 45,
      ETH: 30,
      ADA: 15,
      Others: 10,
    },
    chatMessages: [
      { user: 'TradeXBot', message: 'Welcome to the demo account!' },
    ],
  };

  // Elements
  const loginModal = document.getElementById('login-modal');
  const welcomeUser = document.getElementById('welcome-user');
  const chatBox = document.getElementById('chat-box');

  // Show login modal if no demo user
  function checkLogin() {
    const storedUser = sessionStorage.getItem('demoUsername');
    if (storedUser) {
      demoData.username = storedUser;
      loginModal.style.display = 'none';
      initializeDemo();
    } else {
      loginModal.style.display = 'flex';
    }
  }

  // Initialize demo dashboard
  function initializeDemo() {
    if (welcomeUser) {
      welcomeUser.textContent = `Welcome, ${demoData.username}!`;
    }
    // Set balance
    const storedBalance = parseFloat(sessionStorage.getItem('balance'));
    const displayBalance = !isNaN(storedBalance) ? storedBalance : demoData.balance;
    document.querySelector('.card p').textContent = `$${displayBalance.toFixed(2)}`;

    // Update portfolio distribution progress bars
    Object.entries(demoData.portfolio).forEach(([asset, percent]) => {
      const assetElem = [...document.querySelectorAll('.asset-name')].find(el =>
        el.textContent.toLowerCase().includes(asset.toLowerCase())
      );
      if (assetElem) {
        const parent = assetElem.closest('.asset');
        if (parent) {
          const percentElem = parent.querySelector('.asset-percent');
          const progressElem = parent.querySelector('.progress');
          if (percentElem) percentElem.textContent = `${percent}%`;
          if (progressElem) progressElem.style.width = `${percent}%`;
        }
      }
    });

    // Load chat messages
    if (chatBox) {
      chatBox.innerHTML = '';
      demoData.chatMessages.forEach(({ user, message }) => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${user}:</strong> ${message}`;
        chatBox.appendChild(p);
      });
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username').value.trim();
      if (usernameInput) {
        sessionStorage.setItem('demoUsername', usernameInput);
        demoData.username = usernameInput;
        loginModal.style.display = 'none';
        initializeDemo();
      }
    });
  }

  // Logout button: clear session and reload
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('demoUsername');
      location.reload();
    });
  }

  checkLogin();
});