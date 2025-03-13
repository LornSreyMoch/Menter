document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch books from Google Books API
    function fetchBooks() {
        const API_URL = `https://www.googleapis.com/books/v1/volumes?q=javascript`; // Using "javascript" as a search term for demonstration

        // Fetch book data from the API
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                console.log("API Response:", data); // Log the whole response to inspect its structure
                if (data.items && data.items.length > 0) {
                    // Limit results to 15 books and display them
                    displayBooks(data.items.slice(0, 9));
                } else {
                    console.log("No books found or empty response.");
                }
            })
            .catch(error => {
                console.error("Error fetching books:", error);
            });
    }

    // Function to display the books
    function displayBooks(books) {
        const resultsContainer = document.getElementById("book-results");
        resultsContainer.innerHTML = ""; // Clear previous results

        // If no books are found
        if (books.length === 0) {
            resultsContainer.innerHTML = "<p>No books found.</p>";
            return;
        }

        // Create the HTML content for each book
        let booksHTML = books.map(book => {
            const title = book.volumeInfo.title || "No Title";
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No Author";
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/128x200";
            const description = book.volumeInfo.description || "No Description Available";
            const truncatedDescription = description.length > 150 ? description.substring(0, 150) + "..." : description;

            return `
                <div class="book-card">
                    <img src="${thumbnail}" alt="${title}">
                    <h3>${title}</h3>
                    <p><strong>Author:</strong> ${authors}</p>
                    <p><strong>Description:</strong> ${truncatedDescription}</p>
                </div>
            `;
        });

        // Set the generated HTML inside the results container
        resultsContainer.innerHTML = booksHTML;
    }

    // Fetch books when the page is fully loaded
    fetchBooks();
});
