const API_ENDPOINT = 'http://localhost:3000/';

function performLogin() {
    alert("You've successfully logged in!")
}

function showRegistration() {
    alert("Redirecting to registration page...")
}

let posts = []; // Moved outside of DOMContentLoaded for broader scope
let currentPostIndex; 

document.addEventListener("DOMContentLoaded", function() {
    const postsSection = document.querySelector('.posts-section');
    const filters = document.querySelectorAll('[name="sort-order"]');
    const categoryFilter = document.querySelector('#category-filter');

    function fetchAndDisplay(endpoint) {
        console.log("Fetching from:", endpoint);
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                posts = data;
                displayPosts(posts);
            })
            .catch(error => {
                console.log("Error fetching posts: ", error);
            });
    }

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
            votes: 0,
            Status: 'Active'
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

    function applyFilter() {
        const category = categoryFilter.value;
        console.log("Category:", category);
    
        const sortOrder = document.querySelector('[name="sort-order"]:checked').value;
        let endpoint = `${API_ENDPOINT}posts`;
    
        if (category !== 'all') {
            endpoint = `${API_ENDPOINT}posts/category/${category}`;
        }
        
        // Fetch data based on category filter first
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                posts = data;
    
                // Then apply sort order on the fetched data
                switch (sortOrder) {
                    case "date":
                        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                        break;
                    case "votes":
                        posts.sort((a, b) => b.votes - a.votes);
                        break;
                    case "status":
                        posts.sort((a, b) => a.completionStatus.localeCompare(b.completionStatus));
                        break;
                }
    
                displayPosts(posts);
            })
            .catch(error => {
                console.log("Error fetching posts: ", error);
            });
    }
    
    // Initial fetch and display
    fetchAndDisplay(`${API_ENDPOINT}posts`);

    filters.forEach(filter => {
        filter.addEventListener('change', applyFilter);
    });

    categoryFilter.addEventListener('change', applyFilter);

    function displayPosts(postsToDisplay) {
        let postsHTML = "";
        postsToDisplay.forEach(post => {
            postsHTML += `<div class="post">
                <h3>${post.title}</h3>
                <h4>${post.Status}</h4>
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
            document.getElementById("modalTitle").textContent = post.title;
            document.getElementById("modalContent").textContent = post.content;
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
            posts[currentPostIndex].votes += 1;
            alert("Thanks for voting!");
            displayPosts(posts); // Re-render the posts after voting
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
