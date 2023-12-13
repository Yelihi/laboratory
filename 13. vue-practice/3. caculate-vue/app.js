const app = Vue.createApp({
  data() {
    return {
      counter: 10,
      name: "",
      confirmName: "",
    };
  },
  methods: {
    addNumber(num) {
      this.counter = this.counter + num;
    },
    reduceNumber(num) {
      if (this.counter > 0) this.counter = this.counter - num;
    },
    onChangeName(e) {
      this.name = e.target.value;
    },
    submitForm() {
      alert("submitted");
    },
    confirmInput() {
      this.confirmName = this.name;
    },
  },
});

app.mount("#events");
