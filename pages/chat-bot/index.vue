<template>
  <main class="main-page">
    <div class="layout">
      <Header titleHeader="AI CHATBOT AUTOMATON" />
      <div class="wrapper-img">
        <video class="video-default" src="/video/default.mp4" autoplay loop />
        <video ref="videoChatBot" class="video-real" :src="videoURL" autoplay />
      </div>
      <div class="content">
        <div
          class="content__message"
          v-for="item in messageStore.$state.message.content"
          :key="item.msgId"
          :class="{
            'user-message': item.name === 'user',
            'bot-message': item.name === 'bot',
          }"
        >
          <div class="content__message__item">
            <p class="msg">
              {{ item.answer }}
            </p>
          </div>
        </div>
        <div class="content__pending" v-show="isPending">Processing ...</div>
      </div>
      <ControlChat />
      <InputChat />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useSpeechRecognition } from "@vueuse/core";
const { start, stop, recognition } = useSpeechRecognition({
  continuous: true,
});
const { $session_id } = useNuxtApp();
const { $ws } = useNuxtApp();
const videoURL = ref<string>("");
const mutedBot = ref<boolean>(false);
const messageStore = useMessageStore();
const conversionId = ref<string>("");
const answer = ref<string>("");
const videoChatBot = ref<HTMLVideoElement | null>(null);
const isPending = ref<boolean>(false);

onBeforeMount(() => {
  $ws.onmessage = (evt) => {
    const convertJSON: { msg: string; url: string } = JSON.parse(evt.data);
    videoURL.value = convertJSON.url;
    answer.value = convertJSON.msg as string;
  };
});

onMounted(() => {
  if (!videoChatBot.value) return;
  videoChatBot.value.addEventListener("playing", () => {
    console.log("video playing");
    messageStore.setMessage({
      msgId: (Math.floor(Math.random() * 10000) + 1).toString(),
      name: "bot",
      answer: answer.value,
      chatId: conversionId.value,
    });
    stop();
  });

  videoChatBot.value.addEventListener("pause", () => {
    console.log("video pause");
    videoURL.value = "";
    start();
  });
});

const toggleTranscription = () => {
  if (!recognition) return;
  const chatId = messageStore.$state.message.chatId;
  recognition.onresult = (event) => {
    let newTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        newTranscript += event.results[i][0].transcript;
        messageStore.setMessage({
          msgId: (Math.floor(Math.random() * 10000) + 1).toString(),
          name: "user",
          answer: newTranscript,
        });
        mutedBot.value = true;
        stop();
        callAPIChatBot(newTranscript, chatId);
      } else {
        newTranscript += event.results[i][0].transcript + "...";
      }
    }
  };
  mutedBot.value = false;
  stop();
};

const callAPIChatBot = async (queryMsg: string, chatId?: string) => {
  const params = {
    inputs: {
      chat_mode: "Conversating",
      environment_des: "a man wearing a brown suit.",
      session_id: $session_id,
    },
    query: queryMsg,
    response_mode: "blocking",
    conversation_id: chatId ?? "",
    user: "abc-123",
    files: [],
  };

  try {
    isPending.value = true;
    const data = await $fetch(API_CHAT_BOT, {
      headers: { Authorization: "Bearer app-eeoA2WVkK0EJZDone7RFPg4w" },
      method: "POST",
      body: JSON.stringify(params),
    });
    conversionId.value = data.conversation_id;
  } catch (error) {
    console.log(error);
  } finally {
    isPending.value = false;
  }
};

onUnmounted(() => {
  messageStore.resetData();
  stop();
});

onMounted(() => {
  start();
});

watchEffect(() => {
  toggleTranscription();
});
</script>

<style lang="scss" scoped>
.main-page {
  background: #dce2ed;
  height: 100vh;

  .layout {
    position: relative;
    height: 100%;
  }
}

.wrapper-img {
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .video-default {
    position: absolute;
    z-index: 1;
  }

  .video-real {
    position: absolute;
    z-index: 2;
  }

  video {
    border-radius: 10px;
    min-height: 770px;
    max-width: 588px;
    object-fit: cover;
  }

  video::-webkit-media-controls {
    display: none;
  }
}

.content {
  z-index: 3;
  position: absolute;
  bottom: 100px;
  padding: 0 5%;
  gap: 8px;
  display: flex;
  flex-direction: column-reverse;
  width: -webkit-fill-available;

  &__pending {
    position: absolute;
    bottom: -35px;
    left: 80px;
    opacity: 0.65;
    font-size: 16px;
    font-weight: 800;
  }
}

.user-message {
  display: flex;
  justify-content: flex-end;
  color: #ffffff;
  font-weight: 400;

  .msg {
    margin: 0;
    background: #7b9edccc;
    padding: 10px 10px 10px 30px;
    border-radius: 10px;
  }
}

.bot-message {
  width: 65%;
  display: flex;
  justify-content: flex-start;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;

  .msg {
    margin: 0;
    background: linear-gradient(
      90deg,
      rgba(0, 139, 144, 0.6) 4.85%,
      rgba(58, 191, 56, 0.6) 47.72%,
      rgba(238, 194, 82, 0.6) 93.25%
    );
    padding: 10px 10px 10px 25px;
    border-radius: 10px;
  }
}
</style>
