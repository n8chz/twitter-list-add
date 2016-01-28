var currentUser = $(".current-user").find(".account-summary").attr("href").slice(1);
var listAuthor = $(".list-author").attr("href").slice(1);

if (currentUser == listAuthor) {
 var listDetails = $(".js-list-details");
 var listID = listDetails.data("list-id");
 var listName = listDetails.find(".js-list-name").text();

 $(".tweet-context").closest(".tweet").find(".account-group").each(function () {
   var userID = $(this).data("user-id");
   var gadget = $("<a>");
   // gadget.attr("href", `https://twitter.com/i/${listID}/lists/${userID}/members`);
   var userName = $(this).find(".username").find("b").text();
   gadget.text(`add ${userName} to ${listName}`);
   gadget.click(function () {
     console.log("clicked a gadget");
     self.postMessage(JSON.stringify({
	listID: listID,
	listName: listName,
	userID: userID,
	userName: userName,
	listAuthor: listAuthor
     }));
   });
   $(this).after(gadget);
 });
}
