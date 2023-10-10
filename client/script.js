const API_ENDPOINT = 'http://localhost:3000/';

function performLogin() {
    alert("You've successfully logged in!")
}

function showRegistration() {
    alert("Redirecting to registration page...")
}

let posts; // Define posts at a higher scope
let currentPostIndex; // Define currentPostIndex to track which post is currently being interacted with

document.addEventListener("DOMContentLoaded", function() {
    fetch(`${API_ENDPOINT}/posts`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // This ensures that the JSON data is passed to the next then block
        })
        .then(data => {
            posts = data;

            const postsSection = document.querySelector('.posts-section');
            const filters = document.querySelectorAll('[name="sort-order"]');
            const categoryFilter = document.querySelector('#category-filter');

            // Initial display
            displayPosts(posts);

            filters.forEach(filter => {
                filter.addEventListener('change', function() {
                    filterAndDisplayPosts();
                });
            });

            categoryFilter.addEventListener('change', function() {
                filterAndDisplayPosts();
            });
        })
        .catch(error => {
            console.log("Error fetching posts: ", error);
        });

    function filterAndDisplayPosts() {
        const sortOrder = document.querySelector('[name="sort-order"]:checked').value;
        const category = categoryFilter.value;
        let filteredPosts = [...posts];

        if (category !== 'all') {
            filteredPosts = filteredPosts.filter(post => post.category === category);
        }

        switch (sortOrder) {
            case "date":
                filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "votes":
                filteredPosts.sort((a, b) => b.votes - a.votes);
                break;
            case "status":
                filteredPosts.sort((a, b) => a.completionStatus.localeCompare(b.completionStatus));
                break;
        }

        displayPosts(filteredPosts);
    }

    function displayPosts(postsToDisplay) {
        let postsHTML = "";
        postsToDisplay.forEach(post => {
            postsHTML += `<div class="post">
                <h3>${post.post_title}</h3>
                <p>${post.post_content}</p>
                <p>Category: ${post.post_categories}</p>
                <p>Status: ${post.post_status}</p>
                <p>Date: ${post.post_date}</p>
                <p>Votes: ${post.post_votes}</p>
            </div>`;
        });
        postsSection.innerHTML = postsHTML;
    }

    const modal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close");
    const postsSection = document.querySelector('.posts-section');

    postsSection.addEventListener('click', function(e) {
        const postElement = e.target.closest('.post');
        if (postElement) {
            currentPostIndex = Array.from(postsSection.children).indexOf(postElement);
            const post = posts[currentPostIndex];
            document.getElementById("modalTitle").textContent = post.post_title;
            document.getElementById("modalContent").textContent = post.post_content;
            modal.style.display = "block";
        }
    });

    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("voteBtn").addEventListener("click", () => {
        if (typeof currentPostIndex !== 'undefined') {
            posts[currentPostIndex].post_votes += 1; 
            alert("Thanks for voting!");
        }
    });

    const openPostModalBtn = document.getElementById("openPostModalBtn");
    const createPostModal = document.getElementById("createPostModal");
    const closeCreate = document.querySelector(".close-create");
    openPostModalBtn.addEventListener("click", function() {
        createPostModal.style.display = "block";
    });

    closeCreate.onclick = function() {
        createPostModal.style.display = "none";
    };
});
