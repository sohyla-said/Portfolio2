document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('#project-category-buttons button');
    const lists = document.querySelectorAll('#projects-content .project-list');
    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        lists.forEach(list => {
          if (list.getAttribute('data-category') === cat) {
            list.classList.remove('d-none');
          } else {
            list.classList.add('d-none');
          }
        });
      });
    });
  });