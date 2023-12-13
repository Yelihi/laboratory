// vue 로 컨트롤 해주기
const app = Vue.createApp({
  data() {
    return {
      courseGoalA: "Finish the course and learn vue",
      courseGoalB: "master vue",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});

// html 중 어느부분을 컨트롤 할 것인지 설정하기
app.mount("#user-goal");
