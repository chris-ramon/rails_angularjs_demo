# CRUDY demo app

simple crudy app using Rails + AngularJS using $resource module.

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