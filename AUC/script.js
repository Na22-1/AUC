document.addEventListener('DOMContentLoaded', function() {
    // Function to create the list
    function createList(listInputId, addBtnId, listId, canVote = false) {
        const listInput = document.getElementById(listInputId);
        const addToListBtn = document.getElementById(addBtnId);
        const list = document.getElementById(listId);
        const editModal = document.getElementById('editModal');
        const editItemText = document.getElementById('editItemText');
        const saveChangesBtn = document.getElementById('saveChangesBtn');
        const deleteItemBtn = document.getElementById('deleteItemBtn');

        addToListBtn.addEventListener('click', function() {
            const newItemText = listInput.value.trim();
            if (newItemText !== '') {
                const newItem = document.createElement('li');
                newItem.innerHTML = `<span>${newItemText}</span>`;
                list.appendChild(newItem);
                listInput.value = '';
                if (canVote) {
                    newItem.innerHTML += '<button class="voteBtn">+1</button><span class="voteCount">0</span>';
                    addVoteListener(newItem);
                }
                addEditDeleteListener(newItem);
            }
        });

        function addVoteListener(item) {
            const voteBtn = item.querySelector('.voteBtn');
            const voteCount = item.querySelector('.voteCount');

            voteBtn.addEventListener('click', function() {
                let currentCount = parseInt(voteCount.textContent);
                voteCount.textContent = currentCount + 1;
            });
        }

        function addEditDeleteListener(item) {
            item.addEventListener('click', function(event) {
                const target = event.target;
                if (target.tagName === 'SPAN') {
                    const spanText = item.querySelector('span').textContent;
                    editItemText.value = spanText;
                    editModal.style.display = 'block';

                    saveChangesBtn.onclick = function() {
                        item.querySelector('span').textContent = editItemText.value.trim();
                        editModal.style.display = 'none';
                    }

                    deleteItemBtn.onclick = function() {
                        item.remove();
                        editModal.style.display = 'none';
                    }
                }
            });
        }

        listInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addToListBtn.click();
            }
        });

        const existingItems = list.querySelectorAll('li');
        existingItems.forEach(function(item) {
            addVoteListener(item);
            addEditDeleteListener(item);
        });
    }

    // Call the function for the new list
    createList('brainstorminglistInput', 'brainstormingaddToListBtn', 'brainstormingList', true);
    createList('knowledgelistInput', 'knowledgeToListBtn', 'knowledgeList');
});
