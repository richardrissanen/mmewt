define(["./date_format_module"], function(dateFormatModule) {

    var dateFormat = new dateFormatModule();

    function checkIfInPast(start) {
        var classToAdd = "current";

        if (start < new Date())
            classToAdd = 'past-event';

        return classToAdd;
    }

    var templateModule = function() {
  
        this.createEventHtml = function(title, start, id, description) {

            var classToAdd = checkIfInPast(start);
            var transformedDate = dateFormat.transform(start);

            return  `<li id="event${id}"class="list-group-item event-list ${classToAdd} hide">
                        <h6>
                            ${title} <small class="text-muted">${transformedDate}</small>
                            <a href="#" class="favorite-toggle star empty" data-id="${id}"></a>
                        </h6>
                        <a href="#" class="accordion-trigger plus">
                        <p class="accordion hide">${description}</p>
                    </li>`;
        }

        this.createEmptyState = function() {
            var emptyHtml = `<div id="empty-state-container" class="text-center ml-auto mr-auto">
                                <h6>Oh no, you have no favorites.</h6>
                                <div class="big-star mt-4 mb-4"></div>
                                <p>Go to Events and add favorites by tapping the star on the right.</p>
                            </div>`;
            return `<li>${emptyHtml}<li>`;
        }

        this.createNoLocalStorageState = function() {
            var emptyHtml = `<div id="empty-state-container" class="text-center ml-auto mr-auto">
                                <h6>Oh no, your browser does not have local storage.</h6>
                                <p> We don&#39;t want to annoy users with creating an account. As a result, we require local storage to run this app. We apologize for the inconvenience.</p>
                            </div>`;
            return `<li>${emptyHtml}<li>`;
        }

  
    };
  
    return templateModule;
  
  });
  
