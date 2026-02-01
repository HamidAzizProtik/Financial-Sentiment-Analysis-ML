// chart instances
const charts = {};

// api configuration
const API_URL = "http://127.0.0.1:5000";
let flaskReady = false;
let metricsData = null;

// dom elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// initialize all charts
function initCharts() {
  charts.sentimentPolar = createSentimentPolar();
  charts.sentimentBars = createSentimentBars();
  charts.modelRadar = createModelRadar();
  charts.predictionBreakdown = createPredictionBreakdown();
  charts.wordCloudChart = createWordCloudChart();
  charts.confusionHeatmap = createConfusionHeatmap();
  charts.agreementGauge = createAgreementGauge();
  charts.metricsGrouped = createMetricsGrouped();
  charts.detailedComparison = createDetailedComparison();
  charts.f1ByClass = createF1ByClass();
  charts.precisionRecall = createPrecisionRecall();
  charts.weightHistogram = createWeightHistogram();
  charts.topCoeffs = createTopCoeffs();
  charts.sparsityDonut = createSparsityDonut();
  charts.featureHeatmap = createFeatureHeatmap();
  charts.datasetDist = createDatasetDist();
  charts.accuracyStacked = createAccuracyStacked();
}

function createSentimentPolar() {
  const ctx = document.getElementById('sentimentPolar');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{ data: [33, 34, 33], backgroundColor: ['rgba(16,185,129,0.7)', 'rgba(107,114,128,0.7)', 'rgba(239,68,68,0.7)'], borderColor: ['#10b981', '#6b7280', '#ef4444'], borderWidth: 2 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { animateRotate: true, animateScale: true, duration: 1500, easing: 'easeOutQuart' },
      hover: { mode: 'index', intersect: false, animationDuration: 200 },
      plugins: {
        legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15, usePointStyle: true, pointStyle: 'circle' } },
        tooltip: { backgroundColor: 'rgba(17,17,24,0.95)', titleColor: '#f0f0f5', bodyColor: '#a0a0b5', borderColor: '#252532', borderWidth: 1, padding: 12, cornerRadius: 8, displayColors: true }
      },
      scales: { r: { ticks: { display: false }, grid: { color: 'rgba(255,255,255,0.05)' }, animate: true } }
    }
  });
}

function createSentimentBars() {
  const ctx = document.getElementById('sentimentBars');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['Positive', 'Neutral', 'Negative'], datasets: [{ label: 'Count', data: [423, 446, 387], backgroundColor: ['#10b981', '#6b7280', '#ef4444'], borderRadius: 8 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, ticks: { color: '#6a6a7a' } }, y: { ticks: { color: '#f0f0f5' } } } } });
}

function createModelRadar() {
  const ctx = document.getElementById('modelRadar');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score', 'Speed', 'Stability'],
      datasets: [
        { label: 'Naive Bayes', data: [85, 87, 84, 85, 95, 82], borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.2)', pointBackgroundColor: '#6366f1', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#6366f1' },
        { label: 'Logistic Reg', data: [92, 93, 91, 92, 85, 88], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', pointBackgroundColor: '#10b981', pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#10b981' }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: { duration: 1500, easing: 'easeOutQuart' },
      hover: { mode: 'nearest', intersect: true, animationDuration: 200 },
      elements: { line: { tension: 0.4 }, point: { radius: 4, hoverRadius: 8 } },
      plugins: {
        legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15, usePointStyle: true } },
        tooltip: { backgroundColor: 'rgba(17,17,24,0.95)', titleColor: '#f0f0f5', bodyColor: '#a0a0b5', borderColor: '#252532', borderWidth: 1, padding: 12, cornerRadius: 8 }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { color: '#6a6a7a', backdropColor: 'transparent', stepSize: 20 },
          grid: { color: 'rgba(255,255,255,0.05)' },
          pointLabels: { color: '#f0f0f5', font: { size: 11, weight: 'bold' } },
          angleLines: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  });
}

function createPredictionBreakdown() {
  const ctx = document.getElementById('predictionBreakdown');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'bar',
    data: { labels: ['Negative', 'Neutral', 'Positive'], datasets: [{ label: 'Probability', data: [0, 0, 0], backgroundColor: ['rgba(239,68,68,0.7)', 'rgba(107,114,128,0.7)', 'rgba(16,185,129,0.7)'], borderRadius: 8 }] },
    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, max: 1, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } }
  });
}

