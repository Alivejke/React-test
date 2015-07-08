**Description**

This is a simple one page application which shows issues from git hub Git repository hosting service.

**Features**

* Drop down repository select - while user is entering the required repository owner, application at
background gets list of first 100 repositories according to entered owner
* Request delay - to avoid multiply ajax request each time, when owner field is changed, there is
provided delay between last change event and ajax request in 500 ms
* Auto complete - drop down component provides functionality of complete entered value according to
own data storage, which has been created after last ajax query to the Git Hub server.
* Items count - user can select how many issues will be shown per page.
* Pagination - this component provides data showing page by page. There is limited to show only 10
pages at pagination panel, but user can select next/prevision 10 pages by clicking the **'+'** or
**'-'** buttons

**Known issues**

* Drop down list not closes automatically - to close drop down list - click the triangle

**Used libraries**

* jQuery - used for ajax requests
* underscore - used for creating debounce methods

**Installation**

Before running the application it is required to install all dependencies. To do this just enter
the command **npm i** in your console.

**Run application**

To build and run application enter **gulp** command in your console. The build process will be started.
When building will be finished, build system will start your default browser with running application.
If it not happen, open your browser manually and go to address **http://localhost:9000**

Enjoy :)