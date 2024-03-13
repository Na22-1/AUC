document.addEventListener('DOMContentLoaded', function() {
    // Function to create the list
    function createList(listInputId, addBtnId, listId, canVote = false) {
        const listInput = document.getElementById(listInputId);
        const addToListBtn = document.getElementById(addBtnId);
        const list = document.getElementById(listId);

        addToListBtn.addEventListener('click', function() {
            const newItemText = listInput.value.trim();
            if (newItemText !== '') {
                const newItem = document.createElement('li');
                const span = document.createElement('span');
                span.textContent = newItemText;
                newItem.appendChild(span);
                list.appendChild(newItem);
                listInput.value = '';
                if (canVote) {
                    const voteBtn = document.createElement('button');
                    voteBtn.className = 'voteBtn';
                    voteBtn.textContent = '+1';
                    newItem.appendChild(voteBtn);
                    const voteCount = document.createElement('span');
                    voteCount.className = 'voteCount';
                    voteCount.textContent = '0';
                    newItem.appendChild(voteCount);
                    addVoteListener(newItem);
                }
                addEditDeleteListener(newItem);
            }
        });

        function addVoteListener(item) {
            const voteBtn = item.querySelector('.voteBtn');
            const voteCount = item.querySelector('.voteCount');

            voteBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevents the event from bubbling up to the parent span
                let currentCount = parseInt(voteCount.textContent);
                voteCount.textContent = currentCount + 1;
            });
        }

        function addEditDeleteListener(item) {
            item.addEventListener('click', function(event) {
                const target = event.target;
                if (target.tagName === 'SPAN') {
                    const spanText = target.textContent;
                    const inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.value = spanText;
                    inputField.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            const newText = inputField.value.trim();
                            if (newText !== '') {
                                const newSpan = document.createElement('span');
                                newSpan.textContent = newText;
                                item.replaceChild(newSpan, inputField);
                            } else {
                                item.parentNode.removeChild(item); // Remove the whole list item
                            }
                            item.removeChild(inputField);
                            inputField.blur(); // Unfocus the input field
                        } else if (e.key === 'Escape') {
                            item.removeChild(inputField);
                        }
                    });
                    item.replaceChild(inputField, target);
                    inputField.focus();
                } else if (target.tagName === 'BUTTON') {
                    // Don't delete text when clicking vote button
                    event.stopPropagation();
                }
            });
        }


        listInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addToListBtn.click();
                if (listInput.value.trim() === '') {
                    listInput.blur();
                }
            }
        });

        const existingItems = list.querySelectorAll('li');
        existingItems.forEach(function(item) {
            addVoteListener(item);
            addEditDeleteListener(item);
        });
    }
    // Function to create the modal popup
    function createInfoPopup(container, infoText) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'none';

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.innerHTML = '&times;';

        const infoPara = document.createElement('p');
        infoPara.textContent = infoText;

        modalContent.appendChild(closeBtn);
        modalContent.appendChild(infoPara);
        modal.appendChild(modalContent);
        container.appendChild(modal);

        return modal;
    }

    // Function to show the modal popup
    function showInfoPopup(container) {
        const modal = container.querySelector('.modal');
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Event listener for clicking on the info icons
    const containers = document.querySelectorAll('.left__container, .main__panel__containers, .bottom__container');

    containers.forEach(function(container) {
        container.addEventListener('click', function(event) {
            const icon = event.target.closest('.infoBtn');
            if (icon) {
                const container = icon.closest('.left__container, .main__panel__containers, .bottom__container');
                const infoText = icon.dataset.info;
                const modal = container.querySelector('.modal');
                if (!modal) {
                    const createdModal = createInfoPopup(container, infoText);
                    showInfoPopup(container);
                } else {
                    showInfoPopup(container);
                }
            }
        });
    });

    // Call the function for the new list
    createList('feedbackListInput', 'feedbackListBtn', 'feedbackList');
    createList('brainstorminglistInput', 'brainstormingaddToListBtn', 'brainstormingList', true);
    createList('knowledgelistInput', 'knowledgeToListBtn', 'knowledgeList');
    createList('reflexionListInput', 'reflexionListBtn', 'reflexionList');
    createList('neuePerspektivenListInput', 'neuePerspektivenListBtn', 'neuePerspektivenList');
    createList('VisionList', 'VisionListInput', 'VisionListBtn');
    createList('definitionOfUnlearnedListInput', 'definitionOfUnlearnedListBtn', 'definitionOfUnlearnedList');
    createList('vorbereitungListInput', 'vorbereitungListBtn', 'vorbereitungList');
    createList('actionItemsListInput', 'actionItemsListBtn', 'actionItemsList');
    createList('measuringUnlearningListInput', 'measuringUnlearningListBtn', 'measuringUnlearningItemsList');
});