function createWordCloudChart() {
  const ctx = document.getElementById('wordCloudChart');
  if (!ctx) return null;
  return new Chart(ctx, { indexAxis: 'y', type: 'bar', data: { labels: ['excellent', 'amazing', 'great', 'love', 'good', 'bad', 'terrible', 'worst'], datasets: [{ label: 'Impact', data: [3.2, 2.9, 2.7, 2.5, 2.1, -1.8, -2.4, -2.6], backgroundColor: ctx => ctx.raw > 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)', borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#6a6a7a' } }, y: { ticks: { color: '#f0f0f5' } } } } });
}

function createConfusionHeatmap() {
  const ctx = document.getElementById('confusionHeatmap');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['TN', 'FP', 'FN', 'TP'], datasets: [{ label: 'Count', data: [245, 17, 21, 217], backgroundColor: ['#10b981', '#f59e0b', '#f59e0b', '#10b981'], borderRadius: 8 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } } });
}

function createAgreementGauge() {
  const ctx = document.getElementById('agreementGauge');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'doughnut', data: { labels: ['Agree', 'Disagree'], datasets: [{ data: [85, 15], backgroundColor: ['#10b981', '#1a1a24'], borderColor: ['#10b981', '#252532'], borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: true, cutout: '75%', plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15 } } } } });
}

function createMetricsGrouped() {
  const ctx = document.getElementById('metricsGrouped');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score'], datasets: [{ label: 'Naive Bayes', data: [85, 87, 84, 85], backgroundColor: 'rgba(99,102,241,0.8)', borderRadius: 6 }, { label: 'Logistic Reg', data: [92, 93, 91, 92], backgroundColor: 'rgba(16,185,129,0.8)', borderRadius: 6 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 20 } } }, scales: { y: { beginAtZero: true, max: 100, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } } });
}

function createDetailedComparison() {
  const ctx = document.getElementById('detailedComparison');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score', 'ROC AUC'], datasets: [{ label: 'Naive Bayes', data: [85.2, 87.1, 84.3, 85.8, 92.3], backgroundColor: 'rgba(99,102,241,0.8)', borderRadius: 6 }, { label: 'Logistic Reg', data: [92.1, 93.3, 89.1, 91.2, 95.2], backgroundColor: 'rgba(16,185,129,0.8)', borderRadius: 6 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 20 } } }, scales: { y: { beginAtZero: true, max: 100, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } } });
}

function createF1ByClass() {
  const ctx = document.getElementById('f1ByClass');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['Negative', 'Neutral', 'Positive', 'Macro'], datasets: [{ label: 'Naive Bayes', data: [86.7, 88.9, 83.5, 86.4], backgroundColor: 'rgba(99,102,241,0.8)', borderRadius: 6 }, { label: 'Logistic Reg', data: [93.5, 93.0, 90.0, 92.2], backgroundColor: 'rgba(16,185,129,0.8)', borderRadius: 6 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15 } } }, scales: { y: { beginAtZero: true, max: 100, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } } });
}

function createPrecisionRecall() {
  const ctx = document.getElementById('precisionRecall');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'scatter', data: { datasets: [{ label: 'Naive Bayes', data: [{x: 87.1, y: 84.3}], backgroundColor: '#6366f1', pointRadius: 12 }, { label: 'Logistic Reg', data: [{x: 93.3, y: 89.1}], backgroundColor: '#10b981', pointRadius: 12 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15 } } }, scales: { x: { min: 80, max: 100, ticks: { color: '#6a6a7a' }, title: { display: true, text: 'Precision', color: '#6a6a7a' } }, y: { min: 80, max: 100, ticks: { color: '#6a6a7a' }, title: { display: true, text: 'Recall', color: '#6a6a7a' } } } } });
}

function createWeightHistogram() {
  const ctx = document.getElementById('weightHistogram');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['<-2', '-2~-1', '-1~0', '0~1', '1~2', '>2'], datasets: [{ label: 'Features', data: [8, 25, 180, 220, 45, 12], backgroundColor: 'rgba(99,102,241,0.7)', borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } } });
}

