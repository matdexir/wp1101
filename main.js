Albums = [];

class Album {
  constructor(name) {
    this.name = name;
    this.images = [];
    this.id = Albums.length;
  }
  add_images(imgURL) {
    this.images.push(imgURL);
  }
}

function promptName() {
  let name = prompt(
    "Please enter the new album name:",
    "Album #" + Albums.length
  );
  return name;
}

function promptImage() {
  let img_url = prompt(
    "Please enter the image url:",
    "https://i.postimg.cc/XNxvNhWs/steve-johnson-e-Vax-JVA2z-HI-unsplash.jpg"
  );

  let url_validator = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  let ret = img_url.match(url_validator);
  if (ret == null) {
    alert(
      "Bad url! Example: https://i.postimg.cc/XNxvNhWs/steve-johnson-e-Vax-JVA2z-HI-unsplash.jpg"
    );
    return;
  } else return [ret, img_url];
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
    let { ret, img_url } = promptImage();
    if (ret != null) {
      new_album = new Album(name);
      new_album.images.push(img_url);
      Albums.push(new_album);
      alert("Success");
    }
  }
}

function loadAlbum(Album) {
  let carousel = document.getElementById("carousel");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.lastChild);
  }
  if (Album.images.length === 0) {
    alert("No images in the album");
    return;
  }
  for (let i = 0; i < Album.images.length; i++) {
    let new_img = document.createElement("img");
    new_img.setAttribute("src", Album.images[i]);
    new_img.setAttribute("id", Album.id+Album.name);
    new_img.setAttribute("alt", i);
    new_img.onclick = function () {
      let expanded_img = document.getElementById("expanded-img");
      // let imgText = document.getElementById("img-text");
      let tmp_img =  document.getElementById(new_img.id);
      alert(tmp_img.src);
      expanded_img.src = tmp_img.src;
      expanded_img.alt = tmp_img.alt;
      // expanded_img.id = tmp_img.id;
      // imgText.innerHTML = imgs.alt;
      expanded_img.parentElement.style.display = "block";
    };
    // new_img.setAttribute("onclick", "expandImg(this)");
    carousel.appendChild(new_img);
  }
}

function expandImg(img) {
  let expanded_img = document.getElementById("expanded-img");
  // let imgText = document.getElementById("img-text");
  expanded_img.src = img.src;
  expanded_img.alt = img.alt;
  expanded_img.id = img.id;
  // imgText.innerHTML = imgs.alt;
  expanded_img.parentElement.style.display = "block";
}

function clearModal() {
  let modal = document.getElementById("inner-modal");
  while (modal.lastChild.nodeType !== modal.firstChild.nodeType) {
    console.log(modal.lastChild + modal.firstChild);
    modal.removeChild(modal.lastChild);
  }
}

function parseAlbums() {
  clearModal();
  let modal = document.getElementById("inner-modal");
  for (let i = 0; i < Albums.length; i++) {
    let new_album = document.createElement("div");
    new_album.setAttribute("class", "album-preview");
    let thumbnail = Albums[i].images;
    if (thumbnail == null) thumbnail = defaultContent.images[0];
    else thumbnail = thumbnail[0];
    new_album.innerHTML =
      '<img class="thumbnail" src=' +
      thumbnail +
      "/>" +
      "<p>" +
      Albums[i].name +
      "</p>";
    modal.appendChild(new_album);
  }
}

function init() {
  let defaultContent = new Album("Default Gallery");
  let defaultImages = [
    "https://i.postimg.cc/XNxvNhWs/steve-johnson-e-Vax-JVA2z-HI-unsplash.jpg",
    "https://i.postimg.cc/VkB8k0QX/steve-johnson-Xx-d26-R37-E4-unsplash.jpg",
    "https://i.postimg.cc/VkB8k0QX/steve-johnson-Xx-d26-R37-E4-unsplash.jpg",
    "https://i.postimg.cc/XNxvNhWs/steve-johnson-e-Vax-JVA2z-HI-unsplash.jpg",
    "https://i.ibb.co/fqqw8wW/usgs-ho-S3dzgp-Hzw-unsplash.jpg",
    "https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg",
  ];

  for (let i = 0; i < defaultImages.length; i++) {
    defaultContent.add_images(defaultImages[i]);
  }

  Albums.push(defaultContent);
  loadAlbum(defaultContent);

  let add_btn = document.getElementById("add-btn");
  add_btn.onclick = function () {
    let first_img = document
      .getElementById("carousel")
      .getElementsByTagName("img")[0];
    let [ret, img_url] = promptImage();
    if (ret != null) {
      Albums[first_img.id].images.push(img_url);
      loadAlbum(Albums[first_img.id]);
      alert("Image added successfully");
    }
  };

  let del_btn = document.getElementById("del-btn");
  // del_btn.onclick = function () {
  // alert("Clicked");
  // let first_img = document
  // .getElementById("carousel")
  // .getElementsByTagName("img")[0];
  // let expanded_img = document.getElementById("expanded-img");
  // Albums[expanded_img.id].splice(expanded_img.alt, 1);
  // loadAlbum(Albums[first_img.id]);
  // let child_nodes = document.getElementById("carousel").childNodes;
  // if (child_nodes.length === 1) {
  // console.log(confirm("You are about to delete the album. Are you sure?"));
  // }
  // for (let i = 0; i < child_nodes.length; i++) {
  // console.log(expanded_img.alt);
  // console.log(child_nodes[i].alt);
  // if (expanded_img.alt === child_nodes[i].alt) {
  // document.getElementById("carousel").removeChild(child_nodes[i]);
  // alert("Image deleted successfully.");
  // loadAlbum(Albums[first_img.id]);
  // break;
  // }
  // }
  // };

  // Get the modal
  let modal = document.getElementById("album-modal");

  // Get the button that opens the modal
  let btn = document.getElementById("modal-btn");

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("modal-close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    parseAlbums();
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
}

init();
