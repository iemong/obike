<script lang="ts">
  // obniz
  const obniz_id = "";
  const obniz = new window.Obniz(obniz_id);
  let speed = 0;
  let revolutionNum = 0;
  let base = 0;
  let isHit = false;
  let timerId: number | null = null;

  // youtube
  let player: YT.Player | null = null;
  let youtubeId = "";
  let playbackRate = 0;

  //during obniz connection
  obniz.onconnect = async () => {
    obniz.io4?.drive("5v");
    obniz.io4?.output(true);
    obniz.io2?.output(false);
    obniz.io1?.output(false);
    obniz.ad0?.start((num) => {
      if (num > 4) {
        if (isHit) return;
        isHit = true;
        revolutionNum += 1;
      } else {
        if (!isHit) return;
        if (timerId) {
          console.log("cancel");
          clearTimeout(timerId);
          timerId = null;
        }
        timerId = window.setTimeout(() => {
          isHit = false;
        });
      }
    });
  };

  setInterval(() => {
    speed = revolutionNum / 3;
    const diff = speed - base;

    console.log(speed, revolutionNum, diff);

    if (diff > 2) {
      playbackRate = 2;
    } else if (diff > 1.5) {
      playbackRate = 1.5;
    } else if (diff > 1.0) {
      playbackRate = 1.0;
    } else if (diff > 0.5) {
      playbackRate = 0.5;
    } else {
      playbackRate = 0;
    }

    if (playbackRate) {
      // 再生スピードを設定する
      player?.setPlaybackRate(playbackRate);
      // 再生中じゃなかったら、再生する
      if (player?.getPlayerState() !== 1) {
        player?.playVideo();
      }
    } else {
      // 再生スピードが0なので、一時停止
      player?.pauseVideo();
    }

    revolutionNum = 0;
  }, 3000);

  // YouTubeのセットアップ
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      playerVars: {
        loop: 1,
        controls: 1,
        autoplay: 0,
        showinfo: 0,
        rel: 0,
      },
      events: {
        onReady: (event) => {
          console.log("ready…");
          console.log(event);
        },
        onStateChange: (event) => {
          console.log(event);
        },
      },
    });
  };

  const loadVideo = () => {
    (player as YT.Player)?.cueVideoById(youtubeId);
  };
</script>

<main class="main">
  <div class="youtube-wrapper">
    <div id="player" class="youtube-player"></div>
  </div>
  <div class="speed">
    <p class="speed-title">PLAYBACK RATE</p>
    <p>{playbackRate}</p>
  </div>
  <div class="text-box">
    <label class="input-label">
      <span>Enter YouTube ID : </span>
      <input class="input" type="url" bind:value="{youtubeId}" />
    </label>
  </div>
  {#if youtubeId}
    <button on:click="{loadVideo}">動画を読み込む</button>
  {/if}
</main>

<style lang="scss">
  .main {
    --bg-color: #181818;
    --text-color: #aaa;
    --bd-color: #303030;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    background-color: var(--bg-color);

    .youtube-wrapper {
      position: relative;
      width: 100%;
      max-width: 980px;
      aspect-ratio: 16 / 9;
      text-align: center;
      overflow: hidden;
    }

    .youtube-player {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .text-box {
      margin: 16px auto 0;
      text-align: center;
    }

    .input-label {
      display: inline-block;
      color: var(--text-color);
    }

    .input {
      color: var(--text-color);
      border: 1px solid var(--bd-color);
      background-color: #121212;
    }

    .speed {
      position: absolute;
      right: 20px;
      bottom: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 100px;
      text-align: center;
      color: var(--text-color);
      font-size: 24px;
      font-weight: bold;
    }

    .speed-title {
      margin-bottom: 0.5em;
      font-size: 24px;
      font-weight: bold;
    }
  }
</style>
