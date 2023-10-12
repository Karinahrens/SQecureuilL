const API_ENDPOINT = 'https://backendsqecureuill.onrender.com/';
document.addEventListener("DOMContentLoaded", function() {
    const postsSection = document.querySelector('.posts-section');
    const categoryFilter = document.querySelector('#category-filter');
    const createPostForm = document.getElementById("createPostForm"); // Moved here
    let posts = [];
    let currentPostIndex;
    function fetchAndDisplay(endpoint) {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                posts = data;
                displayPosts(posts);
            })
            .catch(error => console.log("Error fetching posts: ", error));
    }
    function getPostClassByCategory(category) {
        // Simplify and add missing categories if necessary
        return category.toLowerCase().replace(' ', '-');
    }
    function displayPosts(postsToDisplay) {
        let postsHTML = "";
        postsToDisplay.forEach(post => {
            const postClass = getPostClassByCategory(post.categories);
            postsHTML += `
                <div class="post ${postClass}" data-post-id="${post.id}">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <p>Category: ${post.categories}</p>
                    <p>Date: ${new Date(post.date).toLocaleDateString()}</p>
                    <p>Votes: ${post.votes}</p>
                </div>`;
        });
        postsSection.innerHTML = postsHTML;
    }
    document.getElementById("filterButton").addEventListener('click', applyFilter);
    function applyFilter() {
        const category = categoryFilter.value;
        const sortOrder = document.querySelector('[name="sort-order"]:checked').value;
        let endpoint = `${API_ENDPOINT}posts`;
        if (category !== 'all') {
            endpoint += `/order?category=${category}&sort=${sortOrder}`;
        } else {
            endpoint += `/${sortOrder}`;
        }
        fetchAndDisplay(endpoint);
    }
    // Initial fetch and display
    fetchAndDisplay(`${API_ENDPOINT}posts`);
    // Post Details Modal
    const postModal = document.getElementById("postModal");
    const closeModal = postModal.querySelector(".close");
    postsSection.addEventListener('click', function(e) {
        const postElement = e.target.closest('.post');
        if (postElement) {
            currentPostIndex = Array.from(postsSection.children).indexOf(postElement);
            const post = posts[currentPostIndex];
            postModal.querySelector("#modalTitle").textContent = post.title;
            postModal.querySelector("#modalContent").textContent = post.content;
            postModal.style.display = "block";
        }
    });
    closeModal.onclick = () => postModal.style.display = "none";
    window.onclick = (event) => { if (event.target === postModal) postModal.style.display = "none"; };
    // Create Post Modal
    const createPostModal = document.getElementById("createPostModal");
    document.getElementById("openPostModalBtn").addEventListener("click", () => createPostModal.style.display = "block");
    createPostModal.querySelector(".close-create").onclick = () => createPostModal.style.display = "none";
    // Submit Create Post Form
    createPostForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // ... your existing form submission code ...
    });
    // Delete Post
    document.getElementById("deleteBtn").addEventListener("click", function() {
        if (typeof currentPostIndex !== 'undefined') {
            const postIdToDelete = posts[currentPostIndex].post_id;
            fetch(`${API_ENDPOINT}posts/${postIdToDelete}`, { method: "DELETE" })
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    alert("Post deleted successfully!");
                    window.location.href = "/client/home.html";
                })
                .catch(error => console.error("Error deleting the post:", error));
        }
    });
    // Logout
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.clear();
        window.location.assign('./login.html');
    });
    async function loadPosts() {
        const options = {
            headers: { 'Authorization': localStorage.getItem("token") }
        };
        const response = await fetch(`${API_ENDPOINT}posts`, options);
        if (!options.headers.Authorization) (window.location.assign("./login.html"));
    }
    loadPosts();
});