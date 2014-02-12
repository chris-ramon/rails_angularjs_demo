# Rails + AngularJS DEMO APP


simple app using Rails + AngularJS using $resource module
which has small implementation of the following features:
* authentication - devise
* permissions - custom based permissions inspired on Discourse's
* file upload - async file upload using JQuery File Upload
* functional/unit tests using rspec, mocha and factory girl.
* pagination using kaminari


### Running backend
``` bash
git clone https://github.com/chris-ramon/rails_angularjs_demo
cd rails_angularjs_demo/backend/
rvm use ruby-2.0.0-p353@rails_angularjs_demo --create --ruby-version
bundle install
rake db:migrate
rails s
```

### Running frontend
``` bash
cd rails_angularjs_demo/backend/
npm install
bower install
grunt serve
```

Go to http://127.0.0.1:9000/