const API_ENDPOINT = 'https://backendsqecureuill.onrender.com/';
let posts = [];
let currentPostIndex;
function performLogin() {
    alert("You've successfully logged in!");
}
function showRegistration() {
    alert("Redirecting to registration page...");
}
function getPostClassByCategory(category) {
    return category.toLowerCase().replace(/ /g, '-');
}
function displayPosts(postsToDisplay) {
    const postsSection = document.querySelector('.posts-section');
    let postsHTML = "";
    postsToDisplay.forEach(post => {
        const postClass = getPostClassByCategory(post.categories);
        postsHTML += `<div class="post ${postClass}" data-post-id="${post.id}">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p>Category: ${post.categories}</p>
            <p>Date: ${new Date(post.date).toLocaleDateString()}</p>
            <p>Votes: ${post.votes}</p>
        </div>`;
    });
    postsSection.innerHTML = postsHTML;
}
document.addEventListener("DOMContentLoaded", function() {
    const postsSection = document.querySelector('.posts-section');
    const categoryFilter = document.querySelector('#category-filter');
    const createPostForm = document.getElementById("createPostForm");
    function fetchAndDisplay(endpoint) {
        console.log("Fetching from:", endpoint);
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                posts = data;
                displayPosts(posts);
            })
            .catch(error => {
                console.log("Error fetching posts:", error);
            });
    }
    document.getElementById("filterButton").addEventListener('click', applyFilter);
    function applyFilter() {
        const category = categoryFilter.value;
         let sortOrder = document.querySelector('[name="sort-order"]:checked').value;

        // Adjust the sortOrder value based on the category selection
        if (category !== 'all' && sortOrder === "vote") {
            sortOrder = "votes";
        }
        let endpoint = `${API_ENDPOINT}posts`;
        if (category !== 'all') {
            endpoint = `${API_ENDPOINT}posts/order?category=${category}&sort=${sortOrder}`;
        } else {
            endpoint = `${API_ENDPOINT}posts/${sortOrder}`;
        }
        fetchAndDisplay(endpoint);
    }
    fetchAndDisplay(`${API_ENDPOINT}posts`);
    const modal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close");
    const closeCreate = document.querySelector(".close-create");
    postsSection.addEventListener('click', function(e) {
        const postElement = e.target.closest('.post');
        if (postElement) {
            currentPostIndex = Array.from(postsSection.children).indexOf(postElement);
            const post = posts[currentPostIndex];
            document.getElementById("modalTitle").textContent = post.title;
            document.getElementById("modalContent").textContent = post.content;
            modal.style.display = "block";
        }
    });
    openPostModalBtn.addEventListener("click", function() {
        createPostModal.style.display = "block";
    });
    closeModal.onclick = () => {
        modal.style.display = "none";
    };
    closeCreate.onclick = () +> {
        createPostModal.style.display = "none"
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
    document.getElementById("voteBtn").addEventListener("click", () => {
        if (typeof currentPostIndex !== 'undefined') {
            const currentPost = posts[currentPostIndex];
            const postId = currentPost.id; // Assuming your post objects have an 'id' property.
            // Make a PATCH request to the backend
            fetch(`${API_ENDPOINT}posts/${postId}/Vote`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_votes: 1 }), // Increment by 1
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(updatedPost => {
                    console.log(updatedPost);
                    currentPost.votes = updatedPost.votes;
                    alert("Thanks for voting!");
                    displayPosts(posts);
                })
                .catch(error => {
                    console.error("Error updating votes: ", error);
                });
        }
    });
    document.getElementById("downVoteBtn").addEventListener("click", () => {
        if (typeof currentPostIndex !== 'undefined') {
            const currentPost = posts[currentPostIndex];
            const postId = currentPost.id;
            // Make a PATCH request to the backend to decrease the vote
            fetch(`${API_ENDPOINT}posts/${postId}/downVote`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ post_votes: -1 }), // Decrement by 1
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(updatedPost => {
                currentPost.votes = updatedPost.votes;
                alert("Vote removed!");
                displayPosts(posts);
            })
            .catch(error => {
                console.error("Error removing votes: ", error);
            });
        }
    });
    createPostForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("postTitle").value;
        const content = document.getElementById("postContent").value;
        const category = document.getElementById("postCategory").value;
        const currentDate = new Date();
        const dateOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        const localDateTime = currentDate.toISOString();
        const postData = {
            post_title: title,
            post_content: content,
            post_date: localDateTime,
            post_categories: category,
            post_votes: 0,
            post_stage: 'Active'
        };
        fetch(`${API_ENDPOINT}posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        })
            .then(response => {
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return response.text();
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log("Server response:", data);
                    createPostModal.style.display = "none";
                    posts.push(data);
                    displayPosts(posts);
                    document.getElementById("postTitle").value = "";
                    document.getElementById("postContent").value = "";
                    document.getElementById("postCategory").value;
                    alert("New post successfully created!")
                }
            })
            .catch(error => {
                console.error("Error posting data to the server:", error);
            });
    });
    const deleteButton = document.getElementById("deleteBtn");
    deleteButton.addEventListener("click", () => {
        if (typeof currentPostIndex !== 'undefined') {
            const currentPost = posts[currentPostIndex];
            const postIdToDelete = currentPost.id;
            fetch(`${API_ENDPOINT}posts/${postIdToDelete}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    alert("Post deleted successfully!");
                    window.location.href = "/client/home.html";
                })
                .catch(error => {
                    console.error("Error deleting the post:", error);
                });
        }
    });
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.clear();
        window.location.assign('./login.html');
    });
    async function loadPosts() {
        const options = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        };
        const response = await fetch(`${API_ENDPOINT}posts`, options);
        if (!options.headers.Authorization) {
            window.location.assign("./login.html");
        }
    }
    loadPosts();
});
