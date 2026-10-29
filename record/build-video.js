/**
 * ============================================================================
 * VIDEO ASSEMBLY & QUALITY CHECK PIPELINE
 * ============================================================================
 * Assembles raw scene recordings from record/output/raw/ into:
 *   - record/output/veloura-demo.mp4 (H.264, 1920x1080, 30fps with audio)
 *   - record/output/veloura-demo-silent.mp4 (no audio)
 *
 * Mixes background music at -22 dB with 2s fade-in and 3s fade-out.
 * Extracts 6 quality check frames to record/output/frames/.
 * ============================================================================
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const RECORD_DIR = __dirname;
const RAW_DIR = path.join(RECORD_DIR, 'output', 'raw');
const OUTPUT_DIR = path.join(RECORD_DIR, 'output');
const FRAMES_DIR = path.join(OUTPUT_DIR, 'frames');
const ASSETS_DIR = path.join(RECORD_DIR, 'assets');
const MUSIC_PATH = path.join(ASSETS_DIR, 'music.mp3');

// Resolve FFmpeg path
function resolveFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return 'ffmpeg';
  } catch (_) { }

  // Check common Windows WinGet / Chocolatey paths
  const commonPaths = [
    'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
    'C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Links', 'ffmpeg.exe'),
  ];

  for (const p of commonPaths) {
    if (fs.existsSync(p)) return `"${p}"`;
  }

  // Scan WinGet packages directory for Gyan.FFmpeg
  try {
    const wingetPackages = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WinGet', 'Packages');
    if (fs.existsSync(wingetPackages)) {
      const entries = fs.readdirSync(wingetPackages);
      for (const entry of entries) {
        if (entry.toLowerCase().includes('ffmpeg')) {
          const possible = path.join(wingetPackages, entry);
          const binDir = fs.readdirSync(possible).find((f) => f.toLowerCase().includes('ffmpeg'));
          if (binDir) {
            const target = path.join(possible, binDir, 'bin', 'ffmpeg.exe');
            if (fs.existsSync(target)) return `"${target}"`;
          }
        }
      }
    }
  } catch (_) { }

  return null;
}

async function main() {
  console.log('\n============================================================');
  console.log('[Assembly] Starting Video Build & Quality Checks');
  console.log('============================================================\n');

  // Preflight: FFmpeg check
  const ffmpeg = resolveFFmpeg();
  if (!ffmpeg) {
    console.error('[Assembly ERROR] FFmpeg is not installed or not in PATH.');
    console.error('\nTo install FFmpeg on Windows, open PowerShell and run:');
    console.error('  winget install Gyan.FFmpeg\n');
    console.error('Then restart your terminal and run "npm run build-video" again.');
    process.exit(1);
  }
  console.log(`[Assembly] ✓ Using FFmpeg: ${ffmpeg}`);

  // Preflight: Music check
  if (!fs.existsSync(MUSIC_PATH)) {
    console.error(`[Assembly ERROR] Music file is missing at: ${MUSIC_PATH}`);
    console.error('Please place your soundtrack at record/assets/music.mp3 and re-run.');
    process.exit(1);
  }
  console.log(`[Assembly] ✓ Music file found: ${MUSIC_PATH}`);

  // Ensure directories
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(FRAMES_DIR, { recursive: true });

  // List of expected scene files
  const scenes = [
    { name: 'scene-1-title.webm', required: true },
    { name: 'scene-2-intro.webm', required: true },
    { name: 'scene-3-chat.webm', required: true },
    { name: 'scene-4-mobile.webm', required: true, isMobile: true },
    { name: 'scene-5-end.webm', required: true },
  ];

  // Verify all scene clips exist
  for (const s of scenes) {
    const fullPath = path.join(RAW_DIR, s.name);
    if (!fs.existsSync(fullPath)) {
      console.error(`[Assembly ERROR] Missing raw scene recording: ${fullPath}`);
      console.error('Please run "npm run record" first to generate raw scene clips.');
      process.exit(1);
    }
  }

  console.log('[Assembly] Normalizing raw clips to 1920x1080 30fps H.264...');
  const normalizedClips = [];

  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const src = path.join(RAW_DIR, s.name);
    const dest = path.join(OUTPUT_DIR, `norm-${i + 1}.mp4`);

    console.log(`[Assembly] Processing Scene ${i + 1}: ${s.name}...`);

    let filter = 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#F4F1EC,setsar=1,fps=30';
    if (s.isMobile) {
      // Scale mobile viewport with elegant letterbox on cream background
      filter = 'scale=-1:920,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#EFEBE4,setsar=1,fps=30';
    }

    const cmd = `${ffmpeg} -y -i "${src}" -vf "${filter}" -c:v libx264 -pix_fmt yuv420p -r 30 -an "${dest}"`;
    execSync(cmd, { stdio: 'inherit' });
    normalizedClips.push(dest);
  }

  // Concatenate scenes
  console.log('\n[Assembly] Concatenating scenes into master silent track...');
  const concatListPath = path.join(OUTPUT_DIR, 'concat_list.txt');
  const concatFileContent = normalizedClips.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n');
  fs.writeFileSync(concatListPath, concatFileContent, 'utf-8');

  const silentVideoPath = path.join(OUTPUT_DIR, 'veloura-demo-silent.mp4');
  const concatCmd = `${ffmpeg} -y -f concat -safe 0 -i "${concatListPath}" -c copy "${silentVideoPath}"`;
  execSync(concatCmd, { stdio: 'inherit' });
  console.log(`[Assembly] ✓ Exported silent master: ${silentVideoPath}`);

  // Query duration of the assembled video
  let totalSeconds = 75;
  try {
    execSync(`${ffmpeg} -i "${silentVideoPath}"`, { stdio: 'pipe' });
  } catch (err) {
    const durOutput = (err.stdout?.toString() || '') + (err.stderr?.toString() || '');
    const durMatch = durOutput.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (durMatch) {
      totalSeconds = parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3]);
    }
  }
  console.log(`[Assembly] Total assembled duration: ${totalSeconds.toFixed(1)}s`);

  // Audio mix with music: -22dB under chat, 2s fade in, 3s fade out, trimmed to total duration
  console.log('\n[Assembly] Mixing background audio track...');
  const finalVideoPath = path.join(OUTPUT_DIR, 'veloura-demo.mp4');
  const fadeOutStart = Math.max(0, totalSeconds - 3);

  const audioFilter = `volume=0.08,afade=t=in:ss=0:d=2,afade=t=out:st=${fadeOutStart.toFixed(2)}:d=3`;
  const mixCmd = `${ffmpeg} -y -i "${silentVideoPath}" -i "${MUSIC_PATH}" -filter_complex "[1:a]${audioFilter}[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest "${finalVideoPath}"`;
  execSync(mixCmd, { stdio: 'inherit' });
  console.log(`[Assembly] ✓ Exported full audio master: ${finalVideoPath}`);

  // Clean up intermediate files
  fs.unlinkSync(concatListPath);
  normalizedClips.forEach((p) => {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  });

  // Quality checks: Extract 6 evenly spaced frames
  console.log('\n[Assembly] Extracting 6 evenly spaced review frames to record/output/frames/...');

  let finalDuration = totalSeconds;
  try {
    execSync(`${ffmpeg} -i "${finalVideoPath}"`, { stdio: 'pipe' });
  } catch (err) {
    const durOutput = (err.stdout?.toString() || '') + (err.stderr?.toString() || '');
    const durMatch = durOutput.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
    if (durMatch) {
      finalDuration = parseInt(durMatch[1]) * 3600 + parseInt(durMatch[2]) * 60 + parseFloat(durMatch[3]);
    }
  }

  const intervals = [
    { name: 'frame-1-title.jpg', time: 2.0, desc: 'Scene 1: Title Card' },
    { name: 'frame-2-intro.jpg', time: 7.0, desc: 'Scene 2: Store Showcase & Caption' },
    { name: 'frame-3-routine.jpg', time: 22.0, desc: 'Scene 3: Question 1 (Routines)' },
    { name: 'frame-4-pairing.jpg', time: 42.0, desc: 'Scene 3: Question 3 (Ingredient Pairing)' },
    { name: 'frame-5-mobile.jpg', time: Math.min(finalDuration - 8, 85.0), desc: 'Scene 4: Mobile Viewport 390px' },
    { name: 'frame-6-endcard.jpg', time: Math.max(0, finalDuration - 2.5), desc: 'Scene 5: End Card Portfolio Identity' },
  ];

  for (const item of intervals) {
    const framePath = path.join(FRAMES_DIR, item.name);
    try {
      const extractCmd = `${ffmpeg} -y -ss ${item.time.toFixed(2)} -i "${finalVideoPath}" -frames:v 1 -q:v 2 "${framePath}"`;
      execSync(extractCmd, { stdio: 'ignore' });
      console.log(`[Quality Check] Saved ${item.name} (${item.desc})`);
    } catch (_) {}
  }

  // Print Transcript & Verification Summary
  const transcriptPath = path.join(OUTPUT_DIR, 'transcript.json');
  if (fs.existsSync(transcriptPath)) {
    console.log('\n============================================================');
    console.log('[Quality Check] REAL BOT TRANSCRIPT VERIFICATION');
    console.log('============================================================');
    const items = JSON.parse(fs.readFileSync(transcriptPath, 'utf-8'));
    items.forEach((it, idx) => {
      console.log(`\nQ${idx + 1}: ${it.question}`);
      console.log(`BOT ANSWER:\n${it.reply}`);
    });
  }

  console.log('\n============================================================');
  console.log('[Assembly Complete]');
  console.log(`Final Video (with audio): ${finalVideoPath}`);
  console.log(`Final Video (silent):     ${silentVideoPath}`);
  console.log(`Review Frames Directory:  ${FRAMES_DIR}`);
  console.log('============================================================\n');
}

main().catch((err) => {
  console.error('[Assembly FATAL ERROR]', err);
  process.exit(1);
});
