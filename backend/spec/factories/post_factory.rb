FactoryGirl.define do
  factory :post do
    title 'awesome title'
    body 'some post content'

    factory :post_with_comments do
      ignore do
        comments_count 5
      end

      after(:create) do |post, evaluator|
        create_list(:comment, evaluator.comments_count,
                    commentable: post)
      end
    end

    factory :post_with_uploads do
      ignore do
        uploads_count 5
      end

      after(:create) do |post, evaluator|
        create_list(:upload, evaluator.uploads_count,
                    uploadable: post)
      end
    end


  end
end