const fakePosts = [
    {
        title: "Graffiti on School Wall",
        content: "Last night, some miscreants drew graffiti on our local school wall. It's inappropriate and sets a wrong example for the kids.",
        category: "graffiti",
        completionStatus: "pending",
        date: "2023-09-15",
        votes: 12
    },
    {
        title: "Fly Tipping at Elm Street",
        content: "Someone dumped a lot of household waste on Elm Street. It's now causing a blockage and smells terrible.",
        category: "fly-tipping",
        completionStatus: "done",
        date: "2023-09-10",
        votes: 20
    },
    {
        title: "Loud Parties at Pine Avenue",
        content: "There have been nightly parties at Pine Avenue, disturbing the elderly in our neighborhood.",
        category: "noise-disturbance",
        completionStatus: "pending",
        date: "2023-09-01",
        votes: 8
    },
    {
        title: "Group causing trouble at the park",
        content: "A group of teenagers are frequently causing disturbances at the local park, making it hard for families to enjoy.",
        category: "anti-social-behaviour",
        completionStatus: "in-progress",
        date: "2023-08-20",
        votes: 15
    },
    {
        title: "Main Street Needs Cleaning",
        content: "Main Street has a lot of litter and it's been weeks since it was last cleaned.",
        category: "street-sweeping",
        completionStatus: "pending",
        date: "2023-09-11",
        votes: 9
    },
    {
        title: "Dangerous Pothole near Mall",
        content: "A huge pothole near the shopping mall entrance has damaged several vehicles. Immediate attention needed!",
        category: "potholes",
        completionStatus: "done",
        date: "2023-07-30",
        votes: 25
    },
    {
        title: "Illegal Parking at Rose Lane",
        content: "Every evening, vehicles are parked illegally at Rose Lane blocking the residents' driveways.",
        category: "parking",
        completionStatus: "in-progress",
        date: "2023-09-05",
        votes: 10
    },
    {
        title: "Vandalized Benches at Park",
        content: "The benches at the city park were recently vandalized and need urgent repair.",
        category: "damaged-property",
        completionStatus: "pending",
        date: "2023-08-18",
        votes: 6
    },
    {
        title: "Noise from Construction Site",
        content: "The construction site near Maple Street is causing noise disturbances during odd hours.",
        category: "noise-disturbance",
        completionStatus: "in-progress",
        date: "2023-09-03",
        votes: 7
    },
    {
        title: "Overflowing Bins on Cherry Avenue",
        content: "The bins on Cherry Avenue are overflowing and haven't been cleared for days.",
        category: "street-sweeping",
        completionStatus: "done",
        date: "2023-09-12",
        votes: 11
    }
];

function performLogin () {
    alert("You've successfully logged in!")
}

function showRegistration() {
    alert("Redirecting to registration page...")
}
document.addEventListener("DOMContentLoaded", function () {
    const postsSection = document.querySelector('.posts-section');
    const filters = document.querySelectorAll('[name="sort-order"]');
    const categoryFilter = document.querySelector('#category-filter');

   
    

    // Initial display
    displayPosts(fakePosts);

    filters.forEach(filter => {
        filter.addEventListener('change', function () {
            filterAndDisplayPosts();
        });
    });

    categoryFilter.addEventListener('change', function () {
        filterAndDisplayPosts();
    });

    function filterAndDisplayPosts() {
        const sortOrder = document.querySelector('[name="sort-order"]:checked').value;
        const category = categoryFilter.value;

        let filteredPosts = [...fakePosts];

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

    function displayPosts(posts) {
        let postsHTML = "";
        posts.forEach(post => {
            postsHTML += `<div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <p>Category: ${post.category}</p>
                <p>Status: ${post.completionStatus}</p>
                <p>Date: ${post.date}</p>
                <p>Votes: ${post.votes}</p>
            </div>`;
        });
        postsSection.innerHTML = postsHTML;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("postModal");
    const closeModal = document.querySelector(".close");
    const posts = document.querySelectorAll(".post");
    posts.forEach((post, index) => {
        post.addEventListener("click", () => {
            document.getElementById("modalTitle").textContent = fakePosts[index].title;
            document.getElementById("modalContent").textContent = fakePosts[index].content;
            document.getElementById("modalAuthor").textContent = fakePosts[index].author;
            modal.style.display = "block";
        });
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
        fakePosts[index].votes += 1;  // Increase vote count
        alert("Thanks for voting!");
    });
});
const openPostModalBtn = document.getElementById("openPostModalBtn");
const createPostModal = document.getElementById("createPostModal");
const closeCreate = document.querySelector(".close-create");
const createPostForm = document.getElementById("createPostForm");
openPostModalBtn.addEventListener("click", function() {
    createPostModal.style.display = "block";
});

// Close the create post modal
closeCreate.onclick = function() {
    createPostModal.style.display = "none";
};
