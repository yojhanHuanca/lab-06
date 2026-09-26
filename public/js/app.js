const dialog = document.querySelector('#delete-dialog');
if (dialog) {
  const form = document.querySelector('#delete-form');
  const description = document.querySelector('#delete-description');
  document.querySelectorAll('[data-delete-url]').forEach(button => button.addEventListener('click', () => {
    form.action = button.dataset.deleteUrl;
    description.textContent = `“${button.dataset.title}” se eliminará de forma permanente.`;
    dialog.showModal();
  }));
  document.querySelector('#cancel-delete').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