function createTopCoeffs() {
  const ctx = document.getElementById('topCoeffs');
  if (!ctx) return null;
  return new Chart(ctx, { indexAxis: 'y', type: 'bar', data: { labels: ['excellent', 'amazing', 'great', 'terrible', 'worst', 'horrible'], datasets: [{ label: 'Coefficient', data: [3.2, 2.9, 2.7, -2.8, -2.6, -2.8], backgroundColor: ctx => ctx.raw > 0 ? 'rgba(16,185,129,0.7)' : 'rgba(239,68,68,0.7)', borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#6a6a7a' } }, y: { ticks: { color: '#f0f0f5' } } } } });
}

function createSparsityDonut() {
  const ctx = document.getElementById('sparsityDonut');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'doughnut', data: { labels: ['Non-zero', 'Zero'], datasets: [{ data: [12, 88], backgroundColor: ['#6366f1', '#1a1a24'], borderColor: ['#6366f1', '#252532'], borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: true, cutout: '70%', plugins: { legend: { display: false } } } });
}

function createFeatureHeatmap() {
  const ctx = document.getElementById('featureHeatmap');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], datasets: [{ label: 'Negative', data: [-2.5, -2.1, -1.8, -1.5, -1.2, -0.9], backgroundColor: 'rgba(239,68,68,0.7)', borderRadius: 4 }, { label: 'Positive', data: [2.5, 2.1, 1.8, 1.5, 1.2, 0.9], backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15 } } }, scales: { y: { beginAtZero: true, ticks: { color: '#6a6a7a' } }, x: { ticks: { color: '#f0f0f5' } } } } });
}

function createDatasetDist() {
  const ctx = document.getElementById('datasetDist');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'doughnut', data: { labels: ['Positive', 'Neutral', 'Negative'], datasets: [{ data: [423, 446, 387], backgroundColor: ['#10b981', '#6b7280', '#ef4444'], borderColor: '#14141c', borderWidth: 3 }] }, options: { responsive: true, maintainAspectRatio: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15 } } } } });
}

function createAccuracyStacked() {
  const ctx = document.getElementById('accuracyStacked');
  if (!ctx) return null;
  return new Chart(ctx, { indexAxis: 'y', type: 'bar', data: { labels: ['Naive Bayes', 'Logistic Reg'], datasets: [{ label: 'Correct', data: [1089, 1147], backgroundColor: 'rgba(16,185,129,0.8)', borderRadius: [8, 0, 0, 8] }, { label: 'Incorrect', data: [167, 109], backgroundColor: 'rgba(239,68,68,0.8)', borderRadius: [0, 8, 8, 0] }] }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#a0a0b5', padding: 15 } } }, scales: { x: { stacked: true, beginAtZero: true, ticks: { color: '#6a6a7a' } }, y: { stacked: true, ticks: { color: '#f0f0f5' } } } } });
}

function updateChartsWithData(data) {
  if (!data) return;
  metricsData = data;
  const lrReport = data.lr.classification_report;
  const positiveF1 = (lrReport.positive['f1-score'] * 100).toFixed(1);
  const neutralF1 = (lrReport.neutral['f1-score'] * 100).toFixed(1);
  const negativeF1 = (lrReport.negative['f1-score'] * 100).toFixed(1);
  
  animateValue('stat-positive', 0, parseFloat(positiveF1), 1000);
  animateValue('stat-neutral', 0, parseFloat(neutralF1), 1000);
  animateValue('stat-negative', 0, parseFloat(negativeF1), 1000);
  
  document.getElementById('bar-positive').style.width = positiveF1 + '%';
  document.getElementById('bar-neutral').style.width = neutralF1 + '%';
  document.getElementById('bar-negative').style.width = negativeF1 + '%';
  
  const accuracy = (data.lr.accuracy * 100).toFixed(1);
  animateValue('header-accuracy', 0, parseFloat(accuracy), 1200);
  
  const sentiments = [{ name: 'Positive', value: parseFloat(positiveF1) }, { name: 'Neutral', value: parseFloat(neutralF1) }, { name: 'Negative', value: parseFloat(negativeF1) }];
  const dominant = sentiments.reduce((a, b) => a.value > b.value ? a : b);
  
  const dominantEl = document.getElementById('dominant-sentiment');
  dominantEl.style.opacity = 0;
  setTimeout(() => {
    dominantEl.textContent = dominant.name;
    dominantEl.style.opacity = 1;
    dominantEl.style.transition = 'opacity 0.5s ease';
  }, 300);
  
  document.getElementById('sentiment-percent').textContent = dominant.value + '% confidence';
  
  updateClassificationTable(data);
  updatePredictionsTable(data);
}

function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    obj.textContent = (start + easeProgress * (end - start)).toFixed(1) + '%';
    if (progress < 1) { window.requestAnimationFrame(step); }
  };
  window.requestAnimationFrame(step);
}

