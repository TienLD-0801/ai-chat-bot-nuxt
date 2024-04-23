export const DATA_GAME: GameType[] = [
  {
    id: "1",
    image: "images/game_1.png",
    path: PATH.HAND_SIGN,
    title: "REVERSED JEOPARDY",
  },
  // {
  //   id: "2",
  //   image: "images/game_2.png",
  //   title: "CHROMAAI: SHIRT EDITION",
  // },
  {
    id: "2",
    image: "images/game_3.png",
    path: PATH.HEL_MET,
    title: "HARDHAT HERO",
  },
];

export const HASH_MAIN: Map<string, string> = new Map([
  ["A", "isSelfie"],
  ["B", "isPerson"],
  ["C", "listColor"],
]);

export const DATA_HAND_SIGN = [
  {
    id: "1",
    image: "images/heart.png",
  },
  {
    id: "2",
    image: "images/hand.png",
  },
  {
    id: "3",
    image: "images/ok.png",
  },
  {
    id: "4",
    image: "images/cheer-up.png",
  },
  {
    id: "5",
    image: "images/i-love-you.png",
  },
  {
    id: "6",
    image: "images/arm.png",
  },
  {
    id: "7",
    image: "images/thumbs-up.png",
  },
  {
    id: "8",
    image: "images/have-fun.png",
  },
  {
    id: "9",
    image: "images/burn.png",
  },
];

export const HAND_SIGN_RESULT = "The gesture type";

export const TIME_OUT_BACK: number = 30;
