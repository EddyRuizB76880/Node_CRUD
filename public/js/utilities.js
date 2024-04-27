let postIdToDelete = 0;

function linkClickEvents(){
    console.log("click listener")
    console.log( $('#create_button'))

    $('.deleteButton').click((eventData)=>{
        console.log(eventData.target.id)
        postIdToDelete = eventData.target.id
        toggleAlertBox();
    })

    $('#confirmDeleteButton').click((eventData)=>{
        fetch(`/delete/${postIdToDelete}`, { method: "DELETE"} ).then((data)=>{
            console.log(data)
            if(data.status === 200){
                location.href = '/';
            }
        })
    })

    $('#cancelButton').click(()=>{
        toggleAlertBox();
    })

}

function toggleAlertBox(){
    $('#alertBoxBackground').fadeToggle().css('display','flex');
    $('#alertBox').fadeToggle();

}

$('document').ready(linkClickEvents);