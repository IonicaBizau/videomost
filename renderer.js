const swal = require("sweetalert2")
    , embedCode = require("./embed-video")

function showPopup() {
    swal({
        title: "Hey!"
      , text: "Paste the video URL (YouTube, Vimeo)"
      , showCancelButton: false
      , confirmButtonText: "Let's go!"
      , input: "text"
    }).then(url => {
        const code = embedCode(url, {
            query: {
                autoplay: 1
            }
        });
        if (!code) {
            return showPopup();
        }
        video.innerHTML = code;
    }).catch(e => {
        showPopup();
    });
}

showPopup();
