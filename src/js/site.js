var filterPosts;

filterEvents = function() {
  var i, j, len, len1, post, posts, query, results, results1;

  query = document.getElementById('search').value.toLowerCase();
  posts = document.getElementsByClassName('list-group-item');

  if (query.length > 0) {
    results = [];
    for (i = 0, len = posts.length; i < len; i++) {
      post = posts[i];
      results.push((function(post) {
        if (post.children[0].children[0].innerHTML.toLowerCase().indexOf(query) > -1) {
          return post.style.display = 'block';
        } else {
          return post.style.display = 'none';
        }
      })(post));
    }
    return results;

  } else {
    results1 = [];
    for (j = 0, len1 = posts.length; j < len1; j++) {
      post = posts[j];
      results1.push((function(post) {
        return post.style.display = 'block';
      })(post));
    }
    return results1;
  }
};


