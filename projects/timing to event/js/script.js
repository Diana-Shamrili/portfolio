const content = document.getElementById("content");
content.textContent = "00 : 00 : 00 : 00";
(function () {
  let totalSeconds;
  let timer = null;
  butt.onclick = function () {
    const date = document.getElementById("date").value;
    if (date !== "") {
      const MyDate = new Date(date);
      const today = new Date();
      let day = MyDate.getTime() - today.getTime();
      let timeout = day % 1000;
      totalSeconds = (day - timeout) / 1000 - 10800;
      start();
    }
  };

  function start() {
    if (!timer) {
      timer = setInterval(setTime, 1000);
    }
  }

  function setTime() {
    if (totalSeconds >= 0) {
      totalSeconds--;
      let secondsLabel = getNull(totalSeconds % 60);
      let minutesLabel = getNull(parseInt((totalSeconds / 60) % 60));
      let hoursLabel = getNull(parseInt((totalSeconds / 60 / 60) % 24));
      let dayLabel = getNull(parseInt(totalSeconds / 24 / 60 / 60));
      content.textContent = `${dayLabel} : ${hoursLabel} : ${minutesLabel} : ${secondsLabel}`;
      document.getElementById("str").innerHTML = "До выбранной даты осталось ";
    } else {
      content.textContent = "00 : 00 : 00 : 00";
      document.getElementById("str").innerHTML = "Выбранный день уже прошёл";
    }
  }

  function getNull(val) {
    let valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }
  clear.onclick = function () {
    clearInterval(timer);
    date.value = "";
    content.textContent = "00 : 00 : 00 : 00";
    document.getElementById("str").innerHTML = "";
    timer = null;
  };
})();
