/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* BASE */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  background: #f4f6fb;
  color: #111827;
  line-height: 1.6;
}

/* HEADER */
.top {
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #fff;
  text-align: center;
  padding: 28px 16px;
}

.top h1 {
  font-size: 30px;
  font-weight: 700;
}

.top p {
  opacity: 0.9;
  margin-top: 6px;
}

/* TABS */
.tabs {
  display: flex;
  justify-content: center;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.tab {
  background: none;
  border: none;
  padding: 14px 20px;
  cursor: pointer;
  font-size: 15px;
  color: #374151;
}

.tab:hover {
  background: #f1f5f9;
}

.tab.active {
  color: #2563eb;
  font-weight: 600;
  border-bottom: 3px solid #2563eb;
}

/* SECTIONS */
.tabContent {
  display: none;
  max-width: 1100px;
  margin: auto;
  padding: 20px;
}

.tabContent.active {
  display: block;
}

/* UPLOAD */
.upload-box {
  border: 2px dashed #c7d2fe;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  background: #eef2ff;
}

.upload-box input {
  margin-bottom: 10px;
}

/* GRID */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
  margin-top: 20px;
}

.tools-grid button {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.tools-grid button:hover {
  border-color: #2563eb;
  color: #2563eb;
}

/* SLIDERS */
.slider-box {
  background: #ffffff;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 14px;
  border: 1px solid #e5e7eb;
}

.slider-box label {
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}

.slider-box input {
  width: 100%;
}

/* UTILITIES */
.utility-box {
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
}

.utility-box h3 {
  margin-bottom: 10px;
}

.utility-box input {
  padding: 8px;
  margin-right: 6px;
  width: 140px;
}

.utility-box button {
  padding: 8px 12px;
}

/* RESULT */
.result {
  text-align: center;
  padding: 20px;
}

canvas {
  max-width: 100%;
  border-radius: 10px;
  margin-top: 10px;
}

#download {
  display: inline-block;
  margin-top: 12px;
  background: #2563eb;
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  text-decoration: none;
}

/* FOOTER */
footer {
  text-align: center;
  padding: 16px;
  font-size: 14px;
  color: #6b7280;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .top h1 {
    font-size: 24px;
  }

  .tabs {
    flex-wrap: wrap;
  }

  .tab {
    flex: 1;
    text-align: center;
  }
}
