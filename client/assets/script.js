const API_ENDPOINT = 'https://backendsqecureuill.onrender.com/';


function performLogin() {
    alert("You've successfully logged in!")
}

function showRegistration() {
    alert("Redirecting to registration page...")
}

let posts = []; 

let currentPostIndex; 


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
    function getPostClassByCategory(category) {
        switch (category) {
            case 'graffiti':
                return 'graffiti';
            case 'Fly Tipping':
                return 'fly-tipping';
            case 'Noise Disturbance':
                return 'noise-disturbance';
            case 'anti-social-behaviour':
                return 'anti-social-behaviour';
            case 'Parking':
                return 'parking';
            case 'Damaged Property':
                return 'damaged-property';
            case 'Street Sweeping':
                return 'street-sweeping';
        }
    }
    function displayPosts(postsToDisplay) {
        let postsHTML = "";
        postsToDisplay.forEach(post => {
            const postClass = getPostClassByCategory(post.categories)
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

    const modal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close");

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
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(updatedPost => {
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
    const localDateTime = currentDate.toLocaleString("en-GB", dateOptions);

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
                document.getElementById("postCategory").value = "Graffiti";
            }
        })
        .catch(error => {
            console.error("Error posting data to the server:", error);
        });
});


const deleteButton = document.getElementById("deleteBtn");

deleteButton.addEventListener("click", () => {
    console.log("Delete button clicked");
    console.log("currentPostIndex:", currentPostIndex);
   
    if (typeof currentPostIndex !== 'undefined') {
        const postIdToDelete = posts[currentPostIndex].post_id; 
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
    //localStorage.removeItem('token');
    
    localStorage.clear(); 
    window.location.assign('./login.html')
})


async function loadPosts () {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch(`${API_ENDPOINT}/posts`, options);
    //console.log(options.headers.Authorization)
    if (options.headers.Authorization) (console.log("You've successfully logged in!"))
    else {
        window.location.assign("./login.html");
    }
    loadPosts();
};