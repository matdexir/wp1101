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
    let [ret, img_url] = promptImage();
    if (ret != null) {
      new_album = new Album(name);
      new_album.images.push(img_url);
      Albums.push(new_album);
      parseAlbums();
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
    new_img.setAttribute("id", Album.id);
    new_img.setAttribute("alt", i);
    new_img.setAttribute("onclick", "expandImg(this)");
    carousel.appendChild(new_img);
    if (i === 0) {
      new_img.click();
    }
  }
}

function loadAlbumFromDiv(Preview) {
  loadAlbum(Albums[Preview.id]);
  alert(Albums[Preview.id].name + " loaded.");
}

function expandImg(imgs) {
  let expandedImg = document.getElementById("expanded-img");
  // let imgText = document.getElementById("img-text");
  expandedImg.src = imgs.src;
  expandedImg.alt = imgs.id + " " + imgs.alt;
  // imgText.innerHTML = imgs.alt;
  expandedImg.parentElement.style.display = "block";
  let del_btn = document.getElementById("del-btn");
  del_btn.style.display = "inline";
}

function closeExpanded(btn) {
  btn.parentElement.style.display = "none";
  let del_btn = document.getElementById("del-btn");
  del_btn.style.display = "none";
}

function clearModal() {
  let modal = document.getElementById("inner-modal");
  while (modal.lastChild.nodeType !== modal.firstChild.nodeType) {
    modal.removeChild(modal.lastChild);
  }
}

function parseAlbums() {
  clearModal();
  let modal = document.getElementById("inner-modal");
  for (let i = 0; i < Albums.length; i++) {
    let new_album = document.createElement("div");
    new_album.setAttribute("class", "album-preview");
    new_album.setAttribute("id", i);
    new_album.setAttribute("onclick", "loadAlbumFromDiv(this)");
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
  ];

  for (let i = 0; i < defaultImages.length; i++) {
    defaultContent.add_images(defaultImages[i]);
  }

  Albums.push(defaultContent);
  loadAlbum(defaultContent);

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

  let add_btn = document.getElementById("add-btn");
  add_btn.onclick = function () {
    let first_img = document
      .getElementById("carousel")
      .getElementsByTagName("img")[0];
    let [ret, img_url] = promptImage();
    if (ret != null) {
      Albums[first_img.id].add_images(img_url);
      loadAlbum(Albums[first_img.id]);
      alert("Image added successfully");
    }
  };

  let del_btn = document.getElementById("del-btn");
  del_btn.onclick = function () {
    let first_img = document.getElementById("expanded-img");
    let ret = confirm("Do you want to delete this image?");
    if (ret) {
      let inner_id = first_img.alt.match(/^[0-9]+/);
      let array_id = first_img.alt.match(/[0-9]+$/);
      let list = document
        .getElementById("carousel")
        .getElementsByTagName("img");
      if (array_id > 0 && Albums[inner_id].images.length > 1) {
        let display_next;
        if (list[array_id - 1]) display_next = list[array_id - 1];
        if (list[array_id + 1]) display_next = list[array_id + 1];
        expandImg(display_next);
        Albums[inner_id].images.splice(array_id, 1);
        loadAlbum(Albums[inner_id]);
        alert("Image deleted successfully.");
      } else if (array_id == 0 && Albums[inner_id].images.length > 1) {
        expandImg(list[1]);
        Albums[inner_id].images.shift();
        loadAlbum(Albums[inner_id]);
        alert("Image deleted successfully.");
      } else if (Albums[inner_id].images.length === 1) {
        let another_ret = confirm(
          "NOTE: This will delete the album.\nProceed?"
        );
        if (another_ret) {
          if (inner_id === 0) {
            Albums.shift();
          } else if (inner_id > 0 && inner_id < Albums.length) {
            Albums.splice(inner_id, 1);
          } else {
            Albums.pop();
          }
          console.log(Albums);
          alert("Album deleted");
          alert(Albums.length);
          let btn = document.getElementById("modal-btn");
          btn.click();
          return;
        }
      }
    }
  };
}

init();