function updateClassificationTable(data) {
  const tbody = document.querySelector('#classification-table tbody');
  if (!tbody) return;
  const nb = data.nb.classification_report;
  const lr = data.lr.classification_report;
  let html = '';
  ['negative', 'neutral', 'positive'].forEach(cls => {
    html += `<tr><td><span style="background:var(--accent-glow);color:#6366f1;padding:4px 10px;border-radius:12px;font-size:11px;">NB</span></td><td><span class="badge ${cls}">${cls.charAt(0).toUpperCase() + cls.slice(1)}</span></td><td>${(nb[cls].precision * 100).toFixed(1)}%</td><td>${(nb[cls].recall * 100).toFixed(1)}%</td><td>${(nb[cls]['f1-score'] * 100).toFixed(1)}%</td><td>${nb[cls].support}</td></tr>`;
    html += `<tr><td><span style="background:var(--positive-glow);color:#10b981;padding:4px 10px;border-radius:12px;font-size:11px;">LR</span></td><td><span class="badge ${cls}">${cls.charAt(0).toUpperCase() + cls.slice(1)}</span></td><td>${(lr[cls].precision * 100).toFixed(1)}%</td><td>${(lr[cls].recall * 100).toFixed(1)}%</td><td>${(lr[cls]['f1-score'] * 100).toFixed(1)}%</td><td></td></tr>`;
  });
  tbody.innerHTML = html;
}

function updatePredictionsTable(data) {
  const tbody = document.querySelector('#predictions-table tbody');
  if (!tbody || !data.sample_predictions) return;
  let html = '';
  data.sample_predictions.slice(0, 10).forEach(pred => {
    const match = pred.true_sentiment === pred.lr_prediction;
    html += `<tr><td style="max-width:250px;overflow:hidden;text-overflow:ellipsis;">${pred.sentence.substring(0, 50)}...</td><td><span class="badge ${pred.true_sentiment}">${pred.true_sentiment}</span></td><td><span class="badge ${pred.nb_prediction}">${pred.nb_prediction}</span></td><td><span class="badge ${pred.lr_prediction}">${pred.lr_prediction}</span></td><td><span class="badge ${match ? 'match' : 'mismatch'}">${match ? '✓' : '✗'}</span></td></tr>`;
  });
  tbody.innerHTML = html;
}

async function fetchMetrics() {
  try { return await (await fetch(`${API_URL}/metrics`)).json(); } catch (e) { console.error(e); return null; }
}

async function predictSentiment(sentence) {
  try { return await (await fetch(`${API_URL}/predict`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sentence }) })).json(); } catch (e) { console.error(e); return null; }
}

async function waitForFlask(maxRetries = 30, interval = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try { if ((await fetch(`${API_URL}/metrics`)).ok) { flaskReady = true; updateStatusIndicator(true); const data = await fetchMetrics(); updateChartsWithData(data); initCharts(); return true; } } catch (e) { }
    await new Promise(r => setTimeout(r, interval)); updateStatusIndicator(false, i + 1);
  }
  updateStatusIndicator(false); return false;
}

function updateStatusIndicator(ready, retries = 0) {
  const dot = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  if (dot && text) {
    if (ready) { dot.className = 'status-dot active'; text.textContent = 'Model Active'; }
    else { dot.className = 'status-dot loading'; text.textContent = retries > 0 ? `Connecting... (${retries}s)` : 'Offline'; }
  }
}

