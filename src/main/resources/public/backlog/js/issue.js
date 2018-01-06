$(function() {
    var updateHours = function () {
        $(".board_column").each(function () {
            var updateHour = function (tag, className) {
                var sum = 0;
                $(tag).find(".issue_tile > ." + className).each(function () {
                     var val = $(this).text()
                     if (val != "null") sum += parseFloat(val);
                });
                $(tag).find("span." + className).first().text(sum);
            };
            updateHour(this, "estimated_hour");
            updateHour(this, "actual_hour");
        });
    };

    $(".sortable").
        sortable({
            connectWith: ".board_column_body.sortable",
            receive: function (event, ui) {
                jQuery.ajax({
                    url: "/issue/" + $(ui.item[0]).data("id"),
                    method: "post",
                    data: {
                        _method: "PATCH",
                        status_id: $(this).data("status-id")
                    }
                });
                updateHours();
            }
        });
    $(".issue_tile").
        click(function () {
            jQuery.ajax({
                url: "/issue/" + $(this).data("id"),
                method: "get",
                success: function (dataJson) {
                    var divId = "modal";
                    var issueJson = dataJson.data["issue_list"][0];
                    $("#" + divId + "_title").text(issueJson["title"]);
                    $("#" + divId + "_detail").text(issueJson["detail"]);
                    $("#modal").modal('show');
                }
            });
        });
    $(document).contextmenu("contextmenu", function (e) {
        e.preventDefault();
        alert("");
//        $(".custom-menu").finish().toggle(100).
//
//        // In the right position (the mouse)
//        css({
//            top: event.pageY + "px",
//            left: event.pageX + "px"
//        });
    });

    updateHours();
});