/**
 * ============================================================================
 * AUTOMATED DEMO VIDEO RECORDER FOR VELOURA SKIN AI ASSISTANT
 * ============================================================================
 * Records the real website at http://localhost:5500 with the real chatbot
 * widget connected to http://localhost:3000 using Playwright.
 *
 * Run full recording: npm run record
 * Re-record chat only: npm run record -- --scene=chat
 * ============================================================================
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURATION: ALL QUESTIONS, CAPTIONS, TIMINGS, AND CARD TEXT
// ============================================================================
export const CONFIG = {
  // URLs
  siteUrl: 'http://localhost:5500',
  backendHealthUrl: 'http://localhost:3000/health',

  // Editable Agency / Portfolio Identity Constants
  agencyName: 'FWS Solutions',
  agencyContact: '',

  // Viewport Settings
  desktopViewport: { width: 1920, height: 1080 },
  mobileViewport: { width: 390, height: 844 },

  // Scene Timings & Holds (in milliseconds)
  timings: {
    titleCardHoldMs: 4000,
    siteIntroDurationMs: 6000,
    mobileDurationMs: 8000,
    endCardHoldMs: 5000,
    replyReadHoldMs: 2500,
    replyTimeoutMs: 25000,
    actionPauseMinMs: 600,
    actionPauseMaxMs: 1000,
    keyDelayMinMs: 45,
    keyDelayMaxMs: 70,
  },

  // 4 Core Desktop Chat Questions & Captions
  chatQuestions: [
    {
      id: 'routine',
      q: 'I have oily, acne-prone skin. Can you build me a simple morning and night routine?',
      caption: 'Builds routines for your skin type',
    },
    {
      id: 'gifting',
      q: 'My sister has dry, sensitive skin. What would you recommend for her?',
      caption: "Tailors advice to someone else's skin",
    },
    {
      id: 'pairing',
      q: 'Can I use the vitamin C serum and retinol together?',
      caption: 'Knows which ingredients work together',
    },
    {
      id: 'contraindication',
      q: 'I have sensitive skin. Is the retinol serum okay for me?',
      caption: "Flags what's not suitable for sensitive skin",
    },
  ],

  // Mobile Question & Caption
  mobileQuestion: {
    q: 'What should I use under $30?',
    caption: 'Works on mobile too',
  },

  // Output Paths
  outputDir: path.join(__dirname, 'output'),
  rawDir: path.join(__dirname, 'output', 'raw'),
};

// ============================================================================
// UTILITY FUNCTIONS: HUMAN-LIKE EASING, CURSOR, AND TYPING
// ============================================================================

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

async function humanPause() {
  await sleep(randomBetween(CONFIG.timings.actionPauseMinMs, CONFIG.timings.actionPauseMaxMs));
}

// Injects custom cursor and ripple visualizer
async function injectHumanCursor(page) {
  await page.addInitScript(() => {
    if (window.__CURSOR_INJECTED__) return;
    window.__CURSOR_INJECTED__ = true;

    const cursor = document.createElement('div');
    cursor.id = 'playwright-human-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(124, 154, 130, 0.45);
      border: 2px solid #FFFFFF;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      z-index: 2147483647;
      transform: translate(-50%, -50%);
      transition: transform 0.04s ease-out, width 0.15s ease, height 0.15s ease;
      top: 50%;
      left: 50%;
    `;
    document.documentElement.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    window.addEventListener('mousedown', (e) => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.85)';
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid rgba(124, 154, 130, 0.9);
        pointer-events: none;
        z-index: 2147483646;
        transform: translate(-50%, -50%);
        animation: cursor-ripple 0.45s ease-out forwards;
      `;
      document.documentElement.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });

    window.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes cursor-ripple {
        0% { width: 10px; height: 10px; opacity: 1; }
        100% { width: 44px; height: 44px; opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  });
}

// Injects on-page caption pill at bottom-left (clear of bottom-right widget)
async function injectCaptionBar(page) {
  await page.addInitScript(() => {
    if (window.__CAPTION_BAR_INJECTED__) return;
    window.__CAPTION_BAR_INJECTED__ = true;

    const bar = document.createElement('div');
    bar.id = 'demo-caption-bar';
    bar.style.cssText = `
      position: fixed;
      bottom: 38px;
      left: 42px;
      background: rgba(20, 22, 21, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #FAF8F5;
      padding: 14px 28px;
      border-radius: 999px;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.015em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.16);
      z-index: 999900;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.35s ease, transform 0.35s ease;
      pointer-events: none;
      max-width: 900px;
      white-space: nowrap;
    `;
    document.documentElement.appendChild(bar);

    window.setDemoCaption = (text) => {
      if (!text) {
        bar.style.opacity = '0';
        bar.style.transform = 'translateY(12px)';
      } else {
        bar.textContent = text;
        bar.style.opacity = '1';
        bar.style.transform = 'translateY(0)';
      }
    };
  });
}

async function setCaption(page, text) {
  await page.evaluate((t) => window.setDemoCaption && window.setDemoCaption(t), text);
}

// Smooth cursor travel with cubic easing
async function moveMouseSmoothly(page, targetX, targetY, steps = 28) {
  const current = page.__currentMouse || { x: 960, y: 540 };
  const startX = current.x;
  const startY = current.y;

  for (let i = 1; i <= steps; i++) {
    const progress = i / steps;
    // Cubic ease-out curve
    const ease = 1 - Math.pow(1 - progress, 3);
    const x = startX + (targetX - startX) * ease;
    const y = startY + (targetY - startY) * ease;
    await page.mouse.move(x, y);
    await sleep(12);
  }
  page.__currentMouse = { x: targetX, y: targetY };
}

// Types with humanized per-key delay
async function humanType(page, locator, text) {
  const box = await locator.boundingBox();
  if (box) {
    await moveMouseSmoothly(page, box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await sleep(80);
    await page.mouse.up();
  } else {
    await locator.click();
  }
  await humanPause();

  for (const char of text) {
    await page.keyboard.type(char, { delay: randomBetween(CONFIG.timings.keyDelayMinMs, CONFIG.timings.keyDelayMaxMs) });
  }
}

// ============================================================================
// WIDGET INTERACTION VIA PLAYWRIGHT OPEN-SHADOW PIERCING
// ============================================================================

async function openChatWidget(page) {
  console.log('[Recorder] Locating widget launcher inside open shadow DOM...');
  const launcher = page.locator('#chatLauncher');

  if (await launcher.count() > 0) {
    const box = await launcher.boundingBox();
    if (box) {
      console.log(`[Recorder] Moving mouse to launcher at (${Math.round(box.x)}, ${Math.round(box.y)})...`);
      await moveMouseSmoothly(page, box.x + box.width / 2, box.y + box.height / 2);
      await humanPause();
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      await launcher.click();
    }
  } else {
    console.warn('[Recorder] Shadow locator fallback: clicking bottom-right coordinate (1896, 1056)...');
    await moveMouseSmoothly(page, 1890, 1050);
    await page.mouse.click(1890, 1050);
  }

  const panel = page.locator('#chatPanel');
  await panel.waitFor({ state: 'visible', timeout: 6000 });
  console.log('[Recorder] Chat panel is open and visible.');
  await humanPause();
}

async function askQuestionAndWaitForReply(page, question, caption) {
  console.log(`\n------------------------------------------------------------`);
  console.log(`[Recorder] Asking: "${question}"`);
  console.log(`[Recorder] Caption: "${caption}"`);
  console.log(`------------------------------------------------------------`);

  await setCaption(page, caption);

  const botMessages = page.locator('.message-wrapper.bot');
  const initialBotCount = await botMessages.count();

  const chatInput = page.locator('#chatInput');
  await humanType(page, chatInput, question);
  await humanPause();

  // Submit via Enter
  await page.keyboard.press('Enter');
  console.log('[Recorder] Message sent. Waiting for bot reply stream...');

  // Wait for new bot message element to mount
  const startTime = Date.now();
  while (Date.now() - startTime < CONFIG.timings.replyTimeoutMs) {
    const count = await botMessages.count();
    if (count > initialBotCount) break;
    await sleep(250);
  }

  const currentCount = await botMessages.count();
  if (currentCount <= initialBotCount) {
    throw new Error(`[Recorder Error] Timed out waiting for bot reply to question: "${question}"`);
  }

  const latestBotBubble = botMessages.nth(currentCount - 1);
  const typingIndicator = page.locator('#typingIndicator');

  // Stream completion detection: typing indicator gone AND text stable for 1.5s
  let lastText = '';
  let stableSince = Date.now();

  while (Date.now() - startTime < CONFIG.timings.replyTimeoutMs) {
    const text = (await latestBotBubble.innerText()).trim();
    const isTyping = await typingIndicator.isVisible().catch(() => false);

    if (text !== lastText) {
      lastText = text;
      stableSince = Date.now();
    } else if (!isTyping && Date.now() - stableSince >= 1500 && text.length > 10) {
      console.log('[Recorder] Bot reply stream has finished and stabilized.');
      break;
    }
    await sleep(200);
  }

  const finalText = (await latestBotBubble.innerText()).trim();
  console.log(`[Recorder] REAL BOT REPLY:\n${finalText}\n`);

  // Hold for readability
  console.log(`[Recorder] Holding ${CONFIG.timings.replyReadHoldMs / 1000}s for reading...`);
  await sleep(CONFIG.timings.replyReadHoldMs);

  return { question, reply: finalText };
}

// ============================================================================
// SCENE IMPLEMENTATIONS
// ============================================================================

// Scene 1: Title Card (4 s)
async function recordTitleCard(browser) {
  console.log('\n[Recorder] === SCENE 1: Title Card (4s) ===');
  const context = await browser.newContext({
    viewport: CONFIG.desktopViewport,
    recordVideo: { dir: CONFIG.rawDir, size: CONFIG.desktopViewport },
  });
  const page = await context.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          background: radial-gradient(circle at 50% 45%, #FAF8F5 0%, #EFEBE4 100%);
          color: #141615;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .tag {
          color: #7C9A82;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          background: rgba(124, 154, 130, 0.14);
          padding: 8px 22px;
          border-radius: 999px;
          margin-bottom: 24px;
        }
        h1 {
          font-size: 64px;
          font-weight: 800;
          letter-spacing: -0.035em;
          margin: 0 0 18px 0;
          line-height: 1.1;
        }
        p {
          font-size: 26px;
          color: #68706B;
          margin: 0;
          font-weight: 400;
        }
      </style>
    </head>
    <body>
      <div class="tag">[ AI CHATBOT PORTFOLIO DEMO ]</div>
      <h1>AI skincare assistant</h1>
      <p>A custom chatbot demo</p>
    </body>
    </html>
  `;

  await page.setContent(html);
  await sleep(CONFIG.timings.titleCardHoldMs);
  await page.close();
  await context.close();

  const video = page.video();
  if (video) {
    const rawPath = await video.path();
    const dest = path.join(CONFIG.rawDir, 'scene-1-title.webm');
    fs.renameSync(rawPath, dest);
    console.log(`[Recorder] Saved Scene 1 video: ${dest}`);
  }
}

// Scene 2: Site Intro (6 s)
async function recordSiteIntro(browser) {
  console.log('\n[Recorder] === SCENE 2: Site Intro (6s) ===');
  const context = await browser.newContext({
    viewport: CONFIG.desktopViewport,
    recordVideo: { dir: CONFIG.rawDir, size: CONFIG.desktopViewport },
  });
  const page = await context.newPage();
  await injectHumanCursor(page);
  await injectCaptionBar(page);

  await page.goto(CONFIG.siteUrl);
  await page.waitForLoadState('networkidle');
  await sleep(600);

  await setCaption(page, 'A real store. A custom assistant built for it.');
  await sleep(1200);

  // Smooth scroll down
  await page.evaluate(() => window.scrollBy({ top: 650, behavior: 'smooth' }));
  await sleep(2200);

  // Smooth scroll back up
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await sleep(1600);

  await setCaption(page, '');
  await sleep(400);

  await page.close();
  await context.close();

  const video = page.video();
  if (video) {
    const rawPath = await video.path();
    const dest = path.join(CONFIG.rawDir, 'scene-2-intro.webm');
    fs.renameSync(rawPath, dest);
    console.log(`[Recorder] Saved Scene 2 video: ${dest}`);
  }
}

// Scene 3: Desktop Chat (approx 45-55 s)
async function recordChat(browser) {
  console.log('\n[Recorder] === SCENE 3: Real Chatbot Interaction ===');
  const context = await browser.newContext({
    viewport: CONFIG.desktopViewport,
    recordVideo: { dir: CONFIG.rawDir, size: CONFIG.desktopViewport },
  });
  const page = await context.newPage();
  await injectHumanCursor(page);
  await injectCaptionBar(page);

  await page.goto(CONFIG.siteUrl);
  await page.waitForLoadState('networkidle');
  await sleep(800);

  // Open the widget
  await openChatWidget(page);

  const transcripts = [];

  for (const item of CONFIG.chatQuestions) {
    const result = await askQuestionAndWaitForReply(page, item.q, item.caption);
    transcripts.push(result);
  }

  // Clear caption and brief hold before scene close
  await setCaption(page, '');
  await sleep(1000);

  await page.close();
  await context.close();

  const video = page.video();
  if (video) {
    const rawPath = await video.path();
    const dest = path.join(CONFIG.rawDir, 'scene-3-chat.webm');
    fs.renameSync(rawPath, dest);
    console.log(`[Recorder] Saved Scene 3 video: ${dest}`);
  }

  // Save transcripts to JSON
  const transcriptPath = path.join(CONFIG.outputDir, 'transcript.json');
  fs.writeFileSync(transcriptPath, JSON.stringify(transcripts, null, 2), 'utf-8');
  console.log(`[Recorder] Saved chat transcript to: ${transcriptPath}`);

  return transcripts;
}

// Scene 4: Mobile Viewport (8 s)
async function recordMobile(browser) {
  console.log('\n[Recorder] === SCENE 4: Mobile Experience (8s) ===');
  const context = await browser.newContext({
    viewport: CONFIG.mobileViewport,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',
    recordVideo: { dir: CONFIG.rawDir, size: CONFIG.mobileViewport },
  });

  const page = await context.newPage();
  await injectHumanCursor(page);
  await injectCaptionBar(page);

  await page.goto(CONFIG.siteUrl);
  await page.waitForLoadState('networkidle');
  await sleep(1000);

  await setCaption(page, CONFIG.mobileQuestion.caption);
  await sleep(1000);

  await openChatWidget(page);
  await askQuestionAndWaitForReply(page, CONFIG.mobileQuestion.q, CONFIG.mobileQuestion.caption);

  await setCaption(page, '');
  await sleep(800);

  await page.close();
  await context.close();

  const video = page.video();
  if (video) {
    const rawPath = await video.path();
    const dest = path.join(CONFIG.rawDir, 'scene-4-mobile.webm');
    fs.renameSync(rawPath, dest);
    console.log(`[Recorder] Saved Scene 4 video: ${dest}`);
  }
}

// Scene 5: End Card (5 s)
async function recordEndCard(browser) {
  console.log('\n[Recorder] === SCENE 5: End Card (5s) ===');
  const context = await browser.newContext({
    viewport: CONFIG.desktopViewport,
    recordVideo: { dir: CONFIG.rawDir, size: CONFIG.desktopViewport },
  });
  const page = await context.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          background: #141615;
          color: #FAF8F5;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        h2 {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 16px 0;
        }
        p {
          font-size: 24px;
          color: #A3A8A4;
          margin: 0 0 42px 0;
        }
        .box {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }
        .pill {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.22);
          padding: 12px 32px;
          border-radius: 999px;
          font-family: monospace;
          font-size: 20px;
          color: #DFEBE2;
          letter-spacing: 0.05em;
        }
      </style>
    </head>
    <body>
      <h2>Custom AI chatbots for your online store</h2>
      <p>Grounded in your catalog, policies, and brand voice.</p>
      <div class="box">
        <div class="pill">${CONFIG.agencyName}</div>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await sleep(CONFIG.timings.endCardHoldMs);
  await page.close();
  await context.close();

  const video = page.video();
  if (video) {
    const rawPath = await video.path();
    const dest = path.join(CONFIG.rawDir, 'scene-5-end.webm');
    fs.renameSync(rawPath, dest);
    console.log(`[Recorder] Saved Scene 5 video: ${dest}`);
  }
}

// ============================================================================
// PREFLIGHT CHECK & MAIN EXECUTION
// ============================================================================

async function preflight() {
  console.log('[Preflight] Verifying site and backend health...');

  try {
    const siteRes = await fetch(CONFIG.siteUrl);
    if (!siteRes.ok) throw new Error(`Site returned HTTP ${siteRes.status}`);
    console.log(`[Preflight] ✓ Site reachable at ${CONFIG.siteUrl}`);
  } catch (err) {
    console.error(`[Preflight FAIL] Site is not reachable at ${CONFIG.siteUrl}. Ensure "npm start" is running on port 5500.`);
    process.exit(1);
  }

  try {
    const backendRes = await fetch(CONFIG.backendHealthUrl);
    if (!backendRes.ok) throw new Error(`Backend health returned HTTP ${backendRes.status}`);
    const health = await backendRes.json();
    console.log(`[Preflight] ✓ Backend healthy at ${CONFIG.backendHealthUrl}:`, health);
  } catch (err) {
    console.error(`[Preflight FAIL] Backend health check failed at ${CONFIG.backendHealthUrl}. Ensure your chatbot backend is running.`);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const sceneArg = args.find((a) => a.startsWith('--scene='))?.split('=')[1] || 'all';

  await preflight();

  // Ensure directories exist
  fs.mkdirSync(CONFIG.rawDir, { recursive: true });

  console.log(`[Recorder] Launching visible Chromium browser...`);
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized', '--disable-blink-features=AutomationControlled'],
  });

  let transcripts = [];

  try {
    if (sceneArg === 'all' || sceneArg === 'title') {
      await recordTitleCard(browser);
    }
    if (sceneArg === 'all' || sceneArg === 'intro') {
      await recordSiteIntro(browser);
    }
    if (sceneArg === 'all' || sceneArg === 'chat') {
      transcripts = await recordChat(browser);
    }
    if (sceneArg === 'all' || sceneArg === 'mobile') {
      await recordMobile(browser);
    }
    if (sceneArg === 'all' || sceneArg === 'end') {
      await recordEndCard(browser);
    }

    console.log('\n============================================================');
    console.log('[Recorder] All requested scenes recorded successfully!');
    console.log(`[Recorder] Raw clips saved in: ${CONFIG.rawDir}`);
    console.log('To assemble final video with music and frames, run: npm run build-video');
    console.log('============================================================\n');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('[Recorder FATAL ERROR]', err);
  process.exit(1);
});
