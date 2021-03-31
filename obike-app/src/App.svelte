<script lang="ts">
  let player: YT.Player | null = null;

  const obniz_id = "";
  const obniz = new window.Obniz(obniz_id);
  let speed = 0;
  let cadence = 0;
  let flag = false;
  let timerId: number | null = null;
  let playbackRate = 0;

  //during obniz connection
  obniz.onconnect = async () => {
    obniz.io4?.drive("5v");
    obniz.io4?.output(true);
    obniz.io2?.output(false);
    obniz.io1?.output(false);
    obniz.ad0?.start((num) => {
      if (num > 4) {
        if (flag) return;
        flag = true;
        cadence += 1;
      } else {
        if (!flag) return;
        if (timerId) {
          console.log("cancel");
          clearTimeout(timerId);
          timerId = null;
        }
        timerId = window.setTimeout(() => {
          flag = false;
        });
      }
    });
  };

  let base = 0;

  setInterval(() => {
    speed = cadence / 5;
    const diff = speed - base;
    console.log(speed, cadence, diff);
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
      player?.setPlaybackRate(playbackRate);
      if (player?.getPlayerState() !== 1) {
        player?.playVideo();
      }
    } else {
      player?.pauseVideo();
    }

    cadence = 0;
  }, 5000);

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      videoId: "ih19o9c-xDo",
      playerVars: {
        loop: 1,
        controls: 0,
        autoplay: 0,
        showinfo: 0,
        rel: 0,
      },
      events: {
        onReady: (event) => {
          console.log('ready…');
          console.log(event);
        },
        onStateChange: (event) => {
          console.log(event);
        },
      },
    });
  };

  const handleClickButton = (e: Event) => {
    const speed = Number(
      (e.currentTarget as HTMLButtonElement).getAttribute("data-speed")
    );
    player?.setPlaybackRate(speed);
  };
</script>

<main>
  <div id="player"></div>
  <button data-speed="0.0" on:click="{handleClickButton}">0倍</button>
  <button data-speed="0.5" on:click="{handleClickButton}">0.5倍</button>
  <button data-speed="0.75" on:click="{handleClickButton}">0.75倍</button>
  <button data-speed="1" on:click="{handleClickButton}">1倍</button>
  <button data-speed="1.5" on:click="{handleClickButton}">1.5倍</button>
  <button data-speed="2" on:click="{handleClickButton}">2倍</button>
  <p>base: {base}</p>
  <p>再生スピード: {playbackRate}</p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
