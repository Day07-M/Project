function openModal(index) {
  const post = document.querySelector(`.post[data-index='${index}']`);
  const title = post.querySelector('.post-title').innerText;
  const content = post.querySelector('.post-content').innerText;

  document.getElementById('editTitle').value = title;
  document.getElementById('editContent').value = content;
  document.getElementById('editIndex').value = index;

  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('editForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const index = document.getElementById('editIndex').value;
  const title = document.getElementById('editTitle').value;
  const content = document.getElementById('editContent').value;

  const response = await fetch(`/posts/${index}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  if (response.ok) {
    location.reload(); // Refresh to reflect updated post
  } else {
    alert('Error updating post');
  }
});



// Create Post Modal
const openModalBtn = document.getElementById('openModalBtn');
const createModal = document.getElementById('modalCreate');

function closeCreateModal() {
  createModal.classList.add('hidden');
}

openModalBtn.addEventListener('click', () => {
  createModal.classList.remove('hidden');
});

