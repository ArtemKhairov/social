import usersReducer, {
  followSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  toggleIsFollowingProgress,
  unfollowSuccess,
} from "./users-reducer";

let state = {
  users: [
    { id: 1, name: "Alla" },
    { id: 2, name: "Faina" },
    { id: 3, name: "Second Lieutenant" },
    { id: 4, name: "young boy" },
  ],
  pageSize: 5,
  totalUsersCount: 4,
  currentPage: 2,
  isFetching: false,
  followingInProgress: [],
};

it("should follow user", () => {
  let action = followSuccess(1);

  let newState = usersReducer(state, action);

  expect(newState.users[0].followed).toBe(true);
});

it("shold unfollow user", () => {
  let action = unfollowSuccess(2);

  let newState = usersReducer(state, action);

  expect(newState.users[1].followed).toBe(false);
});

it("should return new users array", () => {
  let action = setUsers([
    { id: 10, name: "Младший" },
    { id: 11, name: "Лейтенант" },
  ]);

  let newState = usersReducer(state, action);

  expect(newState.users).toEqual([
    { id: 10, name: "Младший" },
    { id: 11, name: "Лейтенант" },
  ]);
});

it("should set new current page", () => {
  let action = setCurrentPage(10);

  let newState = usersReducer(state, action);

  expect(newState.currentPage).toBe(10);
});

it("should change  total users count", () => {
  let action = setTotalUsersCount(6);

  let newState = usersReducer(state, action);

  expect(newState.totalUsersCount).toBe(6);
});

// Для значения isFetching false
it("should change fetching status", () => {
  let action = toggleIsFetching(true);

  let newState = usersReducer(state, action);

  expect(newState.isFetching).toBe(true);
});

// Для значения isFetching true
// it("should change fetching status", () => {
//   let action = toggleIsFetching(false);

//   let newState = usersReducer(state, action);

//   expect(newState.isFetching).toBe(false);
// });

// it("should show pending users id", () => {
//   let action = toggleIsFollowingProgress(true, 3);

//   let newState = usersReducer(state, action);

//   // expect(newState.isFetching).toBe(true);
//   expect(newState.followingInProgress).toBe([3]);
// });
