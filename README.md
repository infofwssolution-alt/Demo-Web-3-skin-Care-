# Veloura Skin — AI Chatbot Showcase E-Commerce Store

Veloura Skin is a premium single-page demo e-commerce store built as a visual showcase for an embeddable AI chatbot widget. The entire setup runs strictly locally with the site served on fixed port **5500** and the chatbot backend on port **3000**.

---

## 🚀 Quick Start: Full Local Setup

Follow these 4 steps in order to start and run the complete showcase locally:

### Step 1: Start the Chatbot Backend (Port 3000)
Open a terminal in the chatbot project directory (`c:\FWS\chatbot`):
```powershell
npm run dev
```
Verify the server is healthy:
```powershell
curl http://localhost:3000/health
# Expected output: {"status":"ok","mongodb":"connected",...}
```

### Step 2: Seed the Knowledge Base
Seed the chatbot vector store using the verified knowledge base chunks with client ID `skincare-demo`:
```powershell
node src/rag/seed.js --client skincare-demo --file "../demo web 3 (Skincare)/knowledge/skincare-demo.md"
```
*(or your chatbot project's dedicated seed command)*

### Step 3: Start the Website (Port 5500)
In this directory (`c:\FWS\demo web 3 (Skincare)`):
```powershell
npm start
```
The site starts on fixed port **5500** (`http://localhost:5500`).

### Step 4: Open and Test
Open your browser and navigate to:
**[http://localhost:5500](http://localhost:5500)**

- The widget bubble appears in the bottom-right corner.
- Click the bubble to open the assistant panel.
- Refer to [`DEMO_SCRIPT.md`](file:///c:/FWS/demo%20web%203%20%28Skincare%29/DEMO_SCRIPT.md) for the 90-second screen recording script and the 5 test questions.

---

## 🔌 Chatbot Widget Integration Details

The widget script tag in [`index.html`](file:///c:/FWS/demo%20web%203%20%28Skincare%29/index.html) is connected as follows:

```html
<script src="http://localhost:3000/widget/widget.js"
        data-api-url="http://localhost:3000"
        data-client-id="skincare-demo"
        data-title="Veloura Skin Assistant"
        data-greeting="Hi! I can help you find the right products for your skin. What's your skin type or main concern?"
        data-color="#9370DB"
        defer></script>
```

### CORS Configuration
The backend strictly allows requests originating from `http://localhost:5500`. Ensure `ALLOWED_ORIGINS` in `chatbot/.env` includes:
```env
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
```

---

## 🧪 Verified Test Questions & Bot Phrasing

| # | Question Prompt | Expected Live Bot Behavior | Matches Site |
|---|---|---|---|
| 1 | `"I have oily, acne-prone skin and a budget of $40. What should I use?"` | Recommends Clear Balance Gel Cleanser ($19), Calm Niacinamide ($28), Clay Reset Mask ($24), or Weightless Water Gel ($29). Suggests cleanser ($19) as initial foundation under budget. | **YES** |
| 2 | `"Can I use the vitamin C serum together with retinol?"` | Explains NOT to use together in the same step: Glow Vitamin C in AM with SPF 50, Renew Retinol in PM. | **YES** |
| 3 | `"What's your return policy if I already opened a product?"` | Confirms 30-day return/exchange on opened items causing irritation, pre-paid return shipping label, 5–7 day refund. | **YES** |
| 4 | `"What would be a good gift under $35?"` | Curates gifts under $35: Overnight Dew Mask ($31), Glow Vitamin C Serum ($34), and Mineral Sheer SPF 30 ($27). | **YES** |
| 5 | `"Do you ship to Canada?"` | International shipping is omitted from knowledge; bot gracefully falls back (*"I'm not sure, let me get you in touch with the team."*) and opens lead capture form. | **YES** |

---

## 📱 Mobile & Layout Clearance Guarantee

- The widget bubble sits at `bottom: 24px; right: 24px; z-index: 999990`.
- The slide-out cart drawer and modals are set with proper z-indexing and responsive bottom padding (`pb-24 sm:pb-6`), ensuring neither overlaps or hides the widget bubble on 390px mobile viewports or with the shopping cart open.

---

## 📁 Project Structure

```
demo web 3 (Skincare)/
├── index.html               # Main homepage featuring 3D product visual & widget script
├── shop.html                # Full catalog page with search, filters, and widget
├── contact.html             # Policy FAQs (shipping, returns, pairing) and widget
├── about.html               # Brand philosophy & ingredient standards with widget
├── css/
│   └── styles.css           # Vanilla CSS stylesheet with responsive layout rules
├── js/
│   ├── products.js          # Full data for 14 products & procedural SVGs
│   └── app.js               # Modal, cart drawer, toast, and filter logic
├── knowledge/
│   └── skincare-demo.md     # Verified 31-chunk RAG knowledge base
├── DEMO_SCRIPT.md           # 90-second recording sequence & verified bot questions
├── package.json             # Dev / start scripts
└── README.md                # Full local run guide and verification notes
```
