<script lang="ts">
  import { onMount } from "svelte";

  let player = null;

  onMount(() => {
    window.onYouTubeIframeAPIReady = () => {
      console.log("hoge");
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
</script>

<main>
  <div id="player"></div>
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
