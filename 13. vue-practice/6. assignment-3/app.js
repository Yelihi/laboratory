const app = Vue.createApp({
  data() {
    return {
      number: 0,
      // results: "",
    };
  },
  watch: {
    results() {
      console.log("watcher executing");
      const that = this;
      setTimeout(() => {
        that.number = 0;
      }, 5000);
    },
  },
  computed: {
    results() {
      if (this.number < 37) {
        return "Not there yet";
      }
      if (this.number > 37) {
        return "Too much!";
      }
      return this.number;
    },
  },
  methods: {
    plusNumber(value) {
      this.number = this.number + value;
    },
  },
});

app.mount("#assignment");
