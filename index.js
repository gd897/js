const infoIcon = document.getElementById('infoIcon');
const popupMenu = document.getElementById('popupMenu');

infoIcon.addEventListener('click', (event) => {
  event.preventDefault(); 
  popupMenu.style.display = popupMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (event) => {
  if (!infoIcon.contains(event.target) && !popupMenu.contains(event.target)) {
    popupMenu.style.display = 'none';
  }
});