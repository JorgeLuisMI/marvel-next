number = (e) => {
  if (e.keyCode === 32) {
    var randInt = Math.floor(Math.random() * Math.floor(10000))
    console.log(randInt)
  }
}

number(32)
