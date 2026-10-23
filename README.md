# Veloura Skin — AI Chatbot Showcase E-Commerce Store

Veloura Skin is a realistic, premium single-page demo e-commerce store built as a visual showcase for an AI chatbot widget. It runs entirely locally on **port 5500** with plain HTML, CSS, and Vanilla JavaScript (zero framework or npm runtime dependencies).

---

## 1. How to Run Locally (Port 5500)

> **Important:** The chatbot backend strictly requires the origin `http://localhost:5500`. Always serve this project on port 5500.

### Option A: Using npm / npx (Recommended)
From this directory (`c:/FWS/demo web 3 (Skincare)`):
```powershell
npm start
```
*This executes `npx serve -l 5500 .` as defined in `package.json`.*

### Option B: Using Python
If you prefer running without Node/npm:
```powershell
python -m http.server 5500
```

Once running, navigate to:
**[http://localhost:5500](http://localhost:5500)**

---

## 2. Connecting the Chatbot Widget

At the bottom of [`index.html`](file:///c:/FWS/demo%20web%203%20%28Skincare%29/index.html), find the commented integration block:

```html
<!-- ==========================================================================
     CHATBOT WIDGET INTEGRATION
     ========================================================================== -->
<script src="REPLACE_WITH_BACKEND_URL/widget/widget.js"
        data-api-url="REPLACE_WITH_BACKEND_URL"
        data-client-id="skincare-demo"
        data-title="Veloura Skin Assistant"
        data-greeting="Hi! I can help you find the right products for your skin. What's your skin type or main concern?"
        data-color="#7C9A82"
        defer></script>
```

### Steps to Point to Your Chatbot Backend:
1. Replace both instances of `REPLACE_WITH_BACKEND_URL` with your actual backend URL (for example: `http://localhost:3000`).
2. Example after replacement:
   ```html
   <script src="http://localhost:3000/widget/widget.js"
           data-api-url="http://localhost:3000"
           data-client-id="skincare-demo"
           data-title="Veloura Skin Assistant"
           data-greeting="Hi! I can help you find the right products for your skin. What's your skin type or main concern?"
           data-color="#7C9A82"
           defer></script>
   ```

> **Note on Widget Configuration Attributes:**  
> The attributes `data-title`, `data-greeting`, and `data-color` customize the widget header, initial message, and theme color. These attributes will only take effect if your widget script build parses and respects them; otherwise, the widget uses its default configuration.

---

## 3. Configuring the Chatbot Backend (CORS / Allowed Origins)

To allow the frontend running at `http://localhost:5500` to communicate with your chatbot backend without CORS errors:

1. Open your chatbot backend repository (e.g. `c:/FWS/chatbot/`).
2. Open its `.env` file or server configuration file.
3. Add `http://localhost:5500` to `ALLOWED_ORIGINS`:
   ```env
   ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
   ```
4. Restart your chatbot server so the new CORS origins take effect.

---

## 4. Seeding the Knowledge Base into the Chatbot

The knowledge base for Veloura Skin is located at:
[`knowledge/skincare-demo.md`](file:///c:/FWS/demo%20web%203%20%28Skincare%29/knowledge/skincare-demo.md)

It contains individual, self-contained chunks covering all 14 products, routines by skin type, ingredient pairing rules, shipping/returns policies, and gifting tips.

### Steps to Seed:
1. Copy [`knowledge/skincare-demo.md`](file:///c:/FWS/demo%20web%203%20%28Skincare%29/knowledge/skincare-demo.md) into your chatbot repository's knowledge directory:
   ```powershell
   Copy-Item "c:\FWS\demo web 3 (Skincare)\knowledge\skincare-demo.md" "c:\FWS\chatbot\knowledge\skincare-demo.md"
   ```
2. In your chatbot repository, seed the database / vector store with `client_id` set to `skincare-demo`. For example:
   ```powershell
   cd c:\FWS\chatbot
   node src/rag/seed.js --client skincare-demo --file knowledge/skincare-demo.md
   ```
   *(or whichever seeding script/command your chatbot backend uses)*

---

## 5. Screen Recording Showcase Script

Refer to [`DEMO_SCRIPT.md`](file:///c:/FWS/demo%20web%203%20%28Skincare%29/DEMO_SCRIPT.md) for:
- A 90-second recording timeline
- 6 realistic test questions (routine recommendation, budget under $40, ingredient compatibility, open product return policy, gift advice, and an out-of-scope question to demonstrate graceful handoff)
- Exact verification details for checking the bot's responses

---

## 6. Project File Structure

```
demo web 3 (Skincare)/
├── index.html               # Main single-page store with 10 sections & widget tag
├── css/
│   └── styles.css           # Styling system (Cream/Sage/Blush palette, responsive layout)
├── js/
│   ├── products.js          # Complete data for all 14 products & inline SVG generators
│   └── app.js               # Filtering, sorting, modal, drawer, FAQs, and toast logic
├── knowledge/
│   └── skincare-demo.md     # Chatbot RAG knowledge base chunks (client_id: skincare-demo)
├── DEMO_SCRIPT.md           # 90-second screen recording choreography & 6 test prompts
├── package.json             # Start script ("npx serve -l 5500 .")
└── README.md                # Setup, backend integration, and seeding instructions
```
