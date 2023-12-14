const app = Vue.createApp({
  data() {
    return {
      value1: "",
      value2: "",
    };
  },
  methods: {
    showAlert() {
      alert("환영합니다.");
    },
    onChangeValue1(e) {
      this.value1 = e.target.value;
    },
    onChangeValue2(e) {
      this.value2 = e.target.value;
    },
  },
});

app.mount("#assignment");
