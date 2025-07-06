// content.js

function removeAds() {
  // Select common YouTube ad elements
  const adSelectors = [
    '.ytp-ad-overlay-slot',
    '.ytp-ad-text-overlay',
    '.ytp-ad-image-overlay',
    '.ytp-ad-skip-button',
    '.ytp-ad-preview-text',
    '.ytp-ad-player-overlay',
    '.ad-container',
    '.ad-div',
    '.video-ads',
    'ytd-promoted-sparkles-text-renderer',
    'ytd-compact-promoted-video-renderer',
    'ytd-display-ad-renderer',
    'ytd-ad-slot-renderer',
    'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]'
  ];

  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.remove();
    });
  });

  // For pre-roll/mid-roll video ads, try to skip or fast-forward
  const videoAd = document.querySelector('.html5-main-video');
  if (videoAd) {
    const skipButton = document.querySelector('.ytp-ad-skip-button');
    if (skipButton) {
      skipButton.click();
    } else if (videoAd.duration > 0 && videoAd.paused === false && videoAd.ended === false) {
      // Check if the video is an ad (e.g., by checking for a common ad class on the player)
      // This is a heuristic and might need adjustment if YouTube changes its player structure.
      const player = document.querySelector('.html5-video-player');
      if (player && player.classList.contains('ad-showing')) {
        videoAd.muted = true;
        videoAd.playbackRate = 16; // Speed up the ad significantly
      }
    }
  }
}

// Run removeAds initially and then observe for changes (e.g., new ads loading)
removeAds();

const observer = new MutationObserver(removeAds);
observer.observe(document.body, { childList: true, subtree: true });
