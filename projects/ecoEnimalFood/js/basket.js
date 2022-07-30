function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("myCanvasNav").classList.add('black');
    document.body.style.overflow= 'hidden';
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("myCanvasNav").classList.remove('black');
    document.body.style.overflow= 'visible';
}