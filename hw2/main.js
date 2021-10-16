class Album {
  constructor(name) {
    this.name = name;
    this.images = [];
  }
  add_images(imgURL) {
    this.images.push(imgURL);
  }
}

Albums = [];

function promptName() {
  let name = prompt(
    "Please enter the new album name:",
    "Album #" + Albums.length
  );
  return name;
}

function createAlbum() {
  let name;
  let greenLight;
  // while(true) {
  name = promptName();
  if (name != null) {
    greenLight = true;
    for (let i = 0; i < Albums.length; i++) {
      if (name === Albums[i].name) {
        alert("Name is already taken!");
        greenLight = false;
      }
    }
  }
  // }
  if (greenLight === true) {
    Albums.push(new Album(name));
    alert("Success");
  }
}

function loadAlbum(Album) {
  let carousel = document.getElementById("carousel");
  if (Album.images.length === 0) {
    alert("No images in the album");
    return;
  }
  for (let i = 0; i < Album.images.length; i++) {
    let new_img = document.createElement("img");
    new_img.setAttribute("src", Album.images[i]);
    new_img.setAttribute("onclick", "expandImg(this)");
    carousel.appendChild(new_img);
  }
}

function expandImg(imgs) {
  let expandedImg = document.getElementById("expanded-img");
  // let imgText = document.getElementById("img-text");
  expandedImg.src = imgs.src;
  // imgText.innerHTML = imgs.alt;
  expandedImg.parentElement.style.display = "block";
}

function init() {
  let defaultContent = new Album("Default Gallery");
  let defaultImages = [
    "https://i.postimg.cc/XNxvNhWs/steve-johnson-e-Vax-JVA2z-HI-unsplash.jpg",
    "https://i.postimg.cc/VkB8k0QX/steve-johnson-Xx-d26-R37-E4-unsplash.jpg",
    "https://i.postimg.cc/VkB8k0QX/steve-johnson-Xx-d26-R37-E4-unsplash.jpg",
    "https://i.postimg.cc/XNxvNhWs/steve-johnson-e-Vax-JVA2z-HI-unsplash.jpg",
  ];

  for (let i = 0; i < defaultImages.length; i++) {
    defaultContent.add_images(defaultImages[i]);
  }

  Albums.push(defaultContent);
  loadAlbum(defaultContent);
}

init();
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
