const app = Vue.createApp({
  data() {
    return {
      name: "최원익",
      age: 33,
      number: Math.random() * 9,
      imageLink:
        "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };
  },
});

app.mount("#assignment");
