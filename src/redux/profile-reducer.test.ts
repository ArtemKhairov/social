import profileReducer, {actions} from "./profile-reducer";

let state = {
  posts: [
    { id: 1, message: "LADA", likesCount: 0 },
    { id: 2, message: "Volkswagen", likesCount: 8 },
    { id: 3, message: "Toyota", likesCount: 1010 },
    { id: 4, message: "BMW", likesCount: 200 },
  ],
  profile: null,
  status: '',
  newPostText:''
};

it("length of posts should increment", () => {
  // тестируемое значение
  let action = actions.addPost("JDM");

  // действие
  let newState = profileReducer(state, action);

  // ожидаемый результат
  expect(newState.posts.length).toBe(5);
});

it("newPost message is correct", () => {
  let action = actions.addPost("Camry 3.5");

  let newState = profileReducer(state, action);

  expect(newState.posts[4].message).toBe("Camry 3.5");
});

it("length of post should decrement", () => {
  let action = actions.deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

it("length should be the same if Id is incorrect", () => {
  let action = actions.deletePost(1488);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
});
