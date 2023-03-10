let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function FormWork(){
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');


    if(!commentName.value){
        let error = document.getElementById('noName');
        let errorText = '<p>ERROR: You cannot leave comment without a name!</p> ';

        return error.innerHTML = errorText;
    }

    if(!commentBody.value){
        let error = document.getElementById('noComment');
        let errorText = '<p>ERROR: You cannot leave empty comment</p> ';
        
        return error.innerHTML = errorText;
    }


        let date = new Date()
        let options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        }

        let comment = {
            name: commentName.value,
            body: commentBody.value,
            time: date.toLocaleDateString('ru', options)
        }

        commentName = " ";
        commentBody = " ";

        comments.push(comment);

        saveComments();
        showComments();

    }

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments(){
    let commentField = document.getElementById('comment-field');
    let out = ' ';

    comments.forEach(function(item){
        out += `<p class="time"><em>${item.time}</em></p>`;
        out += `<h3 class="user-name">${item.name + ':'}</h3>`;
        out += `<p class="user-comment">${item.body}</p>`;
        out += '<img id="delete" src="./icons/seo-social-web-network-internet_262_icon-icons.com_61518.svg" alt="delete">';
    })
    commentField.innerHTML = out;
}

    
    
//     document.getElementById('delete').onclick = function(){
//         let comment = comments.item
//         let i = comments.indexOf('comment')
//         comments.splice(i-1, 1)
//         console.log(comments)
//         saveComments()
//         showComments()
    
// }