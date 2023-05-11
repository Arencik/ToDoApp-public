const notes = document.querySelectorAll('.task-wrapper');

let draggedNote = null;

notes.forEach(note => {
  note.addEventListener('dragstart', () => {
    draggedNote = note;
  });

  note.addEventListener('dragend', () => {
    draggedNote = null;
  });
});

const parents = document.querySelectorAll('.parent');

parents.forEach(parent => {
  parent.addEventListener('dragover', event => {
    event.preventDefault();
    const afterElement = getDragAfterElement(parent, event.clientY);
    const draggable = document.querySelector('.task-wrapper.dragging');

    if (afterElement == null) {
      parent.appendChild(draggable);
    } else {
      parent.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.task-wrapper:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

