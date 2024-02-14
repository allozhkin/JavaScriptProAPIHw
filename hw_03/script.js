const initialValue =  `[
    {
        "name": "Йога",
        "photograph": "vggh",
        "likes": 15
    }
]`;

const localStorageKey = "likes";
if (!localStorage.getItem(localStorageKey)) {
  localStorage.setItem(localStorageKey, initialValue);
}
const likes = JSON.parse(localStorage.getItem(localStorageKey));


window.addEventListener("load", () => {
  renderPhoto();
});

async function getRandomPhoto() {
  const apiKey = "r4EM5pXiqSkILWr6oTvS3wvh7mL6yhQSfh-xXbyAR5M";
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    const img = await response.json();
    return img;
  } catch (error) {
    console.error("something went wrong", error);
    return {};
  }
}

async function renderPhoto() {
  const item = {
    name: "",
    photograph: "",
    likes: "",
  };
  const photo = await getRandomPhoto();
  if (photo) {
    const imageBox = document.querySelector(".image_box");
    const img = document.createElement("img");
    img.classList.add("image");

    img.src = photo.urls.small;
    img.alt = photo.alt_description;
    imageBox.appendChild(img);

    const imagePhotographerNameDiv = document.querySelector(
      ".image_photographer-name"
    );
    imagePhotographerNameDiv.textContent = `${photo.user.name}`;

    const imageLikesCounterSpan = document.querySelector(
      ".image_likes-counter"
    );
    imageLikesCounterSpan.textContent = `${photo.likes}`;
    item.name = img.src;
    item.photograph = imagePhotographerNameDiv.textContent;
    item.likes = imageLikesCounterSpan.textContent;
    likes.push(item);
    saveData(likes);
  }
}

let like = 1;
const counterButton = document.querySelector(".image_likes-button");
counterButton.addEventListener("click", function () {
  const likesCounter = document.querySelector(".image_likes-counter");
  const currentCounter = parseInt(likesCounter.textContent, 10);
  if (like == 1) {
    likesCounter.textContent = currentCounter + 1;
    like = 2;
  } else {
    likesCounter.textContent = currentCounter - 1;
    like = 1;
  }
});

function saveData(array) {
  localStorage.setItem(localStorageKey, JSON.stringify(array));
}
