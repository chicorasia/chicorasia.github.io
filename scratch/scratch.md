## RDD tips and notes
### Safer update of innerHTML
It seems like you've found a solution to your problem by clearing the innerHTML of portfolioDiv before each update. This is a common approach when you want to completely replace the contents of an element.

However, keep in mind that manipulating innerHTML can be slow and inefficient if done frequently, as it causes the browser to parse new HTML and update the DOM. If performance becomes an issue, you might want to consider other approaches, such as using document.createElement and Node.appendChild to create and add new elements, and Node.removeChild to remove old elements.

Also, remember to be careful when using innerHTML to insert user-supplied data, as it can lead to cross-site scripting (XSS) attacks. Always sanitize any user-supplied data before inserting it into your page.
