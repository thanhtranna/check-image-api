function viewImg(img, type) {
  var fileReader = new FileReader;
  fileReader.onload = function (img) {
    var avartarShow = document.getElementById(type);
    avartarShow.src = img.target.result
  }, fileReader.readAsDataURL(img.files[0]);
}
