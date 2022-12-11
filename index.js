const api_key = `AIzaSyDwNlZ9L_pJAyqvzaprcZ5BjkMpnourdMM`;

let getPopularMovie = async () => {
  try {
    const query = document.getElementById("query").value;
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=50&%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=In&key=${api_key}`
    );
    let data = await res.json();
    let popularData = data.items;
    displayPopular(popularData);
  } catch (err) {
    console.log(err);
  }
};

getPopularMovie();

let displayPopular = (data) => {
  let popular = document.getElementById("popular");

  data.forEach((el) => {
    let div = document.createElement("div");

    let popularData = {
      vedioid: el.id,
      snippet: el.snippet,
    };

    div.onclick = (data) => {
      storeClickedVedios(popularData);
    };

    let url = document.createElement("img");
    url.src = el.snippet.thumbnails.high.url;

    let tittle = document.createElement("p");
    tittle.innerText = el.snippet.title;
    tittle.style.color = "white";

    let channelTitle = document.createElement("h5");
    channelTitle.style.color = "grey";
    channelTitle.innerText = el.snippet.channelTitle;

    div.append(url, tittle, channelTitle);
    popular.append(div);
  });
};

const searchVideos = async () => {
  try {
    const query = document.getElementById("query").value;

    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&key=${api_key}`
    );

    let data = await res.json();
    let actualData = data.items;
    display(actualData);
  } catch (err) {
    console.log(err);
  }
};

function display(data) {
  let container = document.getElementById("container");
  container.innerHTML = null;

  data.forEach(function (el) {
    let div = document.createElement("div");

    let data = {
      vedioid: el.id.videoId,
      snippet: el.snippet,
    };

    div.onclick = () => {
      storeClickedVedios(data);
    };

    let title = document.createElement("h5");
    title.innerText = el.snippet.title;
    title.style.color = "white";

    let id = document.createElement("h3");
    id.innerText = el.id.videoId;
    id.style.color = "white";

    let url = document.createElement("img");
    url.src = el.snippet.thumbnails.high.url;

    let channelTitle = document.createElement("h6");
    channelTitle.innerText = el.snippet.channelTitle;
    channelTitle.style.color = "grey";

    div.append(url, title, channelTitle);

    container.append(div);
  });
}

const storeClickedVedios = (data) => {
  localStorage.setItem("clicked-item", JSON.stringify(data));

  window.location.href = "vedios.html";
};

let menu = document.getElementById("menu");
menu.addEventListener("click", () => {
  let side_icons = document.getElementById("side_icons");
  if ((side_icons.style.visibility = "hidden")) {
    side_icons.style.visibility = "visible";
  }
});

const btn2 = document.getElementById("btn2");
btn2.addEventListener("click", () => {
  let side_icons = document.getElementById("side_icons");

  if ((side_icons.style.visibility = "visible")) {
    side_icons.style.visibility = "hidden";
  }
});
