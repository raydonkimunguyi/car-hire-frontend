 const modal = document.getElementById('myModal');
    const btn = document.getElementById('openModal');
    const span = document.getElementsByClassName('close')[0];
    const modalBody = document.getElementById('modalBody');

    btn.onclick = function() {
      // Load content from another HTML file
      fetch('add_car.html')
        .then(response => response.text())
        .then(html => {
          modalBody.innerHTML = html;
          modal.style.display = 'block';
        });
    }

    span.onclick = function() {
      modal.style.display = 'none';
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }