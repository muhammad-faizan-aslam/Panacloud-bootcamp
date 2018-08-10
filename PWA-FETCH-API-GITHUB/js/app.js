if ("serviceWorker" in navigator) {
    window.addEventListener("load", x => {
        navigator.serviceWorker
            .register("/sw.js")
            .then(res => console.log("Registerd"))
            .catch(err => console.log(err));
    });
};

document.getElementById('searchBtn').addEventListener('click', function () {

    var user = document.getElementById('searchbar').value;
    document.getElementById('user-result').innerHTML = "";
    if (user === '') {
        alert('Please write a username in the search bar');
    } else {
        var split = user.split('');
        var username = '';

        for (var i = 0; i < split.length; i++) {
            username += split[i];
            var users = fetch(`https://api.github.com/users/${username}`)
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something wrong please check');
                })
                .then(function (response) {
                    document.getElementById('searchbar').value = "";


                    var image = `<img src="${response.avatar_url}"/>`;
                    document.getElementById('user-result').innerHTML += showuser(response, image);


                })
                .catch(function (err) {
                    console.log(err);
                });
        }

    }
});

function showuser(response, image) {
    var displaydiv = ` <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 thumbnail">

    <div class="user-display">
    <div>
    <img src="${response.avatar_url}" alt="Avatar" class="avatar img-responsive">
    
    </div>  
    <div class="user-detail">
    <p><b>NAME : </b>${response.name}</p>
    <br/>
    <p><b>Location : </b>${response.location}</p>
    <br/>
    <p><b>Followers : </b>${response.followers}</p>
    <br/>
    <p><b>Following : </b>${response.following}</p>
    <br/>
    <p><b>URL : </b><a href="${response.html_url}" target="_blank">${response.html_url}</a></p>
    <br/>
    </div>
    </div>
    
    
    </div>`
    return displaydiv;
}