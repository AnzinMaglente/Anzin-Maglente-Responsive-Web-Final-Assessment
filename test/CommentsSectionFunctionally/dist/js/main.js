function addComment() {
    // Gets the textarea using tbe specified ID.
    const commentInput = document.getElementById("commentInput");
    // Gets the div "comments" using tbe specified ID.
    const commentsDiv = document.getElementById('comments');

    // PlaceHolder for name.
    const username = "Name";
    // Retrieves the value of the textarea / the user input. 
    const commentText = commentInput.value;

    // Checks if there is a value inside commentText
    if (commentText) {
        const userDiv = document.createElement("div");
        userDiv.className = "UserInfo";
        userDiv.textContent = (username)
        commentsDiv.appendChild(userDiv)

        // Creates a div element.
        const commentDiv = document.createElement("div");
        // Names the div element to "comment"
        commentDiv.className = "comment";
        // Inserts the text inside the div class.
        commentDiv.textContent = (commentText) 
        // Places the "comment" div inside the "comments" parent div.
        commentsDiv.appendChild(commentDiv);
        // Clears input
        commentInput.value = '';
    } else {
        alert("Please enter a comment")
    }
 }