new Vue({
    el: "#app",
    data: {
      level: 3, // table size(Level)
      highScore: 0,
      score: 0,
      randomSquare: null,
      seconds: 0, //time
      t: 0, //timer Id
      squares: null
    },
    mounted: function() {
      var that = this;
      this.squares = document.querySelectorAll(".square");
      var highScore = localStorage.getItem("highScore");
      this.highScore = (highScore) ? highScore : 0;
    },
    created: function() {
    },
    computed: {
      showButton: function() {
        return this.seconds == 0;
      }
    },
    methods: {
      /*For setting the Level of the Game.*/
      setLevel: function(level) {
        this.level = level;
        this.clearTimer();
      },

      /*
      To get Random square and add Green color to that square by random number generation:
      */
      getRandomSquare: function() {
        if (this.randomSquare !=null) {
        	console.log(this.randomSquare);
          this.squares[this.randomSquare].classList.remove("square-green");
          this.squares[this.randomSquare].classList.add("square-blue");
        }
        this.randomSquare = Math.floor(Math.random() * (this.level * this.level));
        console.log(this.randomSquare);
        this.squares[this.randomSquare].classList.remove("square-blue");
        this.squares[this.randomSquare].classList.add("square-green");
      },

      /*
      	Calculating the score of the user based on the click action on the square. If the user click green color square then the score incremented else score decremented.
      */
      calculateScore: function(i, j) {
        var clickedSquare = (i > 1) ? ((i - 1) * this.level) + (j - 1) : (i - 1) + (j - 1);
        if (clickedSquare == this.randomSquare) {
          ++this.score;
          this.highScore = (this.score > this.highScore) ? this.score : this.highScore;
          localStorage.setItem("highScore", this.highScore);
        } else {
          --this.score;
        }
      },

      /*
      The time out for this game is 120 seconds. The game start at 120 seconds and periodically the time decrease by one second and the time becomes '0' then pop up will be appeared. To restart the game then click on 'Ok' button.
      */
      decreaseTime: function() {
        if (this.seconds == 0) {
          this.clearTimer();
          if (window.alert("Game Over!!!")) {
            this.startTimer();
          }
        }
        if (this.seconds >= 1) {
          this.seconds--;
        }
        this.getRandomSquare();
      },

      /* When Start Game button clicked this method will be called and the timer will be started. */
      startTimer: function() {
        this.seconds = 120;
        this.score = 0;
        this.t = setInterval(this.decreaseTime, 1000);
      },

      /* When  Restart Game clicked this method will be called and the timer will be restarted. */
      clearTimer: function() {
        this.seconds = 120;
        this.score = 0;
        this.squares = document.querySelectorAll(".square");
        clearInterval(this.t);
      }
    },
  });
