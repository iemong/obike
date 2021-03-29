<script lang="ts">
  import { onMount } from "svelte";

  let player: YT.Player | null = null;

  const obniz_id = ''
  const obniz = new window.Obniz(obniz_id);
  let speed = 0;
  let cadence = 0;

  //during obniz connection
  obniz.onconnect = async () => {
    obniz.io4?.drive('5v')
    obniz.io4?.output(true)
    obniz.io2?.output(false)
    obniz.io1?.output(false)
    obniz.ad0?.start(num => {
      if(num < 2) {
        cadence += 1
      }
    })
  };

  setInterval(() => {
    speed = cadence / 3
    console.log(speed)
    cadence = 0
  }, 3000)

  onMount(() => {
    window.onYouTubeIframeAPIReady = () => {
      player = new YT.Player("player", {
        videoId: "ih19o9c-xDo",
        playerVars: {
          loop: 1,
          controls: 0,
          autoplay: 1,
          showinfo: 0,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
          onStateChange: (event) => {
            console.log(event)
          },
        },
      });
    };
  });

  const handleClickButton = (e:Event) => {
    const speed = Number((e.currentTarget as HTMLButtonElement).getAttribute('data-speed'))
    player?.setPlaybackRate(speed)
  }
</script>

<main>
  <div id="player"></div>
  <button data-speed="0.5" on:click={handleClickButton}>0.5倍</button>
  <button data-speed="0.75" on:click={handleClickButton}>0.75倍</button>
  <button data-speed="1" on:click={handleClickButton}>1倍</button>
  <button data-speed="1.5" on:click={handleClickButton}>1.5倍</button>
  <button data-speed="2" on:click={handleClickButton}>2倍</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
