FactoryGirl.define do
  factory :task, class: Task do
    title 'Task # 1'
  end
  factory :untitled_task, class: Task do
  end
end
