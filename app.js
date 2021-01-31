const $display = $("#display");
const $form = $("form");
const $clearAll = $("button");

const api_key = "nGswyaOEKowKALHmXPxhV1QNOV8cBtes";
const url = "https://api.giphy.com/v1/gifs/search";


function createImage(url){
    const $img = $("<img>",{class:"col-log-4 m-4"})
    $img.attr("src",url)
    return $img
}

// return promise
async function getURL(val){
    const response = await axios.get("https://api.giphy.com/v1/gifs/search",{params:{api_key,q:val,limit:1}})
    return response.data.data[0].images.downsized_large.url
}


async function handleCallback(e){
    e.preventDefault()
    const $searchValue = $("input[type=\"text\"]").val()
    getURL($searchValue)
    .then(url => {
        $display.append(createImage(url))
        $form.trigger("reset")
    })

    //exactly some code with getURL() function,but this is return JSON, WHY?
    const responses = await axios.get("https://api.giphy.com/v1/gifs/search",{params:{api_key,q:$searchValue,limit:1}})
    const urls = responses.data.data[0].images.downsized_large.url

    console.log(urls)
}

$form.on("submit",handleCallback)
$clearAll.click(function(){
    $display.empty()
})