// soon.js — names the service on the "în curând" placeholder.
// Whitelist only: never render raw query text into the page.
(function () {
  var ALLOWED = ['Areola', 'Cicatrici', 'Alopecie', 'Sprancene',
                 'Eyeliner', 'Buze'];
  var asked = new URLSearchParams(location.search).get('s') || '';
  var match = ALLOWED.find(function (n) {
    return n.toLowerCase() === asked.toLowerCase();
  });
  var slot = document.getElementById('soon-service');
  if (slot) slot.textContent = match || 'Serviciu';
}());
