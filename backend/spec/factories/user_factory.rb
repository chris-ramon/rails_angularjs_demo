FactoryGirl.define do
  factory :user do
    email 'r@gmail.com'
    password 'super_secure_password'
    status User::STATUS[:active]
  end
end