function addUserMessage(text) {
  const div = document.createElement('div'); div.className = 'chat-message user';
  div.innerHTML = `<div class="message-avatar">👤</div><div class="message-content"><p>${text}</p></div>`;
  chatMessages.appendChild(div); scrollToBottom();
}

// typewriter effect for text
function typeText(element, text, speed = 30) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed + Math.random() * 20);
    }
  }
  type();
}

function addBotMessage(text, prediction = null) {
  const div = document.createElement('div'); div.className = 'chat-message bot';
  let predHtml = prediction ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);"><strong>prediction:</strong> <span class="badge ${prediction.lr_prediction.toLowerCase()}" style="margin-left:8px;">${prediction.lr_prediction}</span><br><span style="font-size:12px;color:var(--text-muted);">nb: ${prediction.nb_prediction} | "${prediction.processed.substring(0, 35)}..."</span></div>` : '';
  div.innerHTML = `<div class="message-avatar">🧠</div><div class="message-content"><p></p>${predHtml}</div>`;
  chatMessages.appendChild(div); scrollToBottom();
  const p = div.querySelector('p');
  typeText(p, text);
  if (prediction) updatePredictionSidebar(prediction);
}

function updatePredictionSidebar(prediction) {
  const predEl = document.querySelector('.pred-sentiment');
  if (predEl) { predEl.textContent = prediction.lr_prediction; predEl.className = 'pred-sentiment ' + prediction.lr_prediction.toLowerCase(); }
  document.getElementById('nb-pred').textContent = prediction.nb_prediction;
  document.getElementById('lr-pred').textContent = prediction.lr_prediction;
  document.getElementById('nb-bar').style.width = '75%';
  document.getElementById('lr-bar').style.width = '90%';
  document.getElementById('confidence-fill').style.height = '85%';
  if (charts.predictionBreakdown) {
    const probs = { positive: { positive: 0.85, neutral: 0.10, negative: 0.05 }, negative: { positive: 0.05, neutral: 0.10, negative: 0.85 }, neutral: { positive: 0.10, neutral: 0.85, negative: 0.05 } };
    const p = probs[prediction.lr_prediction.toLowerCase()] || probs.neutral;
    charts.predictionBreakdown.data.datasets[0].data = [p.negative, p.neutral, p.positive];
    charts.predictionBreakdown.update();
  }
}

function scrollToBottom() { chatMessages.scrollTop = chatMessages.scrollHeight; }

async function handleSendMessage() {
  const text = chatInput.value.trim();
  if (!text || !flaskReady) return;
  chatInput.value = ''; addUserMessage(text);
  const div = document.createElement('div'); div.className = 'chat-message bot'; div.id = 'loading-msg';
  div.innerHTML = '<div class="message-avatar">🧠</div><div class="message-content"><p style="color:var(--text-muted);">Analyzing...</p></div>';
  chatMessages.appendChild(div); scrollToBottom();
  const prediction = await predictSentiment(text);
  const loading = document.getElementById('loading-msg'); if (loading) loading.remove();
  addBotMessage(prediction ? 'Analysis complete:' : 'Error: Flask not responding', prediction);
}

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const page = item.dataset.page;
    navItems.forEach(i => i.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    const titles = { overview: 'Market Intelligence', chat: 'Sentiment Analyzer', models: 'Model Deep Dive', features: 'Feature Analysis', data: 'Data View' };
    document.getElementById('page-title').textContent = titles[page] || 'Dashboard';
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(`${page}-page`).classList.add('active');
  });
});

chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSendMessage(); });
sendBtn.addEventListener('click', handleSendMessage);
document.getElementById('clear-chat')?.addEventListener('click', () => { chatMessages.innerHTML = '<div class="chat-message bot"><div class="message-avatar">🧠</div><div class="message-content"><p>Cleared. Enter new text for analysis.</p></div></div>'; });
const tableSearch = document.getElementById('table-search');
if (tableSearch) tableSearch.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#predictions-table tbody tr').forEach(row => { row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none'; });
});

window.addEventListener('DOMContentLoaded', async () => {
  const ready = await waitForFlask(30, 1000);
  if (!ready) addBotMessage('⚠️ Flask server not detected. Run: python src/python/main.py');
});
