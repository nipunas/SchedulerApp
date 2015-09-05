var task = function (model) {

    var item = {};
    item.Id = model.Id;
    item.Summary = model.Summary;
    item.Description = model.Description;

    return item;
}