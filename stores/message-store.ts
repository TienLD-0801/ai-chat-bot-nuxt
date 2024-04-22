export type MessageList = {
  name: string;
  answer: string;
};

export type Message = {
  content: MessageList[];
  chatId?: string;
};

export const useMessageStore = defineStore(
  "message",
  () => {
    const message = ref<Message>({
      content: [],
    });

    const setMessage = (payload: {
      name: string;
      answer: string;
      chatId?: string;
    }) => {
      if (!message.value?.content) {
        message.value.content = [];
      }
      if (message.value?.content.length < 5) {
        message.value.content.unshift({
          name: payload.name,
          answer: payload.answer,
        });
        message.value.chatId = payload.chatId ?? "";
      } else {
        message.value.content.splice(-1);
        message.value.content.unshift({
          name: payload.name,
          answer: payload.answer,
        });
        message.value.chatId = payload.chatId ?? "";
      }
    };

    const resetData = () => {
      message.value = {
        content: [],
        chatId: "",
      };
    };

    return { message, setMessage, resetData };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
