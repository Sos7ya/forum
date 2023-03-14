let comments = [];
loadComments();


document.getElementById('form').addEventListener('submit',(e) =>{
    e.preventDefault();
    
    let commentBody = document.getElementById('comment-body');
    let commentDate = document.getElementById('setDate')
    let commentName = document.getElementById('comment-name');
    const userName = commentName.value;
    
        //Validation
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
        //

    const time = new Date();
    const nowTime = time.toLocaleTimeString();
    const userDate = new Date(commentDate.value);

    let comment = {
        name: commentName.value,
        body: commentBody.value,
        date: userDate.toLocaleDateString(),
        time: nowTime
    };

        //date checking
        if(userDate.getTime() > time.getTime()){
            let error = document.getElementById('wrongDate');
            let errorText = '<p>ERROR: You can not set this date</p>';
            return error.innerHTML = errorText;
        }

        if(!commentDate.value){
            comment.date = 'today';
        }

        if(userDate.getDate() == time.getDate() && userDate.getMonth() == time.getMonth() && userDate.getFullYear() == time.getFullYear()){
            comment.date = 'today';
        }
        if(userDate.getDate() == (time.getDate() - 1) && userDate.getMonth() == time.getMonth() && userDate.getFullYear() == time.getFullYear()){
            comment.date = 'yestrday';
        }
        //

    commentName = " ";
    commentBody = " ";
    commentDate = " ";
    comments.push(comment);

    saveComments();
    showComments();
    location.reload();

})


// function validator(){commentName.addEventListener('input',(evt)=>{
//     userName == 0 ?? alert("ERROR: no name");
// })}
    
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
    let dataNum = 0

    comments.forEach(function(item){
        out += `<p class="date-time"><em>${item.date} ${item.time}</em></p>`;
        out += `<h3 class="user-name">${item.name + ':'}</h3>`;
        out += `<p class="user-comment">${item.body}</p>`;
        out += `<img class="deleteBtn deleteBtn_${dataNum}" id="delete" data-num = "${dataNum}" src="./icons/seo-social-web-network-internet_262_icon-icons.com_61518.svg" alt="delete">`;
        dataNum++;
    })
    commentField.innerHTML = out;
}

const deleteBtns = document.querySelectorAll('.deleteBtn');
const deleteComment = (evt) =>{
    let el = document.querySelector(`.deleteBt_${evt.target.dataset.num}`);
    comments.splice(evt.target.dataset.num, 1);
    saveComments();
    showComments();
    location.reload();
}


deleteBtns.forEach((el) =>el.addEventListener('click', (evt) => deleteComment(evt)));