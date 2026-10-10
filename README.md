# Nani Teer wali

Arrow puzzle game (15 levels). Pure HTML/CSS/JS, no build step.

## Folder structure
```
index.html              the whole game
manifest.webmanifest    app name + icons (PWA)
sw.js                   offline support (service worker)
icons/                  icon-192.png, icon-512.png, icon-maskable-512.png
assets/audio/           app_start.mp3  correct.mp3  wrong_move.mp3  winning.mp3  bgm.mp3
assets/img/             bg.jpg (page background)  avatar.jpg (round picture in the header)
```

## Sounds
- app_start.mp3 = plays when you press Play / Continue
- correct.mp3 = right move (arrow escapes)   [simple placeholder, replace with your own]
- wrong_move.mp3 = blocked / wrong move
- winning.mp3 = level complete
- bgm.mp3 = optional background loop, switch it on with the Music button   [placeholder]

Replace a file with the same name, or change the paths and volumes in CONFIG at the top of the script in index.html.
After replacing files, change `VERSION` in sw.js (for example ntw-v2) so phones pick up the new files.

## Testing
Add `?unlock` to the URL to open all levels.
