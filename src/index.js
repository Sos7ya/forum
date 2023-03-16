let comments = [];
loadComments();
let form = document.getElementById('form');
let send = document.getElementById('comment-add')

form.addEventListener('keydown', function (e){
    if(e.key == 'Enter'){
        document.getElementById('comment-body').blur()
        send.click();
    }
})

document.getElementById('form').addEventListener('submit',(e) => {
    e.preventDefault();
    
    
    let commentBody = document.getElementById('comment-body');
    let commentDate = document.getElementById('setDate')
    let commentName = document.getElementById('comment-name');
    let nameError = document.getElementById('badName');
    let userName = commentName.value;
    let commentText = commentBody.value;
    clearInput(commentName);
    clearComment(commentBody);
        

        
    
        //NameValidation
        if(userName == 0){
            return document.getElementById('badName').innerHTML = `<p>Имя не может быть пустым</p>`;
        };
        if(userName.length < 4){
            return document.getElementById('badName').innerHTML = `<p>Имя не может быть короче 3 символов</p>`;
        };
        if(userName.search(/[-!"#$%&'()*+,./:;<=>?@[\\\]_`{|}~]/) > -1){
            return document.getElementById('badName').innerHTML = `<p>Имя не должно содержать данный знак</p>`;
        };
        if(userName.toString()[0] == ' '){
            return document.getElementById('badName').innerHTML = `<p>Имя не должно начинаться с пробела</p>`;
        };
        //
        //CommentValidation
        if(commentText == 0){
            return document.getElementById('noComment').innerHTML = `<p>Комментарий не может быть пустым</p>`;
        };
        if(commentText.length < 4){
            return document.getElementById('noComment').innerHTML = `<p>Комментарий не может быть короче 3 символов</p>`;
        };
        if(commentText.toString()[0] == ' '){
            return document.getElementById('noComment').innerHTML = `<p>Комментарий не должeн начинаться с пробела</p>`;
        };
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
            let errorText = '<p>ERROR: Невозможно установть данную дату</p>';
            return error.innerHTML = errorText;
        }

        if(!commentDate.value){
            comment.date = 'сегодня';
        }

        if(userDate.getDate() == time.getDate() && userDate.getMonth() == time.getMonth() && userDate.getFullYear() == time.getFullYear()){
            comment.date = 'сегодня';
        }
        if(userDate.getDate() == (time.getDate() - 1) && userDate.getMonth() == time.getMonth() && userDate.getFullYear() == time.getFullYear()){
            comment.date = 'вчера';
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

function sendForm(){
    document.getElementById('comment-body').addEventListener('keypress',(ev)=>{
    if(ev.key == 'Enter'){
        form.submit();
    }
})}

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
        out += `<img class="likeBtn lekiBtn_${dataNum}" data-like= "${dataNum}" src="./icons/3643770-favorite-heart-like-likes-love-loved_113432.svg" alt="like"></img>`
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

const likeBtns = document.querySelectorAll('.likeBtn');

const setLike = (evt) =>{
    let el = document.querySelector(`.likeBtn_${evt.target.dataset.like}`);
    likeBtns.item(evt.target.dataset.like).classList.toggle('liked');
}

likeBtns.forEach((el) => el.addEventListener('click', (evt) => setLike(evt)));

function clearInput(commentName){
    commentName.addEventListener('input',()=>{
        document.getElementById('badName').innerHTML = '';
    })
};

function clearComment(commentBody){
    commentBody.addEventListener('focus',()=>{
        document.getElementById('noComment').innerHTML = '';
    })
};
    
