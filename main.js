const requestURL = 'https://jsonplaceholder.typicode.com';

const searchBtn = document.getElementById("search-btn");
const postIdInput = document.getElementById("post-id");
const postDiv = document.getElementById("post");

searchBtn.addEventListener("click", () => {
  const postId = postIdInput.value;

  if (!postId || postId < 1 || postId > 100) {
    alert("Enter a post ID from 1 to 100!");
    return;
  }

  fetch(`${requestURL}/posts/${postId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Post with this ID was not found!");
      }
      return response.json();
    })
    .then(post => {
      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <button id="comments-btn">Comments</button>`;

      const commentsBtn = document.getElementById("comments-btn");
      commentsBtn.addEventListener("click", () => {
        fetch(`${requestURL}/posts/${postId}/comments`)
          .then(response => {
            if (!response.ok) {
              throw new Error("Error of comments loading");
            }
            return response.json();
          })
          .then(comments => {
            postDiv.innerHTML += `
              <h3>Comments (${comments.length})</h3>
              <ul>
                ${comments.map(comment => `<li>${comment.body}</li>`).join("")}
              </ul>
            `;
          })
          .catch(error => {
            console.log(error);
            alert(error.message);
          });
      });
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    });
});