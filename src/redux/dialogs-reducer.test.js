import dialogsReducer, { sendMessageCreator } from "./dialogs-reducer";

let state = {
  messages: [
    { id: 1, message: "А он тебя целует" },
    { id: 2, message: "Говорит что любит" },
    { id: 3, message: "И ночами обнимает" },
    { id: 4, message: "К сердцу прижимает" },
    { id: 5, message: "А я мучаюсь от тестов" },
  ],
};

it("should send new message", () => {
  let action = sendMessageCreator("Фаина");

  let newState = dialogsReducer(state, action);

  expect(newState.messages.length).toBe(6);
});

it("should get correct message", () => {
  let action = sendMessageCreator("Сегодня в белом танце кружимся");

  let newState = dialogsReducer(state, action);

  expect(newState.messages[5].message).toBe("Сегодня в белом танце кружимся");
});
